import axios, { AxiosInstance } from 'axios'
import _ from 'lodash'

import {
  config, logger, Member, OAuthProvider, OAuthToken, performanceNow,
  Platform, Role, Team, TeamMeta, User, UserTeamMeta
} from '@gowiki/core'

export type SuccessResponse = {
  success: boolean
}

export type SuccessCountResponse = SuccessResponse & {
  count: number
}

export type SignInResponse = SuccessResponse & {
  existing?: string
  user?: User
  team?: Team
  token?: string
  no_team?: boolean
}

export type ImageResponse = {
  imageUrl: string
}

export type OAuthSignInResponse = SignInResponse & {
  profile: any
}

export type UserResponse = {
  user: User
}

export type TeamsResponse = {
  user: User
  teams: Team[]
  primary_team: Team
  token?: string
  time: number
}

export type TeamResponse = {
  team: Team
}

export class APIEvent {
  constructor(
    public time: number,
    public userId: string,
    public username: string,
    public teamId: string,
    public teamname: string,
    public targetUserId: string,
    public targetUsername: string,
    public session: string,
    public type: string,
    public name: string,
    public source?: string,
    public value1?: string,
    public value2?: string,
    public value3?: number,
    public meta?: any,
    public os?: string,
    public appver?: string,
    public githash?: string,
    public useragent?: string,
    public env?: string,
    public ip?: string
  ) {}
}
export class GooglePeopleApiResponse {
  connections: {
    names: {
      metadata: {
        primary?: boolean
      }
      displayName: string
      familyName: string
      givenName: string
      displayNameLastFirst: string
    }[]
    photos: {
      metadata: {
        primary?: boolean
      }
      url: string
      default: boolean
    }[]
    emailAddresses: {
      metadata: {
        primary?: boolean
        verified?: true
      }
      value: string
    }[]
  }[]
}

export class GoogleContactsApiResponse {
  feed: {
    entry: {
      title: {
        $t: string
      }
      gd$email: {
        address: string
        primary: boolean
      }[]
    }[]
  }
}

export class TokenResponse {
  token: OAuthToken<any>
}

export class AnalyticsResponse {
  value: number
  data?: { [date: string]: number }
  multi?: {
    label: string
    data: { [date: string]: number }
  }[]
}

export class UploadedLogListing {
  key: string
  time: string
  team: string
  logs: {
    id: number,
    inserted_at: string,
    key: string,
    path: string,
    reason: string,
    team: string,
    user: string
    notes: string
  }[]
}

export class UploadedLogListResponse {
  logs: UploadedLogListing[]
}
export class UploadedLog {
  path: string
  reason?: string
  team: string
  user: string
  url: string
}

export class UploadedLogResponse {
  logs: UploadedLog[]
}

export type PushTokenType = 'apn' | 'apn-voip' | 'fcm'

class APIService {

  endpoint = config.apiHost + config.apiUrl

  axios: AxiosInstance = axios

  token: string

  // users

  setAuthToken(token: string) {
    this.token = token
    this.axios = axios.create({
      headers: {
        'Authorization': 'Bearer ' + token
      },
    })
  }

  uploadImage = async (file): Promise<ImageResponse> => {
    const bodyFormData = new FormData()
    bodyFormData.append('image', file)

    let response = await this.axios.post(`${this.endpoint}/tweet/upload`, bodyFormData)
    return response.data
  }

  async logInElseSignUpOAuth(
    provider: OAuthProvider,
    token: string,
    user: Partial<User>,
    team: Partial<Team>,
    invite?: string,
    allowSignUp: boolean = true,
  ): Promise<OAuthSignInResponse> {
    let response = await this.axios.post(`${this.endpoint}/log_in_else_sign_up_oauth`, {
      provider,
      token,
      user,
      team,
      invite,
      allow_sign_up: allowSignUp
    })
    return response.data
  }

  async forgotPassword(email: string): Promise<SuccessResponse> {
    let response = await this.axios.post(`${this.endpoint}/forgot_password`, { email })
    return response.data
  }

  async resetPassword(token: string, password: string, code?: string): Promise<SignInResponse> {
    let response = await this.axios.post(`${this.endpoint}/reset_password`, { token, password, code })
    return response.data
  }

  async loginSuccess(code: string,): Promise<SuccessResponse> {
    let response = await this.axios.post(`${this.endpoint}/login_success`, { code })
    return response.data
  }

  // google oauth

