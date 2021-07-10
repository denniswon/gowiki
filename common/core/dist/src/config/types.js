"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Themes = exports.SettingsSource = exports.CommandEventType = exports.Role = exports.OAuthProvider = exports.AuthIntent = exports.PubSubAction = void 0;
var PubSubAction;
(function (PubSubAction) {
    PubSubAction["WINDOW_UNLOAD"] = "unload";
    PubSubAction["WINDOW_FOCUS"] = "focus";
    PubSubAction["FIND_IN_PAGE"] = "find";
    PubSubAction["FIND_FOCUS"] = "find_focus";
    PubSubAction["CLEAR_SEARCH"] = "find_clear";
    PubSubAction["SWITCH_TEAM"] = "switch_team";
    PubSubAction["UPDATE_TEAM"] = "update_team";
    PubSubAction["UPDATE_USER"] = "update_user";
    PubSubAction["EXPAND_OR_COLLAPSE"] = "expand-or-collapse";
    PubSubAction["OPENED_URL"] = "opened-url";
})(PubSubAction = exports.PubSubAction || (exports.PubSubAction = {}));
var AuthIntent;
(function (AuthIntent) {
    AuthIntent[AuthIntent["LOG_IN_ONLY"] = 0] = "LOG_IN_ONLY";
    AuthIntent[AuthIntent["SIGN_UP_ONLY"] = 1] = "SIGN_UP_ONLY";
    AuthIntent[AuthIntent["LOG_IN_OR_SIGN_UP_WITH_INVITE"] = 2] = "LOG_IN_OR_SIGN_UP_WITH_INVITE";
})(AuthIntent = exports.AuthIntent || (exports.AuthIntent = {}));
var OAuthProvider;
(function (OAuthProvider) {
    OAuthProvider["GOOGLE"] = "google";
    OAuthProvider["APPLE"] = "apple";
})(OAuthProvider = exports.OAuthProvider || (exports.OAuthProvider = {}));
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["MEMBER"] = "member";
    Role["GUEST"] = "guest";
})(Role = exports.Role || (exports.Role = {}));
var CommandEventType;
(function (CommandEventType) {
    CommandEventType["TRIGGERED"] = "TRIGGERED";
    CommandEventType["ON_WINDOW_BLURRED"] = "ON_WINDOW_BLURRED";
    CommandEventType["ON_ESC_PRESSED"] = "ON_ESC_PRESSED";
    CommandEventType["HIDE"] = "HIDE";
    CommandEventType["SHOW"] = "SHOW";
    CommandEventType["COMMAND_CHOSEN"] = "COMMAND_CHOSEN";
    CommandEventType["ON_CLICK_LOGO"] = "ON_CLICK_LOGO";
    CommandEventType["FULL_HIDE"] = "FULL_HIDE";
    CommandEventType["TOGGLE_WINDOW_PINNING"] = "TOGGLE_WINDOW_PINNING";
})(CommandEventType = exports.CommandEventType || (exports.CommandEventType = {}));
var SettingsSource;
(function (SettingsSource) {
    SettingsSource["SETTINGS_MENU"] = "settingsMenu";
})(SettingsSource = exports.SettingsSource || (exports.SettingsSource = {}));
var Themes;
(function (Themes) {
    Themes["LIGHT"] = "light";
    Themes["DARK"] = "dark";
})(Themes = exports.Themes || (exports.Themes = {}));
//# sourceMappingURL=types.js.map