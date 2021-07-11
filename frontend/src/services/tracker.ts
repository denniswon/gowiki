import { EventType, tracker, TrackerListener } from '@gowiki/api'
import {
  config, OSInfo, SettingsSource, Team, toTitleCase, User
} from '@gowiki/core'

export type CustomStatusUpdateSource = 'modal-form' | 'modal-preset'

const LS_REF_DATA = 'ref'

/**
 * Misc App Tracking
 */
class TrackerApp extends TrackerListener {

  // --- listener setup

  initialize() {
    this.initAmplitude()
    this.initSentry()
    tracker.addListener(this)
  }

  pageView(pageName: string, value1: string, source: string) {
    this.amplitudeLogEvent(pageName, { value1, source })
  }

  event(category: EventType, action: string, value1: string, value2: string, value3: number, source: string) {
    this.amplitudeLogEvent(action, { value1, value2, value3, source })
  }

  updateMetadata(user: User, team: Team, version: string) {
    this.amplitudeUpdateMetadata(user, team)
    // Sentry.configureScope(scope => {
    //   scope.setUser({
    //     id: user?.id,
    //     username: user?.name,
    //     team: team?.name
    //   })
    // })
  }

  handledError(e: Error) {
    // Sentry.captureException(e)
  }

  // -- ref tracking

  trackRef(ref: string, referrer: string, utm: string) {
    const data: any = {}
    if (ref) data.ref = ref
    if (utm) data.utm = utm
    if (referrer) data.referrer = referrer
    if (Object.keys(data).length > 0) {
      const refData = JSON.stringify(data)
      tracker.event(EventType.ACTION, 'referrer', refData)
      localStorage.setItem(LS_REF_DATA, refData)
    }
  }

  getReferrer() {
    return localStorage.getItem(LS_REF_DATA)
  }

  // --- amplitude

  amplitudeInitialized = false

  initAmplitude() {
    if (this.amplitudeInitialized) return
    // if (config.dev) apiKey = config.amplitude.dev
    // amplitude.getInstance().init(apiKey, null, {
    //   includeUtm: true,
    //   includeReferrer: true,
    //   saveEvents: true
    // })
    this.amplitudeInitialized = true
  }

  amplitudeUpdateMetadata(user: User, team: Team) {
    if (!this.amplitudeInitialized) return
    // const client = amplitude.getInstance()
    // client.setVersionName(window.appVersion)
    // client.setUserProperties({ team: team?.name, hash: config.hash })
    // client.setUserId(user?.id)
  }

  amplitudeLogEvent(event: string, props?: any) {
    if (!this.amplitudeInitialized) return
    if (event.startsWith('channel') || event == 'showYoureMuted' || event == 'callMuteOff' ||
      event.startsWith('daily') || event.startsWith('ion')) return
    if (props) Object.keys(props).forEach(key => props[key] === undefined && delete props[key])
    // amplitude.getInstance().logEvent(event, props)
  }

  // ---

  initSentry() {
    if (config.dev) return
    // Sentry.init({
    //   dsn: config.sentry.web
    // })
  }

  // ---

  /** undocumented */
  home() {
    tracker.pageView('home')
  }

  // --- Invitations

  /** undocumented */
  invitesSend(emails: string[], source: string) {
    tracker.event(EventType.ACTION, 'invitesSend', source, emails.join(', '))
  }

  /** undocumented */
  googleInvitesSend(team: string, count: number) {
    tracker.event(EventType.ACTION, 'googleInvitesSend', team, count + ' users')
  }

  /** undocumented */
  emailInvitesSend(team: string, count: number, source: string) {
    tracker.event(EventType.ACTION, 'emailInvitesSend', team, count + ' users', count, null, source)
  }

  /** undocumented */
  emailInvitesError(message: string) {
    tracker.event(EventType.ACTION, 'emailInvitesSend', message)
  }

  /** undocumented */
  emailInvitesScreenResult(team: string, result: string) {
    tracker.event(EventType.ACTION, 'emailInvitesScreenResult', `${team} - ${result}`, result)
  }

  /** undocumented */
  googleContactsPermissionDenied() {
    tracker.event(EventType.ACTION, 'googleContactsPermissionDenied')
  }

