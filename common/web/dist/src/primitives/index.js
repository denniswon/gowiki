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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Svg = void 0;
const styles_global_1 = require("@gowiki/styles-global");
const styled_components_1 = __importDefault(require("styled-components"));
__exportStar(require("./Circle"), exports);
__exportStar(require("./Triangle"), exports);
__exportStar(require("./InputPrimitive"), exports);
__exportStar(require("./PressablePrimitive"), exports);
exports.Svg = styled_components_1.default.svg `
  ${styles_global_1.s.boxProps}
`;
//# sourceMappingURL=index.js.map