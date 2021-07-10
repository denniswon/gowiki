import { merge } from 'lodash'
import PubSub from 'pubsub-js'
import create, { GetState, SetState } from 'zustand'

import {
  config, currentTimezone, getOS, logger, makeMemberMap,
  Member, MemberMap, OAuthProvider, PubSubAction, Team, User
} from '@gowiki/core'

import uuidV4 from 'uuid/v4'

import { API, OAuthSignInResponse, SignInResponse, TeamResponse } from './api'
import { tracker } from './tracker'
import { trackerAuth } from './trackerAuth'

export const LS_TOKEN = 'token'

export type AuthStore = {
  initialized: boolean
  clientId: string
  userId?: string
  token?: string
  user?: User
  team?: Team
  teams?: Team[]
  members?: MemberMap
  livePreview?: boolean

  actions: AuthActions
}

export class AuthActions {
  constructor(public set: SetState<AuthStore>, public get: GetState<AuthStore>) { }

  saveToken = (token: string) => {
    logger.info('AUTH —— saving token', token)
    localStorage.setItem(LS_TOKEN, token)
    window.authToken = token
  }

  // --- initialization

  init = (onLogin?: (user: User, team: Team, token: string) => void) => {
    if (this.get().initialized) return

    const token = (config.dev && localStorage.getItem(LS_TOKEN)) || window.authToken
    logger.info(`AUTH —— init`, token)

    if (token) {
      this.loginHelper(token, token != window.authToken, onLogin)
    } else {
      this.set(_ => ({ initialized: true }))
    }
  }

  // note: mobile only. used for switch server dev option
  reinit = (onLogin?: (user: User, team: Team, token: string) => void) => {
    const token = window.authToken
    if (!token) return
    logger.info(`AUTH —— reinit`, token)
    this.set(() => ({ initialized: false }))
    return this.loginHelper(token, token != window.authToken, onLogin)
  }

  // Use when you want to ensure you're running in an initialized state
  withInit = (func: (user: User, team: Team, token: string) => void) => {
    const { initialized, user, team, token } = this.get()
    if (initialized) {
      func(user, team, token)
    } else {
      this.init(func)
    }
  }

  initMainWindow = () => {
    const appVer = `${window.appVersion}-${getOS()}`
    if (User.meta(this.get().user).av != appVer) {
      this.updateUser({ meta: { av: appVer } })
    }
  }

  // --- login

  loginHelper = async (token: string, saveToken?: boolean,
      onLogin?: (user: User, team: Team, token: string) => void, rethrowError?: boolean) => {
    try {
      API.setAuthToken(token)

      const response = await API.listTeams()

      if (!response.primary_team) { return this.switchTeamOrLogout([]) }

      const primaryTeam = Team.fromJSON(response.primary_team || { name: 'Team', members: [] })
      const user = User.fromJSON(response.user)
      const members = makeMemberMap(primaryTeam)
      tracker.onChangeUser(response.user)
      tracker.onChangeTeam(primaryTeam)

      if (response.token) {
        token = response.token
        saveToken = true
      }

      this.set(_ => ({
        token,
        user,
        userId: response.user.id,
        team: primaryTeam,
        teams: response.teams.map(t => Team.fromJSON(t)),
        members: members,
        error: false,
        initialized: true
      }))

      if (onLogin) onLogin(user, primaryTeam, token)
      if (saveToken) {
        this.saveToken(token)
      }

      if (config.dev) {
        logger.saveDefaultLogLevel('debug')
        window['authStore'] = this
      }

      return { user, team: primaryTeam, token }
    } catch (e) {
      logger.error(e)
      if (rethrowError) throw e
      this.set(_ => ({ initialized: true }))
      return null
    }
  }

  logInElseSignUpOAuth = async (
    provider: OAuthProvider,
    token: string,
    invite: string,
    allowSignUp: boolean = true,
    email?: string,
    team?: { id?: string; name?: string; domain?: string },
    onLogin?: (user: User, team: Team, token: string) => void
  ): Promise<OAuthSignInResponse> => {
    logger.info(`AUTH —— logInElseSignUpOAuth`, provider, token, invite)
    trackerAuth.oauthStart(provider, 'login-else-signin')

    let user = new User()
    user.timezone = currentTimezone()
    user.email = email

    const response = await API.logInElseSignUpOAuth(provider, token, user, team, invite, allowSignUp)

    logger.info("logInElseSignUpOAuth response", response)
    if (response.user) {
      await this.loginHelper(response.token, true, onLogin, true)
    }
    return response
  }

  logout = (set: boolean = true) => {
    logger.info(`AUTH —— logout`)
    localStorage.clear()
    if (set) this.set(_ => ({ clientId: uuidV4(), token: null, user: null, team: null }))
  }

  updateMembers = (members: Member[]) => {
    logger.info(`AUTH - update members`, members)
    const team = Object.assign({}, this.get().team)
    team.members = members
    const memberMap = makeMemberMap(team)
    this.set(_ => ({ team, members: memberMap }))
  }

  // --- team management

