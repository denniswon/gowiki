"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s = exports.Row = exports.Column = exports.Box = exports.c = exports.GlobalStyles = exports.text = exports.fontWeights = exports.m = void 0;
const styled_components_1 = require("styled-components");
const colors_1 = __importStar(require("./colors"));
const main = __importStar(require("./main"));
const text = __importStar(require("./text"));
exports.text = text;
exports.m = {
    ...text,
    ...main,
    themes: colors_1.themes,
};
var text_1 = require("./text");
Object.defineProperty(exports, "fontWeights", { enumerable: true, get: function () { return text_1.fontWeights; } });
// Global
exports.GlobalStyles = styled_components_1.createGlobalStyle `
  ${text.globalTextStyles}

  .app-dragging { -webkit-app-region:drag; user-select:none; }
  .app-dragging > * { -webkit-app-region: no-drag; cursor:inherit; }
  input, button, select, textarea { -webkit-app-region: no-drag; }
`;
exports.c = {
    ...colors_1.default,
    ...colors_1.themedColorVariables,
};
var styles_global_1 = require("@gowiki/styles-global");
Object.defineProperty(exports, "Box", { enumerable: true, get: function () { return styles_global_1.Box; } });
Object.defineProperty(exports, "Column", { enumerable: true, get: function () { return styles_global_1.Column; } });
Object.defineProperty(exports, "Row", { enumerable: true, get: function () { return styles_global_1.Row; } });
Object.defineProperty(exports, "s", { enumerable: true, get: function () { return styles_global_1.s; } });
//# sourceMappingURL=index.js.map