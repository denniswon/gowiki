"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themes = exports.getPropColor = exports.COLOR_SCALE_BASE = exports.COLOR_SCALE = exports.getUniqueColorObjectForId = void 0;
__exportStar(require("./utils/colorize"), exports);
var core_1 = require("@gowiki/core");
Object.defineProperty(exports, "getUniqueColorObjectForId", { enumerable: true, get: function () { return core_1.getUniqueColorObjectForId; } });
Object.defineProperty(exports, "COLOR_SCALE", { enumerable: true, get: function () { return core_1.COLOR_SCALE; } });
Object.defineProperty(exports, "COLOR_SCALE_BASE", { enumerable: true, get: function () { return core_1.COLOR_SCALE_BASE; } });
__exportStar(require("./styles"), exports);
var theme_1 = require("./styles/theme");
Object.defineProperty(exports, "getPropColor", { enumerable: true, get: function () { return theme_1.getPropColor; } });
var colors_1 = require("./styles/colors");
Object.defineProperty(exports, "themes", { enumerable: true, get: function () { return colors_1.themes; } });
//# sourceMappingURL=index.js.map