  // returns 'Contacts' only, including photo links
  async getGoogleContactsViaPeopleApi(accessToken: string): Promise<GooglePeopleApiResponse> {
    let response = await this.axios.get(
      'https://people.googleapis.com/v1/people/me/connections?personFields=names,nicknames,emailAddresses,photos',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    return response.data
  }

  // returns 'Contacts', 'Other contacts', 'Frequently contacted', etc, but doesn't include photo links.
  // note: returns 401 if permissions not granted.
  async getGoogleContactsViaContactsApi(accessToken: string, email: string): Promise<GoogleContactsApiResponse> {
    // go through our server to avoid cross-origin issue
    let response = await this.axios.get(`${this.endpoint}/google_contacts_api?access_token=${accessToken}&email=${email}`)
    return response.data
  }

  // user management

  async updateUser(updates: Partial<User>): Promise<UserResponse> {
    let response = await this.axios.put(`${this.endpoint}/user`, updates)
    return response.data
  }

  async getUser(): Promise<UserResponse> {
    let response = await this.axios.get(`${this.endpoint}/user`)
    return response.data
  }

  async verifyEmail(code?: string): Promise<SuccessResponse> {
    let response = await this.axios.post(`${this.endpoint}/verify_email`, { code })
    return response.data
  }

  async listTeams(includeIntegrations = false): Promise<TeamsResponse> {
    let response = await this.axios.get(`${this.endpoint}/teams${includeIntegrations ? "?include_integrations=true" : ""}`)
    return response.data
  }

  async getTeam(team: { id: string }, includeIntegrations = false): Promise<TeamResponse> {
    let response = await this.axios.get(`${this.endpoint}/teams/${team.id}${includeIntegrations ? "?include_integrations=true" : ""}`)
    return response.data
  }

  async joinTeam(team: Partial<Team>): Promise<SuccessResponse> {
    let response = await this.axios.post(`${this.endpoint}/teams/${team.id}/join`)
    return response.data
  }

  async leaveTeam(team: Team): Promise<SuccessResponse> {
    let response = await this.axios.post(`${this.endpoint}/teams/${team.id}/leave`)
    return response.data
  }

  // team creation and updating

  async createTeam(team: Team, source: string): Promise<TeamResponse> {
    let response = await this.axios.post(`${this.endpoint}/teams/create`, { ...team, source })
    return response.data
  }

  async renameTeam(team: Team, name: string): Promise<TeamResponse> {
    let response = await this.axios.put(`${this.endpoint}/teams/${team.id}`, { name })
    return response.data
  }

  async updateTeam(team: Team, updates: Partial<Team>): Promise<TeamResponse> {
    let response = await this.axios.put(`${this.endpoint}/teams/${team.id}`, updates)
    return response.data
  }

  async updateTeamSettings(team: Team, updates: { presence?: number, user_team_meta?: UserTeamMeta }): Promise<SuccessResponse> {
    let response = await this.axios.put(`${this.endpoint}/teams/${team.id}/settings`, updates)
    return response.data
  }

  async removeMember(team: Team, member: Member): Promise<SuccessResponse> {
    const response = await this.axios.delete(`${this.endpoint}/teams/${team.id}/members/${member.id}`)
    return response.data
  }

  async updateMember(team: Team, member: Member, updates: { role: Role }): Promise<SuccessResponse> {
    let response = await this.axios.put(`${this.endpoint}/teams/${team.id}/members/${member.id}`, updates)
    return response.data
  }

  // images

  async uploadProfilePicture(file: File): Promise<UserResponse> {
    const formData = new FormData()
    formData.append('upload', file)
    const response = await this.axios.post(`${this.endpoint}/images/profile_picture`, formData, {
      headers: { 'Content-Type': `multipart/form-data` }
    })
    return response.data
  }

  async uploadAttachment(blob: Blob, filename: string): Promise<{ url: string }> {
    const file = new File([blob], filename);
    const formData = new FormData()
    formData.append('upload', file)
    formData.append('token', this.token)

    const response = await this.axios.post(`${API.endpoint}/chat/attachment`, formData, {
      headers: { 'Content-Type': `multipart/form-data` }
    })
    return response.data
  }

  async sendFiles(userId: string, teamId: string, channelId: string, description: string): Promise<SuccessResponse> {
    let response = await this.axios.post(`${this.endpoint}/files/send`, {
      user_id: userId,
      team_id: teamId,
      channel_id: channelId,
      description
    })
    return response.data
  }

  // configuration

  async appVersion(): Promise<{ version: string }> {
    let response = await this.axios.get(`${this.endpoint}/app_version`)
    return response.data
  }

  async time(): Promise<{ time: number }> {
    let response = await this.axios.get(`${this.endpoint}/time`)
    return response.data
  }

  async productUpdates(): Promise<{ posts: any[] }> {
    let response = await this.axios.get(`${this.endpoint}/product_updates`)
    return response.data
  }

  // logging

  async logEvents(events: APIEvent[]): Promise<SuccessResponse> {
    let response = await this.axios.post(`${this.endpoint}/log_events`, { events })
    return response.data
  }

  async logError(error: any): Promise<SuccessResponse> {
    let response = await this.axios.post(`${this.endpoint}/log_error`, error)
    return response.data
  }

  async logFeedback(message: string, context: any): Promise<SuccessResponse> {
    let response = await this.axios.post(`${this.endpoint}/log_feedback`, { message, context })
    return response.data
  }

  async postUserLog(): Promise<{ url: string, path: string }> {
    let response = await this.axios.post(`${this.endpoint}/logs/upload_user`, {})
    return response.data
  }

  async logUploaded(team: Team, path: string, type: 'call' | 'user', reason: string, key: string, notes: string): Promise<SuccessResponse> {
    let response = await this.axios.post(`${this.endpoint}/logs/uploaded`, { team_id: team.id,
      path, type, reason, key, notes })
    return response.data
  }

  async analyticsCheck(): Promise<SuccessResponse> {
    let response = await this.axios.get(`${this.endpoint}/analysis/can_view`)
    return response.data
  }

  async analyticsData(source: string): Promise<AnalyticsResponse> {
    let response = await this.axios.get(`${this.endpoint}/analysis/query?source=${source}`)
    return response.data
  }

  async uploadedLogs(filters: { type: 'call' | 'user', user_uuid: string, team_uuid: string, reason: string }): Promise<UploadedLogListResponse> {
    const queryString = Object.keys(filters).filter(key => filters[key]).map((key) =>
      encodeURIComponent(key) + '=' + encodeURIComponent(filters[key])
    ).join('&')
    let response = await this.axios.get(`${this.endpoint}/logs/list?${queryString}`)
    return response.data
  }

  async updateFeedback(id: number, updates: any): Promise<SuccessResponse> {
    const response = await this.axios.put(`${this.endpoint}/logs/feedback/${id}`, updates)
    return response.data
  }

  async uploadedLog(type: 'call' | 'user', key: string): Promise<UploadedLogResponse> {
    let response = await this.axios.get(`${this.endpoint}/logs/view?type=${type}&key=${key}`)
    return response.data
  }

  async okrs(): Promise<string> {
    let response = await this.axios.get(`${this.endpoint}/analysis/okrs`)
    return response.data
  }

  // oauth

  async oauthToken(service: string, team?: Team): Promise<TokenResponse> {
    let url = `${this.endpoint}/oauth/token?service=${service}`
    if (team) url += `&team=${team.id}`
    let response = await this.axios.get(url)
    return response.data
  }

  async updateOAuthToken(service: string, updates: Partial<OAuthToken<any>>): Promise<TokenResponse> {
    let response = await this.axios.put(`${this.endpoint}/oauth/token?service=${service}`, updates)
    return response.data
  }

  async deleteOAuthToken(service: string, team?: Team): Promise<SuccessResponse> {
    let url = `${this.endpoint}/oauth/token?service=${service}`
    if (team) url += `&team=${team.id}`
    const response = await this.axios.delete(url)
    return response.data
  }

  async completeOAuthWithCode(
    redirect_uri: string,
    code: string,
    team: string,
    service: string
  ): Promise<TokenResponse> {
    let response = await this.axios.post(`${this.endpoint}/oauth/connect`, { service, code, team, redirect_uri })
    return response.data
  }

  async completeExistingOAuthWithCode(
    access_token: string,
    refresh_token: string,
    expires_in: number,
    team: string,
    service: string
  ): Promise<TokenResponse> {
    let response = await this.axios.put(`${this.endpoint}/oauth/token`, { service, team, access_token, refresh_token, expires_in })
    return response.data
  }

  async refreshOAuthToken(service: string): Promise<TokenResponse> {
    let response = await this.axios.post(`${this.endpoint}/oauth/refresh`, { service })
    return response.data
  }

  // general functions

  logOut() {
    this.axios.defaults.headers.common['Authorization'] = null
  }

  // Return a number representing the skew between client time and server time. It should be
  // subtracted from client time to give server time.
  async getClockSkew(): Promise<number> {
    const start = performanceNow()
    const response = await this.time()
    const rtt = performanceNow() - start
    // factor in round-trip time as part of "clock"
    return Date.now() - response.time - (rtt / 2)
  }

  // user data

  async getUserData(key: string, teamId?: string): Promise<any> {
    const teamParam = teamId ? `team=${teamId}&` : ''
    const response = await this.axios.get(`${this.endpoint}/users/data?${teamParam}key=${encodeURIComponent(key)}`)
    return response.data.data
  }

  async setUserData(key: string, data: any, teamId?: string): Promise<SuccessResponse> {
    const teamParam = teamId ? `team=${teamId}&` : ''
    const response = await this.axios.post(`${this.endpoint}/users/data?${teamParam}key=${encodeURIComponent(key)}`, { data })
    return response.data
  }

  // mobile

  async registerPushToken(type: PushTokenType, token: string, device_id: string, name: string): Promise<SuccessResponse> {
    const response = await this.axios.post(`${this.endpoint}/mobile/register_token`, { type, token, device_id, name })
    return response.data
  }

  async unregisterPushToken(type: PushTokenType, token: string): Promise<SuccessResponse> {
    const response = await this.axios.post(`${this.endpoint}/mobile/unregister_token`, { type, token })
    return response.data
  }

  async activeTokens(): Promise<{ tokens: { name: string, type: string, inserted_at: string }[] }> {
    const response = await this.axios.get(`${this.endpoint}/mobile/active_tokens`)
    return response.data
  }

}

export const API = new APIService()
