import { navigate } from 'hookrouter'
import create, { GetState, SetState } from 'zustand'

import {
  API, authActions, authApi, SignInResponse, trackerAuth
} from '@gowiki/api'
import { logger, paths, Team } from '@gowiki/core'

import uuidV4 from 'uuid/v4'

import { uiActions } from './uiStore'

// SlackTeam: slack team info for the invite page
const LS_SLACK_TEAM = 'team'

// object: invite code + expiration date
const LS_INVITE = 'invite'
type InviteData = { invite: string; expires: number }

// boolean: whether user has ever authed with Slack. used on signup form
const LS_SLACK = 'slack'

// object: oauth data. used on Google new team creation screen
const LS_OAUTH = 'oauth'

// string: url for redirecting post-auth to a user's intended destination
const LS_REDIRECT = 'redirect'

// string: socket-based login
const LS_LOGIN_CODE = 'login_code'

// object: MagicLinkInfo for new user/team settings
const LS_MAGIC_LINK = 'magic_link'

export type AuthWebStore = {
  actions: AuthWebActions
}

class AuthWebActions {
  constructor(public set: SetState<AuthWebStore>, public get: GetState<AuthWebStore>) { }

  getLoginCode = () => {
    const code = localStorage.getItem(LS_LOGIN_CODE)
    if (code) localStorage.removeItem(LS_LOGIN_CODE)
    return code
  }

  storeLoginCode = (code: string) => {
    localStorage.setItem(LS_LOGIN_CODE, code)
  }

  storePostAuthRedirect = (redirect: string) => {
    localStorage.setItem(LS_REDIRECT, redirect)
  }

  clearPostAuthRedirect = () => {
    localStorage.removeItem(LS_REDIRECT)
  }

  handlePostAuthRedirect = () => {
    const redirect = localStorage.getItem(LS_REDIRECT)
    if (redirect) {
      logger.info("AUTH —— postAuthRedirect", redirect)
      localStorage.removeItem(LS_REDIRECT)
      if (location.href != redirect) {
        location.href = redirect
      }
      return true
    }
    return false
  }

  postAuthRedirect = (response: SignInResponse, redirectHere: boolean) => {
    logger.info("AUTH —— postAuthResponse", response, redirectHere)
    if (redirectHere) {
      return
    } else if (response && !response.existing) {
      return navigate(paths.WELCOME_NEW_USER)
    } else if (response && response.no_team) {
      return navigate(paths.WELCOME_NEW_TEAM)
    } else if (this.handlePostAuthRedirect()) {
      return
    } else {
      return navigate(paths.AUTH_SUCCESS)
    }
  }

  loginCode: string

  signInUrl = (code: string) => global.window.location.origin + paths.AUTH_SIGNIN + `?lc=` + code

  signOutUrl = () => {
    const code = this.loginCode = uuidV4()
    return global.window.location.origin + paths.AUTH_SIGNOUT + `?lc=` + code
  }

  storeInvite = (invite: string) => {
    const expires = Date.now() + 30 * 60 * 1000 // 30 minute expiration
    const inviteData: InviteData = { expires, invite }
    localStorage.setItem(LS_INVITE, JSON.stringify(inviteData))
  }

  getStoredInvite = () => {
    const invite = localStorage.getItem(LS_INVITE)
    if (invite && invite.startsWith('{')) {
      localStorage.removeItem(LS_INVITE)
      const inviteData = JSON.parse(invite) as InviteData
      if (inviteData.expires > Date.now()) return inviteData.invite
    }
    return null
  }

  leaveTeam = async (team: Team, fromSettingsScreen: boolean) => {
    logger.info(`AUTH —— leaveTeam`, team)

    const { showPopover, clearPopover } = uiActions
    const { teams } = authApi.getState()
    if (teams.length <= 1) {
      showPopover(`You can't leave the only team you're on.`, 3000)
      return
    }

    showPopover(`Leave ${team.name}?`, null, okPressed => {
      clearPopover()
      if (!okPressed) return
      const { team: currentTeam, teams, actions } = authApi.getState()
      const newTeams = teams.filter(t => t.id != team.id)
      if (newTeams.length == 0) {
        return
      }

      if (currentTeam.id == team.id && !fromSettingsScreen) {
        authActions.switchTeam(newTeams[0].id, false)
      }
      actions.set(_ => ({ teams: newTeams }))
      API.leaveTeam(team)
      trackerAuth.teamLeave(team.name)
    })
  }

}

export const [useAuthWebStore, authWebApi] = create<AuthWebStore>((set, get) => ({
  actions: new AuthWebActions(set, get as any)
}))

export const authWebActions = authWebApi.getState().actions