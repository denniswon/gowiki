"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDisplayName = exports.getNameDisplayOption = exports.settingsActions = exports.settingsApi = exports.useSettingsStore = exports.SettingsStore = exports.Settings = exports.AutoExpandOption = exports.NameDisplayOption = exports.VIDEOS_PER_PAGE_AUTO = exports.DND_START_FORMAT = exports.AUTO_REFRESH_TIME = exports.REFRESH_CHECK_EVERY = void 0;
const zustand_1 = __importDefault(require("zustand"));
const api_1 = require("@gowiki/api");
const core_1 = require("@gowiki/core");
const sounds_1 = __importDefault(require("@gowiki/sounds"));
const appService_1 = require("./appService");
const trackerSettings_1 = require("./trackerSettings");
// check for a new server version interval
exports.REFRESH_CHECK_EVERY = 15 * 60 * 1000;
// if client has been open for this much time, refresh
exports.AUTO_REFRESH_TIME = 24 * 3600 * 1000;
// moment.js formatting/parsing for DND start/end
exports.DND_START_FORMAT = 'HH:mm';
exports.VIDEOS_PER_PAGE_AUTO = -1;
var NameDisplayOption;
(function (NameDisplayOption) {
    NameDisplayOption["DEFAULT"] = "";
    NameDisplayOption["SHOW_FULL_NAME"] = "SHOW_FULL_NAME";
    NameDisplayOption["SHOW_DISPLAY_NAME_ONLY"] = "SHOW_DISPLAY_NAME_ONLY";
})(NameDisplayOption = exports.NameDisplayOption || (exports.NameDisplayOption = {}));
var AutoExpandOption;
(function (AutoExpandOption) {
    AutoExpandOption["NEVER"] = "never";
    AutoExpandOption["MEETINGS"] = "meetings";
    AutoExpandOption["ALWAYS"] = "always";
})(AutoExpandOption = exports.AutoExpandOption || (exports.AutoExpandOption = {}));
class Settings {
    theme;
    nameDisplayOption;
    soundsDisabled;
    notification;
}
exports.Settings = Settings;
class SettingsStore extends Settings {
    actions;
}
exports.SettingsStore = SettingsStore;
const SETTING_TO_USER_FLAG = {
    nameDisplayOption: { meta: 'ndisp', default: NameDisplayOption.DEFAULT },
    theme: { meta: 'th', default: core_1.Themes.LIGHT },
    soundsDisabled: { meta: 'sdis', default: false },
    notification: { meta: 'rn', default: true },
};
class SettingsActions {
    set;
    get;
    constructor(set, get) {
        this.set = set;
        this.get = get;
    }
    // --- initialization
    initSettings = (user, team) => {
        const initialSettings = {};
        const meta = core_1.User.meta(user);
        const teamMeta = core_1.Team.meta(team);
        // tslint:disable-next-line: forin
        for (let key in SETTING_TO_USER_FLAG) {
            const value = SETTING_TO_USER_FLAG[key];
            const def = teamMeta[key] === undefined ? value.default : teamMeta[value.meta];
            initialSettings[key] = meta[value.meta] === undefined ? def : meta[value.meta];
        }
        this.set(_ => initialSettings);
        if (initialSettings.soundsDisabled)
            sounds_1.default.setSoundsDisabled(true);
    };
    // --- settings
    toggleSetting = (key, toggle) => {
        return this.updateSetting(key, toggle === undefined ? !this.get()[key] : toggle);
    };
    updateSetting = (key, setting) => {
        const metaProp = SETTING_TO_USER_FLAG[key];
        if (!metaProp)
            throw 'Unknown setting: ' + key;
        core_1.logger.info(`UI —— updateSetting`, key, metaProp, setting);
        this.set(_ => ({ [key]: setting }));
        trackerSettings_1.trackerSettings.appToggleSetting(key, setting);
        api_1.authActions.updateUser({ meta: { [metaProp.meta]: setting } });
        appService_1.appService.updateSettings({ updates: { [key]: setting } });
        return setting;
    };
    // Notif
    toggleSoundsDisabled = (toggle) => this.toggleSetting('soundsDisabled', toggle);
    toggleRoomNotification = (toggle) => this.toggleSetting('notification', toggle);
    setNameDisplayOption = (option) => this.updateSetting('nameDisplayOption', option);
    toggleDarkMode = () => {
        const newTheme = this.get().theme == core_1.Themes.DARK ? core_1.Themes.LIGHT : core_1.Themes.DARK;
        this.updateSetting('theme', newTheme);
    };
    computeDisplayNameSetting = () => {
        const setting = this.get().nameDisplayOption;
        if (setting == NameDisplayOption.DEFAULT) {
            const teamSize = Object.keys(api_1.authApi.getState().members).length;
            const newSetting = (teamSize > 50) ? NameDisplayOption.SHOW_FULL_NAME : NameDisplayOption.SHOW_DISPLAY_NAME_ONLY;
            this.set(_ => ({ nameDisplayOption: newSetting }));
            return newSetting;
        }
        return setting;
    };
}
_a = zustand_1.default((set, get) => ({
    theme: core_1.Themes.LIGHT,
    actions: new SettingsActions(set, get)
})), exports.useSettingsStore = _a[0], exports.settingsApi = _a[1];
exports.settingsActions = exports.settingsApi.getState().actions;
// NOTE: not using settingsStore don't respond to store changes.
// But settings change less frequently than ex. AuthStore, so used in react components.
const getNameDisplayOption = () => {
    return exports.settingsApi.getState().nameDisplayOption;
};
exports.getNameDisplayOption = getNameDisplayOption;
const userDisplayName = (user) => {
    if (!user)
        return 'User';
    const name = core_1.emailToName(user.name || 'User');
    const nickname = user.nickname;
    const setting = exports.settingsActions.computeDisplayNameSetting();
    return setting === NameDisplayOption.SHOW_FULL_NAME
        ? name
        : nickname || name;
};
exports.userDisplayName = userDisplayName;
//# sourceMappingURL=settingsStore.js.map