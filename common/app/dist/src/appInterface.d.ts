import { SettingsSource, TooltipData, WindowFlags } from '@gowiki/core';
import { Sound } from '@gowiki/sounds';
export interface AppInterface {
    playSound(sound: Sound): void;
    showNotification(title: string, body: string, onClick?: () => void, sound?: Sound, options?: NotificationOptions): void;
    openUrl(url: string, source?: string): void;
    setBadge(count: number, bounce?: boolean): void;
    isOnboarding(): boolean;
    onboardingAction(action: 'pause' | 'resume' | 'joined-room'): void;
    setWindowFlags(flags: WindowFlags): void;
    showPopover(message: string, dismissAfter?: number, onClick?: (okButton: boolean) => void, buttons?: string[]): void;
    clearPopover(): void;
    showTooltip(element: HTMLElement, tooltip: TooltipData, toggle?: boolean, offsetY?: number): void;
    hideTooltip(force?: boolean): void;
    updateSettings(updates: any): void;
    showSettings(page: string, source: SettingsSource): void;
}
