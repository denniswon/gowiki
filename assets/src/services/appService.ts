import PubSub from 'pubsub-js'

import { authApi } from '@gowiki/api'
import { AppInterface, appService } from '@gowiki/app'
import {
  config, FunctionArgs, isMac, isMobile, logger, minAppVersion, PubSubAction, SettingsSource,
  Team, TooltipAction, TooltipActionType, TooltipData, TooltipType, WindowFlags
} from '@gowiki/core'
import sounds, { Sound } from '@gowiki/sounds'

import { showNotification, uiActions } from 'stores/uiStore'
import { zoomLevel } from 'utils/zoom'

import { trackerApp as tracker } from './tracker'

// app - electron binding service
export class WebAppService implements AppInterface {

  showTooltip(element: HTMLElement, tooltip: TooltipData, toggle?: boolean, offsetY?: number): void {
    throw new Error('Method not implemented.')
  }
  hideTooltip(force?: boolean): void {
    throw new Error('Method not implemented.')
  }
  setBadge(count: number, bounce?: boolean): void {
    throw new Error('Method not implemented.')
  }
  isOnboarding(): boolean {
    throw new Error('Method not implemented.')
  }
  onboardingAction(action: 'pause' | 'resume' | 'joined-room'): void {
    throw new Error('Method not implemented.')
  }
  setWindowFlags(flags: WindowFlags): void {
    throw new Error('Method not implemented.')
  }
  updateSettings(updates: any): void {
    throw new Error('Method not implemented.')
  }
  showSettings(page: string, source: SettingsSource): void {
    throw new Error('Method not implemented.')
  }
  
  openUrl(url: string, userName?: string) {
    if (!url) return
    if (userName) {
      url = url.replace(/.tandem_follow=[^&]+/, '')
      if (!url.includes('#')) {
        url = url + (url.includes('?') ? '&' : '?') + 'tandem_follow=' + userName
      }
    }
    if (url.includes('https://quickpad.us')) {
      const urlObj = new URL(url)
      url = `${urlObj.origin}${urlObj.pathname}?name=${authApi.getState().user.nickname}`
    }
    logger.info('[app] open url', url)
    tracker.appOpenUrl(url)
    PubSub.publish(PubSubAction.OPENED_URL, url)
    window.open(url, '_blank')
  }

  calcTooltipHeight = (type: TooltipType, actions: TooltipAction[]) => {
    const height = actions.reduce((r, a) => {
      if (a.type == TooltipActionType.TITLE) { return r + 26 }
      if (a.type == TooltipActionType.SEPARATOR) return r + 9
      if (a.type == TooltipActionType.SLIDER) return r + 48
      if (a.description) return r + 48
      return r + 32
    }, 17)
    return height
  }

  showPopover(message: string, dismissAfter?: number, onClick?: (okButton: boolean) => void, buttons?: string[]) {
    uiActions.showPopover(message, dismissAfter, onClick, buttons)
  }

  clearPopover() {
    uiActions.clearPopover()
  }

  showNotification = (title: string, body: string, onClick: () => void, sound?: Sound, options?: NotificationOptions) => {
    showNotification(title, body, onClick, sound, options)
  }

  playSound = (sound: Sound) => {
    sounds.play(sound)
  }
}

const webAppService = new WebAppService()

appService.setAppInterface(webAppService)

export default webAppService
