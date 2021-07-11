/**
 * Settings tracking
 */
declare class TrackerSettings {
    /**
     * Setting was changed
     * @param {string} value1 setting name
     * @param {string} value2 new value
     */
    appToggleSetting(key: string, setting: boolean | string): void;
    /**
     * Hotkey was set
     * @param {string} value1 hotkey value
     * @param {string} value2 setting name
     */
    appUpdateHotkey(key: string, setting: string): void;
}
export declare const trackerSettings: TrackerSettings;
export {};