  /** undocumented */
  invitesCopy(source: string) {
    tracker.event(EventType.ACTION, 'invitesCopy', source)
  }

  /** undocumented */
  inviteModalOpen(source: string) {
    tracker.event(EventType.ACTION, 'inviteModalOpen', source)
  }

  // --- Download

  /** undocumented */
  landingAction(action: string) {
    tracker.event(EventType.ACTION, 'landingAction-' + action)
  }

  // --- Files & links

  /** undocumented */
  fileDropped(name: string, count: number) {
    tracker.event(EventType.ACTION, 'fileDropped', name, `${count} files`)
  }

  /** undocumented */
  fileSent(file: string, user: string) {
    tracker.event(EventType.ACTION, 'fileSent', file, user)
  }

  /** undocumented */
  fileReceived(file: string) {
    tracker.event(EventType.ACTION, 'fileReceived', file)
  }


  // --- Refresh

  /** undocumented */
  refreshPopupShown() {
    tracker.event(EventType.ACTION, 'refreshPopupShown')
  }

  /** undocumented */
  refreshTriggered() {
    tracker.event(EventType.ACTION, 'refreshTriggered')
  }

  // --- Notifications

  /** undocumented */
  notifPermissionsGranted(source: string) {
    tracker.event(EventType.ACTION, 'notifPermissionsGranted', source)
  }

  /** undocumented */
  notifPermissionsDenied(source: string) {
    tracker.event(EventType.ACTION, 'notifPermissionsDenied', source)
  }

  // --- Onboarding

  /** undocumented */
  onboardingStep(name: string, step: number) {
    tracker.event(EventType.ACTION, 'onboardingStep', name, 'step ' + step, step)
  }

  /** undocumented */
  onboardingSkipped(step: number) {
    tracker.event(EventType.ACTION, 'onboardingSkipped', 'from ' + step)
  }

  /** undocumented */
  surveySubmit() {
    tracker.event(EventType.ACTION, 'surveySubmit')
  }

  /** undocumented */
  surveyError(error: string) {
    tracker.event(EventType.ACTION, 'surveyError', error)
  }

  // --- App Actions

  /** undocumented */
  appSettingsMenuOpen() {
    tracker.event(EventType.ACTION, 'appSettingsMenuOpen')
  }

  /** undocumented */
  appTeamMenuOpen() {
    tracker.event(EventType.ACTION, 'appTeamMenuOpen')
  }

  /** undocumented */
  appReload() {
    tracker.event(EventType.ACTION, 'appReload')
  }

  /** undocumented */
  appIsAlive() {
    tracker.event(EventType.ACTION, 'appIsAlive')
  }

  /** undocumented */
  appSwitchHost(host: string) {
    tracker.event(EventType.ACTION, 'appSwitchHost', host)
  }

  /** undocumented */
  appOpenUrl(url: string) {
    tracker.event(EventType.ACTION, 'appOpenUrl', url)
  }

  /** undocumented */
  appShowSettingsWindow(path: string, source: SettingsSource) {
    tracker.event(EventType.ACTION, 'appShowSettingsWindow', path, null, null, null, source)
  }

  /** undocumented */
  appSettingsScreen(screenName: string) {
    tracker.event(EventType.ACTION, 'appSettingsScreen', screenName)
  }

  /** undocumented */
  appTeamSettingsScreen() {
    tracker.event(EventType.ACTION, 'appTeamSettingsScreen')
  }

  /** undocumented */
  appCreateTeamScreen() {
    tracker.event(EventType.ACTION, 'appCreateTeamScreen')
  }

  /** undocumented */
  newTeamModalOpen(source: string) {
    tracker.event(EventType.ACTION, 'newTeamModalOpen', source)
  }

  // --- errors

  /** undocumented */
  logError(message: string, message2?: string) {
    tracker.event(EventType.ACTION, 'error', message, message2)
  }

  /** undocumented */
  logApiError(message: string, message2?: string) {
    tracker.event(EventType.ACTION, 'apiError', message, message2)
  }

}

export const trackerApp = new TrackerApp()
