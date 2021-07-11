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
exports.SecondaryRedButton = exports.SecondaryButton = exports.RedButton = exports.GreyButton = exports.GreenButton = exports.BlueButton = exports.TertiaryButton = exports.PrimaryButton = exports.Button = exports.ButtonInput = exports.button = exports.buttonWithColoredBackground = exports.buttonWithOutline = exports.buttonWithBackgroundShadow = exports.buttonWithShadow = exports.buttonWithTranslation = exports.baseButton = exports.buttonWithFocus = exports.buttonRounding = exports.buttonText = exports.buttonPadding = void 0;
const polished_1 = require("polished");
const React = __importStar(require("react"));
const styles_1 = require("@gowiki/styles");
const styled_components_1 = __importStar(require("styled-components"));
const Icon_1 = require("./Icon");
// Butons --------
// TODO @bernatfortet improve button Padding so if there's no pv or ph it will take in a p
exports.buttonPadding = styled_components_1.css `
  padding: ${p => p.pv || 10}px ${p => p.ph || 14}px;
`;
exports.buttonText = styled_components_1.css `
  ${styles_1.m.t15} ${styles_1.m.tSemi}
`;
exports.buttonRounding = 6;
exports.buttonWithFocus = styled_components_1.css `
  &:focus {
    box-shadow: 0 0 0 4px rgba(0, 147, 255, 0.4);
  }
`;
exports.baseButton = styled_components_1.css ` ${styles_1.s.flxRow} ${styles_1.s.aic} ${styles_1.s.jcc} ${styles_1.s.tac} ${exports.buttonPadding} ${styles_1.s.anchor} ${styles_1.s.unselectable}
  border:0; border-radius:${exports.buttonRounding}px; outline:0;
  transition:all 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  &:hover{ transition:all 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94) }
`;
exports.buttonWithTranslation = styled_components_1.css `
  transform: translateY(0px);
  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0px);
    transition: transform 0ms linear;
  }
`;
exports.buttonWithShadow = styled_components_1.css ` transition: all 400ms ease;
  ${p => p.defaultShadow && `box-shadow: 0 1px 5px 0 ${styles_1.c.black10}, 0 3px 16px 0 ${styles_1.c.black10}; transition: all 150ms ease;`}
  box-shadow: 0 1px 5px 0 ${styles_1.c.black10}, 0 3px 16px 0 ${styles_1.c.black10}; transition: all 150ms ease;
  &:hover{ box-shadow: 0 1px 5px 0 ${styles_1.c.black10}, 0 3px 16px 0 ${styles_1.c.black10}; transition: all 150ms ease; }
  &:active{ box-shadow: 0 1px 1px 0 ${styles_1.c.black10}; transition:box-shadow 0ms linear; }
`;
exports.buttonWithBackgroundShadow = styled_components_1.css `
  ${p => p.defaultShadow && `box-shadow: 0 3px 6px 0 ${styles_1.c.black10}, 0 3px 16px 0 ${styles_1.c.black05}; transition: all 150ms ease;`}

  &:hover {
    box-shadow: 0 3px 7px 0px ${p => p.shadowColor || polished_1.transparentize(0.75, p.hoverBg || p.bg || styles_1.c.black10)},
      0 5px 24px 1px ${p => p.shadowColor || polished_1.transparentize(0.75, p.hoverBg || p.bg || styles_1.c.black10)};
  }
  &:active {
    box-shadow: 0 1px 1px 1px ${p => p.shadowColor || polished_1.transparentize(0.5, p.hoverBg || p.bg || styles_1.c.black10)};
  }
`;
exports.buttonWithOutline = styled_components_1.css `
  border: 2px solid ${p => p.borderColor || polished_1.transparentize(0.5, styles_1.c.black30)};
  &:hover {
    border-color: ${p => (p.borderHoverColor || p.borderColor ? styles_1.blacken(0.3, p.borderColor) : styles_1.c.black60)};
  }
`;
exports.buttonWithColoredBackground = styled_components_1.css `
  color: ${p => p.color || styles_1.c.white};
  &:hover {
    background: ${p => p.hoverBg || (p.bg ? polished_1.lighten(0.05, p.bg) : styles_1.c.white90)};
  }
  &:active {
    background: ${p => p.hoverBg || (p.bg ? polished_1.lighten(0.1, p.bg) : styles_1.c.white40)};
  }
`;
exports.button = styled_components_1.css `
  ${exports.baseButton} ${exports.buttonWithFocus} ${exports.buttonWithTranslation} ${exports.buttonWithBackgroundShadow} ${exports.buttonWithColoredBackground}
  ${p => p.borderColor && exports.buttonWithOutline}
`;
exports.ButtonInput = styled_components_1.default.input `
  ${exports.button} ${styles_1.s.spacingProps}
`;
const Button = (props) => {
    const { iconName, useRightIcon, children, iconOp, iconSize = 20, fw = false, ...rest } = props;
    return (React.createElement(StyledButton, { fw: fw, ...rest },
        iconName && !useRightIcon && React.createElement(Icon_1.Icon, { name: iconName, mr: 8, size: iconSize, op: iconOp || 0.6 }),
        children,
        iconName && useRightIcon && React.createElement(Icon_1.Icon, { name: iconName, ml: 8, size: iconSize, op: iconOp || 0.6 })));
};
exports.Button = Button;
const PrimaryButton = (p) => React.createElement(exports.Button, { bg: styles_1.c.brand, color: styles_1.c.white, ...p });
exports.PrimaryButton = PrimaryButton;
const TertiaryButton = (p) => React.createElement(exports.Button, { bg: styles_1.c.getOpaqueOnWhite(styles_1.c.black, 10), color: styles_1.c.ink, ...p });
exports.TertiaryButton = TertiaryButton;
const BlueButton = (p) => React.createElement(exports.Button, { bg: styles_1.c.brand, color: styles_1.c.white, ...p });
exports.BlueButton = BlueButton;
const GreenButton = (p) => React.createElement(exports.Button, { bg: styles_1.c.getGreen(20), color: styles_1.c.green, ...p });
exports.GreenButton = GreenButton;
const GreyButton = (p) => React.createElement(exports.Button, { bg: styles_1.c.black10, color: styles_1.c.black, hoverBg: styles_1.c.black20, ...p });
exports.GreyButton = GreyButton;
const RedButton = (p) => React.createElement(exports.Button, { bg: styles_1.c.red, color: styles_1.c.white, ...p });
exports.RedButton = RedButton;
const SecondaryButton = (p) => (React.createElement(exports.Button, { borderColor: styles_1.c.black20, borderHoverColor: styles_1.c.transparent, bg: styles_1.c.white, color: styles_1.c.black, shadowColor: styles_1.c.black10, ...p }));
exports.SecondaryButton = SecondaryButton;
const SecondaryRedButton = (p) => (React.createElement(exports.Button, { bg: styles_1.c.getColor(styles_1.c.red, 15), color: styles_1.c.red, hoverColor: polished_1.darken(0.2, styles_1.c.red), ...p }));
exports.SecondaryRedButton = SecondaryRedButton;
exports.Button.defaultProps = {
    bg: styles_1.c.black,
    color: styles_1.c.white
};
// TODO: Currently, the bg color for the disabled state is not in sync with our color scale
// Context: https://github.com/cryptagon/teamtalk/pull/1825#discussion_r499022507
const StyledButton = styled_components_1.default.button `
  ${styles_1.s.boxProps}
  color:${p => p.color || styles_1.c.black90}; ${exports.buttonText}
  &:hover{ color:${p => p.hoverColor || p.color}; }
  -webkit-app-region: no-drag;

  ${p => p.fw && `width:100%;`}
  ${p => !p.disabled && exports.button}
  ${p => p.withTextShadow && `text-shadow:0 0 2px rgba(0,0,0,0.2);`}
  ${p => (p.disabledLook || p.disabled) &&
    styled_components_1.css `
      ${disabledButton} cursor:default;
      transform: none !important;
    `}
  ${p => p.disabled && disabledButton}
`;
const disabledButton = styled_components_1.css ` ${exports.baseButton}
  background-color:${p => p.bg || p.theme.ink80}  !important;
  cursor:not-allowed; box-shadow:none !important; border:0 !important;
  text-shadow:none;
  &:hover{ background-color:${p => p.bgHover || p.bg || p.theme.disabledBackground} !important; }
`;
//# sourceMappingURL=Button.js.map