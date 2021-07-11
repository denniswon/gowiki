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
exports.Loader = void 0;
const React = __importStar(require("react"));
const styles_1 = require("@gowiki/styles");
const styled_components_1 = __importStar(require("styled-components"));
const fastSpeed = 0.6;
const slowSpeed = 0.8;
const Loader = (props) => {
    const speed = props.speed ? props.speed : props.fast ? fastSpeed : slowSpeed;
    return React.createElement(Spinner, { ...props, speed: speed });
};
exports.Loader = Loader;
exports.Loader.defaultProps = {
    size: 40,
    color: 'white'
};
const THICKNESS_FACTOR = 0.1;
const circle = styled_components_1.css `
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  margin-top: -${p => p.size / 2}px;
  margin-left: -${p => p.size / 2}px;
  border-radius: 50%;
  border: ${p => (p.thickness ? p.thickness : p.size * THICKNESS_FACTOR)}px solid #ccc;
`;
const rotate = styled_components_1.keyframes ` to{ transform: rotate(360deg) } `;
const Spinner = styled_components_1.default(styles_1.Box) `
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  position: ${p => (p.pabs ? 'absolute' : 'relative')};
  background:none;

  &:before {
    ${circle}
    border-color: ${p => p.bg};
    opacity:0.2;
  }
  &:after {
    ${circle}
    border-color: transparent;
    border-top-color: ${p => p.color};
    animation: ${rotate} ${p => p.speed}s linear infinite;
  }
`;
//# sourceMappingURL=Loader.js.map