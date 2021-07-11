import { SettingsSource, TooltipData, WindowFlags } from '@gowiki/core';
import { AppInterface } from './appInterface';
import { Sound } from '@gowiki/sounds';
export declare class AppService implements AppInterface {
    impl: AppInterface;
    setAppInterface(impl: AppInterface): void;
    playSound: (sound: Sound) => void;
    showNotification(title: string, body?: string, onClick?: () => void, sound?: Sound, options?: NotificationOptions): void;
    openUrl: (...args: any[]) => any;
    setBadge: (...args: any[]) => any;
    isOnboarding: (...args: any[]) => any;
    onboardingAction(action: 'pause' | 'resume' | 'joined-room'): any;
    setWindowFlags: (flags: WindowFlags) => void;
    showPopover(message: string, dismissAfter?: number, onClick?: (okButton: boolean) => void, buttons?: string[]): void;
    clearPopover(): void;
    showTooltip(element: HTMLElement, tooltip: TooltipData, toggle?: boolean, offsetY?: number): void;
    hideTooltip(force?: boolean): void;
    updateSettings(updates: any): void;
    showSettings(page: string, source: SettingsSource): void;
}
export declare const appService: AppService;
