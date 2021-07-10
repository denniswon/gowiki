"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooltipData = exports.TooltipTheme = exports.ToastPriority = exports.ToastSubtype = exports.TooltipType = exports.TooltipActionType = exports.TooltipAction = void 0;
class TooltipAction {
    label;
    sublabel;
    description;
    icon;
    iconUrl;
    iconColor;
    endIcon;
    command;
    args;
    enabled;
    highlight;
    compact;
    type;
    value;
}
exports.TooltipAction = TooltipAction;
var TooltipActionType;
(function (TooltipActionType) {
    TooltipActionType[TooltipActionType["TITLE"] = 0] = "TITLE";
    TooltipActionType[TooltipActionType["SEPARATOR"] = 1] = "SEPARATOR";
    TooltipActionType[TooltipActionType["SLIDER"] = 2] = "SLIDER";
})(TooltipActionType = exports.TooltipActionType || (exports.TooltipActionType = {}));
var TooltipType;
(function (TooltipType) {
    TooltipType["USER"] = "user";
    TooltipType["MENU"] = "menu";
})(TooltipType = exports.TooltipType || (exports.TooltipType = {}));
var ToastSubtype;
(function (ToastSubtype) {
    ToastSubtype["WARNING"] = "warning";
    ToastSubtype["INFO"] = "info";
    ToastSubtype["ONBOARDING"] = "onbo";
    ToastSubtype["ERROR"] = "error";
})(ToastSubtype = exports.ToastSubtype || (exports.ToastSubtype = {}));
var ToastPriority;
(function (ToastPriority) {
    ToastPriority[ToastPriority["HIGH"] = 3] = "HIGH";
    ToastPriority[ToastPriority["LOW"] = 1] = "LOW";
    ToastPriority[ToastPriority["ZERO"] = 0] = "ZERO";
})(ToastPriority = exports.ToastPriority || (exports.ToastPriority = {}));
var TooltipTheme;
(function (TooltipTheme) {
    TooltipTheme["LIGHT"] = "light";
    TooltipTheme["DARK"] = "dark";
})(TooltipTheme = exports.TooltipTheme || (exports.TooltipTheme = {}));
class TooltipData {
    type;
    pos;
    orientation;
    dims;
    subtype;
    target;
    user;
    actions;
    message;
    bounds;
    theme;
    title;
}
exports.TooltipData = TooltipData;
//# sourceMappingURL=tooltip.js.map