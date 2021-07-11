import {
  SettingsSource, Team, TooltipData, WindowFlags
} from '@gowiki/core'
import { Sound } from '@gowiki/sounds'

import { AppInterface } from './appInterface'

// stub service - extends for testing
export class StubAppService implements AppInterface {

  constructor(overrides: Partial<AppInterface>) {
    Object.assign(this, overrides)
  }

  // --- os interface

  playSound(sound: Sound) {}

  showNotification(title: string, body: string, onClick?: () => void, sound?: Sound, options?: NotificationOptions) {}

  openUrl(url: string, source?: string) {}

  setBadge(count: number, bounce?: boolean) {}

  // --- app logic

  isOnboarding() { return false }

  onboardingAction(action: 'pause' | 'resume' | 'joined-room') {}

  setWindowFlags(flags: WindowFlags) {}

  // --- cross-window communication

  showPopover(message: string, dismissAfter?: number, onClick?: (okButton: boolean) => void, buttons?: string[]) {}

  clearPopover() { }

  showTooltip(element: HTMLElement, tooltip: TooltipData, toggle?: boolean, offsetY?: number) {}

  hideTooltip(force?: boolean) {}

  updateSettings(updates: any) {}

  showSettings(page: string, source: SettingsSource) {}

}
