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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefSwitch = exports.Switch = void 0;
// TODO improve component props -> Look at https://github.com/react-component/switch/blob/master/src/Switch.jsx
const polished_1 = require("polished");
const React = __importStar(require("react"));
const styles_1 = require("@gowiki/styles");
const styled_components_1 = __importDefault(require("styled-components"));
const primitives_1 = require("../primitives");
const Switch = (props) => {
    const { on, size = 20, semiActive, ...rest } = props;
    return (React.createElement(Wrapper, { vCenter: true, as: "button", active: on, aic: true, w: size * 2, minw: size * 2, h: size + 2, ...rest },
        React.createElement(StyledCircle, { className: 'circle', size: size - 4, bg: "green", active: on, semiActive: semiActive })));
};
exports.Switch = Switch;
exports.RefSwitch = React.forwardRef((props, ref) => React.createElement(exports.Switch, { innerRef: ref, ...props }));
const Wrapper = styled_components_1.default(styles_1.Row) `
  border-radius: 100px;
  transition: 200ms;
  cursor: pointer;
  background: ${p => p.theme.ink15 || styles_1.c.black15};
  &:hover {
    background: ${p => p.theme.ink20 || styles_1.c.black20};
  }
  ${p => p.active && `
    background:${p.activeColor || styles_1.c.brand};
    &:hover{ background:${polished_1.transparentize(0.2, styles_1.c.brand)}; }
  `}
  &:focus {
    box-shadow: 0 0 0 4px ${p => polished_1.transparentize(0.8, styles_1.c.brand)};
  }
  ${p => !p.active && `
    &:focus{ background:${p.theme.ink15 || styles_1.c.black15}; }
    &:hover{
      .circle{ background: ${p.theme.ink || styles_1.c.black} !important; }
    }
  `}
`;
const StyledCircle = styled_components_1.default(primitives_1.Circle) `
  transition: 200ms;
  background: ${p => p.theme.ink70 || styles_1.c.black70};
  transform: translateX(3px); transition:100ms;
  ${p => p.semiActive && `
      transform: translateX(8px); transition:100ms;
      background:${styles_1.c.white};
    `}
  ${p => p.active && !p.semiActive && `
      transform: translateX(${p.size + 5}px); transition:200ms;
      background:${styles_1.c.white};
    `}
`;
//# sourceMappingURL=Switch.js.map