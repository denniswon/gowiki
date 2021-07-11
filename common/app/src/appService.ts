import PubSub from 'pubsub-js'

import {
  PubSubAction, SettingsSource, TooltipData, WindowFlags
} from '@gowiki/core'

// interface between app & presence
import { AppInterface } from './appInterface'
import { Sound } from '@gowiki/sounds'

export class AppService implements AppInterface {

  impl: AppInterface

  setAppInterface(impl: AppInterface) {
    if (!this.impl) {
      PubSub.subscribe(PubSubAction.UPDATE_USER, (_, user) => this.updateSettings({ user }))
      PubSub.subscribe(PubSubAction.UPDATE_TEAM, (_, team) => this.updateSettings({ team }))
    }
    this.impl = impl
  }

  // --- interface methods

  // --- os interface

  playSound = (sound: Sound) => this.impl.playSound(sound)

  showNotification(title: string, body?: string, onClick?: () => void, sound?: Sound, options?: NotificationOptions) {
    return this.impl.showNotification(title, body, onClick, sound, options)
  }

  openUrl = (...args) => this.impl.openUrl.apply(this.impl, args)
  setBadge = (...args) => this.impl.setBadge.apply(this.impl, args)

  // --- app logic

  isOnboarding = (...args) => this.impl.isOnboarding.apply(this.impl, args)
  onboardingAction(action: 'pause' | 'resume' | 'joined-room') { return this.impl.onboardingAction.apply(this.impl, arguments) }
  setWindowFlags = (flags: WindowFlags) => this.impl.setWindowFlags(flags)

  // --- cross-window communication

  showPopover(message: string, dismissAfter?: number, onClick?: (okButton: boolean) => void, buttons?: string[]) {
    return this.impl.showPopover(message, dismissAfter, onClick, buttons) }

  clearPopover() {
    return this.impl.clearPopover()
  }

  showTooltip(element: HTMLElement, tooltip: TooltipData, toggle?: boolean, offsetY?: number) { return this.impl.showTooltip(element, tooltip, toggle, offsetY) }

  hideTooltip(force?: boolean) { return this.impl.hideTooltip(force) }

  updateSettings(updates: any) { return this.impl.updateSettings(updates) }

  showSettings(page: string, source: SettingsSource) { return this.impl.showSettings(page, source) }

}

export const appService = new AppService()
