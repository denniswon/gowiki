"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blacken = exports.whiten = exports.alpha = void 0;
const polished_1 = require("polished");
/** Apply alpha level 0.1 = almost transparent */
const alpha = (alphaAmount, color) => polished_1.transparentize(1 - alphaAmount, color);
exports.alpha = alpha;
/** Add white to color. 0.9 = almost white  */
const whiten = (amount, color) => polished_1.tint(amount, color);
exports.whiten = whiten;
/** Add black to color. 0.9 = almost black  */
const blacken = (amount, color) => polished_1.shade(amount, color);
exports.blacken = blacken;
//# sourceMappingURL=colorize.js.map