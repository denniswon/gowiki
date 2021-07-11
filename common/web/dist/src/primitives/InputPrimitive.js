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
exports.Form = exports.segmentedControlBox = exports.textarea = exports.innerInput = exports.inputBox = exports.inputText = exports.baseInput = exports.globalInputStyles = exports.resetTextAttributes = exports.errorStyle = exports.inputBorderUnits = exports.inputBorderWidth = exports.focusOutline = void 0;
const polished_1 = require("polished");
const styles_1 = require("@gowiki/styles");
const styles_global_1 = require("@gowiki/styles-global");
const styled_components_1 = __importStar(require("styled-components"));
// -------------------
// Core Input variables
exports.focusOutline = `0 0 0 4px ${styles_1.c.inputFocus}`;
exports.inputBorderWidth = 2;
exports.inputBorderUnits = `inset 0 0 0 ${exports.inputBorderWidth}px`;
exports.errorStyle = styled_components_1.css `
  box-shadow: inset 0 0 0 2px ${styles_1.c.red} !important;
`;
exports.resetTextAttributes = styled_components_1.css `
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
`;
exports.globalInputStyles = styled_components_1.css `
  input,
  textarea,
  select {
    ${exports.resetTextAttributes} margin:0;
    padding: 0;
    background: transparent;
    border: 0;
    outline: 0;
    color: inherit;
    font-size: inherit;
  }

  input[data-com-onepassword-filled='light'],
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    transition: background-color 5000s ease-in-out 0s;
  }
`;
// -------------------
// Base Input
exports.baseInput = styled_components_1.css `
  ${styles_global_1.s.ass} box-sizing:border-box;
  background: transparent;
  border-radius: 6px;
  &:hover {
    z-index: 1;
  }
  &:focus {
    z-index: 2;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: color 9999s ease-out 9999s, background-color 9999s ease-out 9999s;
  }
`;
exports.inputText = styled_components_1.css `
  line-height:18px;
  color:${p => p.theme.ink};
  &::placeholder{ color:${p => p.theme.ink50}; }
  &:hover::placeholder{ color:${p => p.theme.ink60};  }
  &:focus::placeholder{ color:${p => p.theme.ink60}; }
`;
const inputBoxFocus = styled_components_1.css `
  background: ${p => p.theme.background};
  box-shadow: ${exports.inputBorderUnits} ${p => p.theme.highlight} !important;
`;
exports.inputBox = styled_components_1.css `
  ${exports.baseInput}
  background: ${p => p.theme.bgIdle};

  box-shadow:inset 0 0 0 1px ${p => polished_1.rgba(p.theme.ink, 0.07)};
  &:hover{
    background:${p => p.theme.background};
    box-shadow:${exports.inputBorderUnits} ${p => p.theme.highlight};
  }
  &:focus{ ${inputBoxFocus} }

  ${p => (p.isActive || p.isFocused) && inputBoxFocus}
`;
exports.innerInput = styled_components_1.css `
  ${exports.inputText} padding:15px;
`;
// -------------------
// Textareas
exports.textarea = styled_components_1.css `
  ${exports.inputBox}
  ${p => p.theme.ink}
  resize:none;
  padding:16px;
`;
// -------------------
// Segmented Controls
exports.segmentedControlBox = styled_components_1.css `
  ${exports.baseInput}
  background: ${p => p.theme.bgIdle};

  box-shadow: ${exports.inputBorderUnits} ${p => polished_1.rgba(p.theme.highlight, 0.7)};
  &:focus{ ${inputBoxFocus} }

  ${p => (p.isActive || p.isFocused) && inputBoxFocus}
`;
exports.Form = styled_components_1.default.form `
  ${styles_global_1.s.boxProps}
`;
//# sourceMappingURL=InputPrimitive.js.map