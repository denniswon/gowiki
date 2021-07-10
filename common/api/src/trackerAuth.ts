import { Member, Role, Team, User } from '@gowiki/core'

import { EventType, tracker } from './tracker'

/**
 * Authentication tracking
 */
class TrackerAuth {

  // --- auth

  /**
   * Forgot password email was triggered
   * @param {string} value1 email
   */
  forgotPassword(email: string) {
    tracker.event(EventType.ACTION, 'authForgotPassword', email)
  }

  /**
   * Password reset successful
   * @param {string} value1 email
   */
  passwordReset(u: User) {
    tracker.event(EventType.ACTION, 'authPasswordReset', u.email)
  }

  /** undocumented */
  editProfile(updates: User) {
    tracker.event(EventType.ACTION, 'authEditProfile', JSON.stringify(updates))
  }

  /** undocumented */
  createUserAndTeam(u: User, teamname: string) {
    tracker.event(EventType.ACTION, 'authCreateUserAndTeam', u.email, teamname)
  }

  /** undocumented */
  signOut() {
    tracker.event(EventType.ACTION, 'authSignOut')
  }

  /** undocumented */
  onTwoFactorAction(action: string) {
    tracker.event(EventType.ACTION, 'authTwoFactorAction', action)
  }

  // --- oauth

  /** undocumented */
  oauthStart(provider: string, mode: string) {
    tracker.event(EventType.ACTION, 'authOAuth-' + provider, mode)
  }

  /** undocumented */
  googOAuthStart(type: string) {
    tracker.event(EventType.ACTION, 'googOAuthStart', type)
  }

  /** undocumented */
  googOAuthSuccess(type: string) {
    tracker.event(EventType.ACTION, 'googOAuthSuccess', type)
  }

  /** undocumented */
  googOAuthForce(type: string) {
    tracker.event(EventType.ACTION, 'googOAuthForce', type)
  }

  /** undocumented */
  googOAuthError(message: string) {
    tracker.event(EventType.ACTION, 'googOAuthError', message)
  }

  /** undocumented */
  googOAuthSignupWithCalendar() {
    tracker.event(EventType.ACTION, 'googOAuthSignupWithCalendar')
  }

  /** undocumented */
  googOAuthSignupWithoutCalendar() {
    tracker.event(EventType.ACTION, 'googOAuthSignupWithoutCalendar')
  }

  /** undocumented */
  googOAuthAddCalendar() {
    tracker.event(EventType.ACTION, 'googOAuthAddCalendar')
  }

  // --- Team Creation

  /** undocumented */
  createTeam(team: string, domain: string) {
    tracker.event(EventType.ACTION, 'createTeam', team, domain)
  }

  /** undocumented */
  createTeamError(message: string) {
    tracker.event(EventType.ACTION, 'createTeamError', message)
  }

  /** undocumented */
  appCreateTeam(name: string) {
    tracker.event(EventType.ACTION, 'appCreateTeam', name)
  }

  // --- Teams Management

  /** undocumented */
  teamSwitch(name: string) {
    tracker.event(EventType.ACTION, 'teamSwitch', name)
  }

  teamUpdate(team: Team, updates: any) {
    tracker.event(EventType.ACTION, 'teamUpdate', JSON.stringify(updates), team.id)
  }

  /** undocumented */
  teamLeave(name: string) {
    tracker.event(EventType.ACTION, 'teamLeave', name)
  }

  /** undocumented */
  teamMemberRemove(team: Team, member: Member) {
    tracker.event(EventType.ACTION, 'teamRemoveMember', null, null, null, null, null, member.id, member.name)
  }

  /** undocumented */
  teamMemberAssignRole(team: Team, member: Member, role: Role) {
    tracker.event(EventType.ACTION, 'teamMemberAssignRole', role, null, null, null, null, member.id, member.name)
  }

  /** undocumented */
  privacySettingUpdate(team: Team, setting: string) {
    tracker.event(EventType.ACTION, 'privacySettingUpdate', setting, team.name)
  }

  // --- Session management

  /** undocumented */
  sessionStart() {
    tracker.event(EventType.ACTION, 'sessionStart')
  }

  /** undocumented */
  sessionEnd(durationSecs: number) {
    tracker.event(EventType.ACTION, 'sessionEnd', durationSecs + ' sec', null, durationSecs)
  }

  /** undocumented */
  sessionDisconnected(source: string) {
    tracker.event(EventType.ACTION, 'sessionDisconnected', source, null, null, null, null, null, null, true)
  }

  /** undocumented */
  sessionReconnected(source: string) {
    tracker.event(EventType.ACTION, 'sessionReconnected', source, null, null, null, null, null, null, true)
  }

}

export const trackerAuth = new TrackerAuth()