  refreshTeam = async () => {
    logger.info(`AUTH —— refreshTeam`)

    let { team, teams } = this.get()
    const otherTeams = teams.filter(t => t.id != team.id)
    let response: TeamResponse
    try {
      response = await API.getTeam(team)
    } catch (e) {
      if (e.response?.status === 404) {
        return this.switchTeamOrLogout(otherTeams)
      } else {
        throw(e)
      }
    }

    team = Team.fromJSON(response.team)
    const members = makeMemberMap(team)
    this.set(_ => ({ team, members, teams: otherTeams.concat([team]) }))
    PubSub.publish(PubSubAction.UPDATE_TEAM, team)
  }

  refreshTeams = async (includeIntegrations = false) => {
    logger.info(`AUTH —— refreshTeams`)
    const response = await API.listTeams(includeIntegrations)
    this.set(_ => ({
      teams: response.teams.map(t => Team.fromJSON(t))
    }))

    const { id } = this.get().team
    if (!(id && response.teams.find(t => t.id == id))) {
     this.switchTeamOrLogout(response.teams)
    } else if (includeIntegrations) {
      this.refreshTeam()
    }
  }

  private switchTeamOrLogout(teams: Team[]) {
    if (teams.length === 0) {
      this.logout(false)
      window.location.reload()
    } else {
      this.switchTeam(teams[0].id, false)
    }
  }

  createOrJoinTeam = async (team: Partial<Team>, source: string): Promise<Team> => {
    if (team.id != null) {
      await API.joinTeam({ id: team.id, name: team.name})
      return team as Team
    } else {
      const newteam = new Team()
      newteam.name = team.name
      newteam.meta = {}
      const realTeam = await this.createTeam(newteam, source)
      this.set(_ => ({ team: realTeam }))
      return realTeam
    }
  }

  createTeam = async (team: Team, source: string): Promise<Team> => {
    const response = await API.createTeam(team, source)
    const newTeam = Team.fromJSON(response.team)
    this.set(state => ({ teams: state.teams.concat([newTeam]) }))
    trackerAuth.appCreateTeam(team.name)
    return newTeam
  }

  switchTeam = async (id: string, refresh: boolean, skipPublish?: boolean) => {
    if (id == this.get().team?.id) return

    if (refresh) {
      // do a page refresh
      await API.updateUser({ meta: { lt: id } })
      location.reload()
    } else {
      const response = await API.getTeam({ id })
      const team = Team.fromJSON(response.team)
      const members = makeMemberMap(team)
      API.updateUser({ meta: { lt: id } })
      trackerAuth.teamSwitch(team.name)

      this.set(_ => ({
        team: team,
        members: members
      }))

      if (!skipPublish) PubSub.publish(PubSubAction.SWITCH_TEAM, team)
      return team
    }
  }

  setDefaultTeam = async (team: Team) => {
    this.updateUser({ meta: { lt: team.id } })
  }

  updateUser = async (updates: Partial<User>) => {
    logger.info(`AUTH —— Update User`, updates)
    const { user } = await API.updateUser(updates)
    this.set(_ => ({ user }))
    PubSub.publish(PubSubAction.UPDATE_USER, user)
  }

  updateUserProfilePicture = async (file: File) => {
    logger.info(`AUTH —— Upload User profile picture`)
    const { user } = await API.uploadProfilePicture(file)
    PubSub.publish(PubSubAction.UPDATE_USER, user)
  }

  updateLocalUser = async (user: User) => {
    logger.info(`AUTH —— Set User`, user)
    this.set(state => ({ user: User.fromJSON(user), members: { ...state.members, [user.id]: user } }))
  }

  updateTeam = async (team: Team, updates: Partial<Team>, optimistic: boolean = false) => {
    logger.info(`AUTH —— Update Team`, updates)

    if (optimistic) this.updateLocalTeam(merge(new Team(), team, updates))

    let response = await API.updateTeam(team, updates)
    const updatedTeam = Team.fromJSON(response.team)
    this.updateLocalTeam(updatedTeam)
    trackerAuth.teamUpdate(updatedTeam, updates)

    PubSub.publish(PubSubAction.UPDATE_TEAM, updatedTeam)
  }

  updateLocalTeam = (updatedTeam: Team) => {
    logger.info(`AUTH —— Set Team`, updatedTeam)
    this.set(state => ({
      team: state.team?.id == updatedTeam.id ? updatedTeam : state.team,
      members: state.team?.id == updatedTeam.id && updatedTeam.members ? makeMemberMap(updatedTeam) : state.members,
      teams: state.teams.map(t => t.id == updatedTeam.id ? updatedTeam : t)
    }))
  }

  rememberShowDevActions: boolean
  showDevActions = () => {
    if (this.rememberShowDevActions !== undefined) return this.rememberShowDevActions
    this.rememberShowDevActions = true
    return this.rememberShowDevActions
  }

}

export const [useAuthStore, authApi] = create<AuthStore>((set, get) => ({
  initialized: false,

  clientId: window.clientId || uuidV4(),

  members: {},

  actions: new AuthActions(set, get as any)
}))

export const authActions = authApi.getState().actions

// NOTE!! don't use these functions in react components, as they don't respond to store changes.

export const userById = (userId: string) => {
  const members = authApi.getState().members
  return members[userId]
}

export const showDevActions = () => {
  return config.env == 'dev' || authActions.showDevActions()
}
