"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ring = exports.Circle = void 0;
const styles_global_1 = require("@gowiki/styles-global");
const styled_components_1 = __importDefault(require("styled-components"));
exports.Circle = styled_components_1.default.div `
  ${styles_global_1.s.boxProps} box-sizing:border-box;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  min-width: ${p => p.size}px;
  min-height: ${p => p.size}px;
  max-width: ${p => p.size}px;
  max-height: ${p => p.size}px;
  border-radius: ${p => p.size}px;
`;
exports.Circle.defaultProps = {
    size: 40,
    center: true
};
exports.Ring = styled_components_1.default(exports.Circle) `
  border: 2px solid ${p => p.color};
  padding: 1px;
`;
//# sourceMappingURL=Circle.js.map