"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaValues = exports.defaultBreakpointsObject = exports.createMediaQuery = exports.isNegative = exports.parseUnit = exports.isNum = exports.is = void 0;
const styledSystems_1 = require("./styledSystems");
const { isArray } = Array;
const DEFAULT_MEDIA_KEY = 'base';
const is = (n) => n !== undefined && n !== null;
exports.is = is;
const isNum = (n) => typeof n === 'number' && !isNaN(n);
exports.isNum = isNum;
const parseUnit = (n) => exports.isNum(n) ? n + 'px' : n;
exports.parseUnit = parseUnit;
const isNegative = (n) => n < 0;
exports.isNegative = isNegative;
const createMediaQuery = (n) => `@media screen and (max-width: ${exports.parseUnit(n)})`;
exports.createMediaQuery = createMediaQuery;
exports.defaultBreakpointsObject = {
    sm: styledSystems_1.defaultBreakpoints[0],
    md: styledSystems_1.defaultBreakpoints[1],
    lg: styledSystems_1.defaultBreakpoints[2],
};
var MediaValues;
(function (MediaValues) {
    MediaValues["base"] = "base";
    MediaValues["sm"] = "sm";
    MediaValues["md"] = "md";
    MediaValues["lg"] = "lg";
    MediaValues["xlg"] = "xlg";
})(MediaValues = exports.MediaValues || (exports.MediaValues = {}));
//# sourceMappingURL=utils.js.map