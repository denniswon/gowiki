import { GetState, SetState } from 'zustand';
import { Team, Themes, User } from '@gowiki/core';
export declare const REFRESH_CHECK_EVERY: number;
export declare const AUTO_REFRESH_TIME: number;
export declare const DND_START_FORMAT = "HH:mm";
export declare const VIDEOS_PER_PAGE_AUTO = -1;
export declare type CallServiceOptions = {
    ionHost?: string;
    sfuHost?: string;
};
export declare enum NameDisplayOption {
    DEFAULT = "",
    SHOW_FULL_NAME = "SHOW_FULL_NAME",
    SHOW_DISPLAY_NAME_ONLY = "SHOW_DISPLAY_NAME_ONLY"
}
export declare enum AutoExpandOption {
    NEVER = "never",
    MEETINGS = "meetings",
    ALWAYS = "always"
}
export declare class Settings {
    theme: Themes;
    nameDisplayOption?: NameDisplayOption;
    soundsDisabled?: boolean;
    notification?: boolean;
}
export declare class SettingsStore extends Settings {
    actions: SettingsActions;
}
declare class SettingsActions {
    set: SetState<SettingsStore>;
    get: GetState<SettingsStore>;
    constructor(set: SetState<SettingsStore>, get: GetState<SettingsStore>);
    initSettings: (user: User, team?: Team) => void;
    toggleSetting: (key: keyof Settings, toggle?: boolean) => boolean;
    updateSetting: <T>(key: keyof Settings, setting: T) => T;
    toggleSoundsDisabled: (toggle?: boolean) => boolean;
    toggleRoomNotification: (toggle?: boolean) => boolean;
    setNameDisplayOption: (option: NameDisplayOption) => NameDisplayOption;
    toggleDarkMode: () => void;
    computeDisplayNameSetting: () => NameDisplayOption.SHOW_FULL_NAME | NameDisplayOption.SHOW_DISPLAY_NAME_ONLY;
}
export declare const useSettingsStore: import("zustand").UseStore<SettingsStore>, settingsApi: import("zustand").StoreApi<SettingsStore>;
export declare const settingsActions: SettingsActions;
export declare const getNameDisplayOption: () => NameDisplayOption;
export declare const userDisplayName: (user: {
    nickname?: string;
    name?: string;
}) => string;
export {};
