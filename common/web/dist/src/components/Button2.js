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
exports.Button2 = void 0;
const react_1 = __importStar(require("react"));
const styles_1 = require("@gowiki/styles");
const styled_components_1 = __importStar(require("styled-components"));
const Icon_1 = require("./Icon");
const ButtonContent = (props) => {
    const { icon, rightIcon, iconSize, iconOp = 0.6, children } = props;
    return react_1.default.createElement(react_1.default.Fragment, null,
        icon && react_1.default.createElement(Icon_1.Icon, { name: icon, mr: 8, size: iconSize, op: iconOp }),
        children,
        rightIcon && react_1.default.createElement(Icon_1.Icon, { name: rightIcon, ml: 8, size: iconSize, op: iconOp }));
};
function BaseButton(props) {
    const { icon, rightIcon, iconSize, iconOp, children, big, small, ...rest } = props;
    const dimensionVariant = big ? 'big' : small ? 'small' : 'default';
    return (react_1.default.createElement(ButtonBox, { dimension: dimensionVariant, ...rest },
        react_1.default.createElement(ButtonContent, { icon: icon, rightIcon: rightIcon, iconSize: iconSize, iconOp: iconOp }, typeof children == 'string'
            ? react_1.default.createElement(ButtonText, { dimension: dimensionVariant }, children)
            : children)));
}
const Button2 = (p) => {
    const theme = useTheme();
    return react_1.default.createElement(BaseButton, { bg: theme.highlight, hoverBg: theme.highlightHover, activeBg: theme.highlightPressing, color: theme.highlightText, ...p });
};
exports.Button2 = Button2;
const Secondary = (p) => {
    const theme = useTheme();
    return react_1.default.createElement(BaseButton, { bg: theme.ink10, hoverBg: theme.ink15, activeBg: theme.ink20, color: theme.ink90, hoverColor: theme.ink, borderColor: theme.ink05, hoverBorderColor: theme.ink10, ...p });
};
const coloredButtons = {
    blue: { bg: styles_1.c.brand, hoverBg: styles_1.c.brand, color: styles_1.c.white },
    green: { bg: styles_1.c.green, hoverBg: styles_1.c.green, color: styles_1.c.white },
    red: { bg: styles_1.c.red, hoverBg: styles_1.c.red, color: styles_1.c.white },
};
const GreenButton = (p) => react_1.default.createElement(BaseButton, { ...coloredButtons.green, ...p });
const RedButton = (p) => react_1.default.createElement(BaseButton, { ...coloredButtons.red, ...p });
const BlueButton = (p) => react_1.default.createElement(BaseButton, { ...coloredButtons.blue, ...p });
exports.Button2.Secondary = Secondary;
exports.Button2.Green = GreenButton;
exports.Button2.Red = RedButton;
const buttonRounding = 6;
const outline = styled_components_1.css `
  focus::after {
    content: '';
    display: block;
    top:-2px; right:-2px; bottom:-2px; left: -2px;
    position: absolute;
    border-radius:${buttonRounding + 2}px;
    box-shadow: 0 0 0 2px rgba(0, 147, 255, 0.6);
  }
`;
const clickableButton = styled_components_1.css `
  cursor:pointer;
  ${outline}
`;
const disabledButton = styled_components_1.css `
  cursor:not-allowed;
  pointer-events: none;
  box-shadow:none !important;
  border:0 !important;
  background-color:${p => p.theme.ink10} !important;
  color:${p => p.theme.ink50};
`;
const baseBoxShadow = `0px 1px 3px rgb(0 0 0 / 4%)`;
const baseButton = styled_components_1.css `
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-text: center;

  user-select: none;
  -webkit-app-region: no-drag;
  border:0;
  outline:0;
  border-radius: ${buttonRounding}px;
`;
const ButtonBox = styled_components_1.default.button `
  ${baseButton}
  position: relative;

  ${p => getDimensionVariants(p.dimension)}

  color:${p => p.color || p.theme.ink};
  background:${p => p.bg};

  &:hover{
    ${p => p.hoverColor && `color: ${p.hoverColor};`}
    ${p => p.hoverBg && `background: ${p.hoverBg};`}
  }
  &:active{
    ${p => p.activeColor && `color: ${p.activeColor};`}
    ${p => p.activeBg && `background: ${p.activeBg};`}
  }

  ${p => p.borderColor && `
    box-shadow: ${baseBoxShadow}, inset 0 0 0 1px ${p.borderColor};

    &:hover {
      ${p.hoverBorderColor && `box-shadow: ${baseBoxShadow}, inset 0 0 0 1px ${p.hoverBorderColor};`}
    }
  `}

  ${p => p.disabled ? disabledButton : clickableButton}

  ${styles_1.s.boxProps}
`;
const ButtonText = styled_components_1.default(styles_1.m.Text) `
  ${p => p.dimension == 'small' && styles_1.m.t14}
  ${p => p.dimension == 'small' && styles_1.m.tMedium}
  ${p => p.dimension == 'default' && styles_1.m.t15}
  ${p => p.dimension == 'default' && styles_1.m.tSemi}
`;
const getDimensionVariants = (size) => {
    switch (size) {
        case 'small': return styled_components_1.css `padding:6px 12px; ${styles_1.m.t14} ${styles_1.m.tMedium}`;
        case 'big': return styled_components_1.css `padding:16px 24px; ${styles_1.m.t16} ${styles_1.m.tSemi}`;
        default:
        case 'default': return styled_components_1.css `padding:12px 20px; ${styles_1.m.t15} ${styles_1.m.tSemi} `;
    }
};
// Can't import it from assets/utils
const useTheme = () => {
    const themeContext = react_1.useContext(styled_components_1.ThemeContext);
    return themeContext;
};
//# sourceMappingURL=Button2.js.map