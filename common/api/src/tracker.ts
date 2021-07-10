import { config, EventsQueue, getBrowserOS, logger, Team, User } from '@gowiki/core'

import { API, APIEvent } from './api'

export enum EventType {
  SCREEN_VIEW = 'screen',
  ACTION = 'action',
  AUTO = 'auto'
}

export class TrackerListener {

  pageView(pageName: string, value1: string, source: string) {}

  event(category: EventType, action: string, value1: string, value2: string, value3: number, source: string) {}

  updateMetadata(user: User, team: Team, version: string) {}

  handledError(e: Error) {}

  // events that are not logged by our system but consumed by listeners
  thirdPartyEvent(action: string, value1: string, value2: string, value3: number) {}

}

const LS_SESSION_ID = 'session_id'

const hash = config.hash
const browserOS = getBrowserOS()
const userAgent = navigator.userAgent
  ? navigator.userAgent
    .replace('Mozilla/5.0 ', '')
    .replace('(KHTML, like Gecko) ', '')
    .replace('Macintosh; ', '')
    .substr(0, 100) : ''

class Tracker {

  currentScreen: string
  currentParam: string

  sessionId: string

  user: User
  team: Team
  callId: string

  listeners: TrackerListener[] = []

  eventsQueue = new EventsQueue<APIEvent>(e => {
    if (IS_TEST) return Promise.resolve()
    return API.logEvents(e)
  })

  os: string = browserOS
  appVersion: string = window.appVersion
  version: string = `${config.appVersion}-${config.hash}`

  // --- initialize

  addListener(t: TrackerListener) {
    if (!this.listeners.find(l => l != t)) {
      this.listeners.push(t)
      t.updateMetadata(this.user, this.team, this.version)
    }
  }

  // --- analytics functions

  getSessionId() {
    if (!this.sessionId) {
      this.sessionId = localStorage.getItem(LS_SESSION_ID) ||
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      localStorage.setItem(LS_SESSION_ID, this.sessionId)
    }
    return this.sessionId
  }

  logEvent(
    type: string,
    name: string,
    source?: string,
    value1?: string,
    value2?: string,
    value3?: number,
    meta?: any,
    targetUserId?: string,
    targetUsername?: string
  ) {
    this.eventsQueue.push(
      new APIEvent(
        Date.now(),
        this.user?.id,
        this.user?.name,
        this.team?.id,
        this.team?.name,
        targetUserId,
        targetUsername,
        this.getSessionId(),
        type,
        name,
        source,
        value1,
        value2,
        value3,
        meta,
        this.os,
        this.appVersion,
        hash,
        userAgent,
        config.env
      )
    )
  }

  pageView(pageName: string, value1?: string, value2?: string, value3?: number, meta?: any, source?: string) {
    if (pageName == this.currentScreen && this.currentParam == value1) return
    source = source || this.currentScreen
    const logData = { value1, value2, value3, meta, source }
    Object.keys(logData).forEach(key => logData[key] === undefined && delete logData[key])
    logger.info(`PAGEVIEW ——`, pageName, logData)
    if (!pageName) {
      return
    }
    this.listeners.forEach(l => l.pageView(pageName, value1, source))
    if (pageName != 'landing') this.logEvent(EventType.SCREEN_VIEW, pageName, this.currentScreen, value1, value2, value3, meta)
    this.setCurrentScreen(pageName, value1)
  }

  event(
    category: EventType,
    action: string,
    value1?: string,
    value2?: string,
    value3?: number,
    meta?: any,
    source?: string,
    targetUserId?: string,
    targetUsername?: string,
    skipListeners?: boolean
  ) {
    source = source || this.currentScreen
    const logData = { source, category, value1, value2, value3, meta, targetUserId, targetUsername }
    Object.keys(logData).forEach(key => logData[key] === undefined && delete logData[key])
    logger.info(`EVENT ——`, action, logData)
    if (!action) return
    this.logEvent(category, action, source, value1, value2, value3, meta, targetUserId, targetUsername)
    if (!skipListeners) this.listeners.forEach(l => l.event(category, action, value1, value2, value3, source))
  }

  thirdPartyEvent(action: string, value1?: string, value2?: string, value3?: number) {
    this.listeners.forEach(l => l.thirdPartyEvent(action, value1, value2, value3))
  }

  setCurrentScreen(screen: string, param: string) {
    this.currentScreen = screen
    this.currentParam = param
  }

  onChangeUser(newUser: User) {
    this.user = newUser
    this.listeners.forEach(l => l.updateMetadata(this.user, this.team, this.version))
  }

  onChangeTeam(newTeam: Team) {
    this.team = newTeam
    this.listeners.forEach(l => l.updateMetadata(this.user, this.team, this.version))
  }

  getUserAndTeam() {
    return [this.user, this.team]
  }

  updateCallId(newCallId: string) {
    this.callId = newCallId
  }

  flush() {
    this.eventsQueue.flush()
  }

  // --- error handling

  handledError(e: Error) {
    this.listeners.forEach(l => l.handledError(e))
  }

}

export const tracker = new Tracker()
