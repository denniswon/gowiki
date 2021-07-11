import {
  SettingsSource, Team, TooltipData, WindowFlags
} from '@gowiki/core'
import { Sound } from '@gowiki/sounds'

// interface between app & stores
export interface AppInterface {

  // --- os interface

  playSound(sound: Sound): void

  showNotification(title: string, body: string, onClick?: () => void, sound?: Sound, options?: NotificationOptions): void

  openUrl(url: string, source?: string): void

  setBadge(count: number, bounce?: boolean): void

  // --- app logic

  isOnboarding(): boolean

  onboardingAction(action: 'pause' | 'resume' | 'joined-room'): void

  setWindowFlags(flags: WindowFlags): void

  // --- cross-window communication

  showPopover(message: string, dismissAfter?: number, onClick?: (okButton: boolean) => void, buttons?: string[]): void

  clearPopover(): void

  showTooltip(element: HTMLElement, tooltip: TooltipData, toggle?: boolean, offsetY?: number): void

  hideTooltip(force?: boolean): void

  updateSettings(updates: any): void

  showSettings(page: string, source: SettingsSource): void

}
