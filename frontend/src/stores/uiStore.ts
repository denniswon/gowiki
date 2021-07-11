import create, { GetState, SetState } from 'zustand'

import { authActions } from '@gowiki/api'
import { settingsActions, settingsApi } from '@gowiki/app'
import {
  debounce, DebounceStyle, logger, MAIN_APP_MIN_SIZE, Themes
} from '@gowiki/core'
import sounds, { Sound } from '@gowiki/sounds'

import appService from 'services/appService'
import { trackerApp } from 'services/tracker'

import { m } from 'styles'

// check for a new server version interval
export const REFRESH_CHECK_EVERY = 15 * 60 * 1000

// if client has been open for this much time, refresh
export const AUTO_REFRESH_TIME = 24 * 3600 * 1000

export const VIDEOS_PER_PAGE_AUTO = -1

export const DETAILS_PANE_WIDTH = 290

export const MAIN_APP_IDEAL_WIDTH = 270

export type CallServiceOptions = {
  ionHost?: string
}

export type DetailsPane = {
  userId?: string,
  roomId?: string,
  meetingId?: string,
  leadId?: string,
  shiftX?: { new: number, original: number },
  baseWidth: number
}

const LS_DETAIL_PANE = 'detail_pane'

const LS_UPDATE_STARTED = 'update_started'
const LS_SKIP_UPDATE = 'update_skip'
export class UIStore {
  // modals
  showInviteTeammatesModal?: boolean
  showCreateTeam?: boolean
  popoverModal?: { message: string, buttons?: string[], input?: string, action?: (okPressed: boolean, input?: string) => void }
  detailsPane?: DetailsPane
  actions: UIActions
}

class UIActions {
  constructor(public set: SetState<UIStore>, public get: GetState<UIStore>) {}

  // --- initialization

  initUIStore = () => {
    this.initListeners()
    if (authActions.showDevActions()) window['uiStore'] = this
    this.initMainPanel()
  }

  initListeners = () => {
    this.initMainListeners()
  }

  onSettingChange = (payload: any) => {
    logger.info('Updated settings', payload)
    if (payload.updates) {
      settingsActions.set(_ => payload.updates)
      if (payload.updates.soundsDisabled !== undefined) sounds.setSoundsDisabled(payload.updates.soundsDisabled)
    }
  }

  initMainListeners = () => {
  
  }

  initMainPanel = () => {
    if (settingsApi.getState().theme == Themes.DARK) {
      document.documentElement.style.background = m.themes.darkBackground.background
    }
  }

  pageLoadDate = Date.now()
  shouldRefresh = false

  
  refreshWhenReady = (reason?: string) => {
    trackerApp.refreshTriggered()
  }

  // --- ui flags

 
  // --- settings changes

  // --- details pane
  showDetailsPane = (item: { userId?: string, roomId?: string, meetingId?: string, leadId?: string }, stayOpen?: boolean) => debounce('uistore-show-details-pane', () => {
    const { detailsPane: currentPane } = this.get()
    if (!currentPane && !item) return

    const { clientWidth, clientHeight } = document.body
    const currentX = window.screenLeft
    const screenEdge = window.screen['availLeft'] + window.screen.width

    const baseWidth = currentPane ? currentPane.baseWidth :
      clientWidth < (MAIN_APP_IDEAL_WIDTH + DETAILS_PANE_WIDTH) ?
      Math.max(MAIN_APP_IDEAL_WIDTH, clientWidth) : (clientWidth - DETAILS_PANE_WIDTH)
    const newWidth = baseWidth + DETAILS_PANE_WIDTH
    const shiftX = currentPane ? currentPane.shiftX :
      (currentX + newWidth + 5) > screenEdge ? { new: screenEdge - newWidth - 5, original: currentX } : null

    let newSetting: DetailsPane = item ? { ...item, shiftX, baseWidth } : null
    if (currentPane && item && !stayOpen) {
      if (item.userId && item.userId == currentPane.userId) newSetting = null
      else if (item.roomId && item.roomId == currentPane.roomId) newSetting = null
      else if (item.meetingId && item.meetingId == currentPane.meetingId) newSetting = null
      else if (item.leadId && item.leadId == currentPane.leadId) newSetting = null
    }

    this.set(_ => ({ detailsPane: newSetting }))
    logger.info(`UI —— showDetailsPane`, item, currentPane, '->', newSetting)

    if (!currentPane) {
      // resize window to show detail pane
      localStorage.setItem(LS_DETAIL_PANE, 'true')
    }
  }, DebounceStyle.IMMEDIATE_THEN_WAIT, 50)

  updateDetailPaneWidth = () => {
    const { detailsPane } = this.get()
    if (!detailsPane) return
    const { clientWidth } = document.body
    if (clientWidth - DETAILS_PANE_WIDTH < MAIN_APP_MIN_SIZE.width) {
      this.set(_ => ({ detailsPane: null }))
    } else if (clientWidth - DETAILS_PANE_WIDTH < detailsPane.baseWidth) {
      this.set(_ => ({ detailsPane: { ...detailsPane, baseWidth: clientWidth - DETAILS_PANE_WIDTH } }))
    }
  }

  // --- modals

  toggleInviteTeammatesModal = (toggle?: boolean) => {
    logger.info(`UI —— toggleInviteTeammatesModal`, toggle)
    this.set(state => ({ showInviteTeammatesModal: toggle === undefined ? !state.showInviteTeammatesModal : toggle }))
  }

  showPopover = (
    message: string,
    duration?: number,
    confirmAction?: (okPressed: boolean, text?: string) => void,
    buttons?: string[],
    input?: string
  ) => {
    logger.info('UI - showPopover', message, duration, buttons)
    this.set(_ => ({
      popoverModal: {
        message,
        action: confirmAction,
        buttons,
        input
      }
    }))
    if (duration) setTimeout(this.clearPopover, duration)
  }

  clearPopover = () => {
    this.set(_ => ({
      popoverModal: null,
    }))
  }

}

export const [useUIStore, uiApi] = create<UIStore>((set, get) => ({
  fileUploadProgressMap: {},

  sounds: [],

  actions: new UIActions(set, get as any)
}))

export const uiActions = uiApi.getState().actions

// store last 3 notifications. we don't want to store too many for memory reasons
let activeNotifications: Notification[] = []
const MAX_NOTIFICATION_COUNT = 3

export function showNotification(
  title: string,
  body?: string,
  onClick?: () => void,
  customSound?: Sound,
  options?: NotificationOptions
) {
  if (typeof Notification != 'function') return
  if (!options) options = {}
  options.silent = true
  if (body) options.body = body
  const notification = new Notification(title, options)

  if (onClick) {
    // store a pointer to this notification so it doesn't get garbage collected
    notification.onclick = onClick
    activeNotifications.unshift(notification)
    activeNotifications = activeNotifications.slice(0, MAX_NOTIFICATION_COUNT)
  }

  if (customSound) sounds.play(customSound)
  return notification
}
