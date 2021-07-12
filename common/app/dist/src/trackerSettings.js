"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackerSettings = void 0;
const api_1 = require("@gowiki/api");
/**
 * Settings tracking
 */
class TrackerSettings {
    /**
     * Setting was changed
     * @param {string} value1 setting name
     * @param {string} value2 new value
     */
    appToggleSetting(key, setting) {
        const value = typeof setting === 'boolean' ? (setting ? 'true' : 'false') : setting;
        api_1.tracker.event(api_1.EventType.ACTION, 'appToggleSetting', key, value);
    }
    /**
     * Hotkey was set
     * @param {string} value1 hotkey value
     * @param {string} value2 setting name
     */
    appUpdateHotkey(key, setting) {
        api_1.tracker.event(api_1.EventType.ACTION, 'appUpdateHotkey', key, setting);
    }
}
exports.trackerSettings = new TrackerSettings();
//# sourceMappingURL=trackerSettings.js.map