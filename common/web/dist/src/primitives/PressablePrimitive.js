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
exports.Pressable = exports.PressableBlue = exports.PressableOnWhite = exports.PressableOnBlack = exports.RootPressable = void 0;
const polished_1 = require("polished");
const core_1 = require("@gowiki/core");
const styles_1 = require("@gowiki/styles");
const styles_global_1 = require("@gowiki/styles-global");
const styled_components_1 = __importStar(require("styled-components"));
const activeStyles = styled_components_1.css `
  color: ${p => styles_1.getPropColor('activeColor', p) || styles_1.getPropColor('hoverColor', p)};
  background: ${p => styles_1.getPropColor('activeBg', p) || styles_1.getPropColor('hoverBg', p)};
  opacity: ${p => p.activeOp || p.hoverOp};
  & .icon, svg {
    fill:${p => styles_1.getPropColor('activeColor', p) || styles_1.getPropColor('hoverColor', p)};
    opacity:1 !important;
  }
`;
exports.RootPressable = styled_components_1.default(styles_global_1.Box).attrs(p => ({
    color: p.color,
    bg: p.bg || 'transparent',
    hoverBg: p.hoverBg || styles_1.c.bgHover || styles_1.c.black10,
    activeBg: p.activeBg || styles_1.c.bgPressing || styles_1.c.black15,
    hoverColor: p.hoverColor || styles_1.c.ink || styles_1.c.black,
    activeColor: p.activeColor || styles_1.c.ink || styles_1.c.black,
    br: 6,
    p: 4,
    iconOp: 0.6,
    ...p,
    onClick: p.disabled ? undefined : p.onClick,
})) `
  ${p => !p.selectable && styles_global_1.s.unselectable}
  ${styles_global_1.s.anchor}
  ${!core_1.isMac && '-webkit-app-region: no-drag;'}
  color: ${p => styles_1.getPropColor('color', p)};

  & svg {
    ${p => p.color && `fill: ${styles_1.getPropColor('color', p)};`}
  }

  cursor: pointer; 

  & .icon {
    opacity: ${p => p.iconOp};
  }

  ${p => p.disabled ? `
    cursor: default;
  ` : `
    &:hover svg {
      ${p.color ? `fill: ${styles_1.getPropColor('hoverColor', p)};` : ''}
    }
    &:hover {
      & svg,
      & .icon {
        opacity: 1;
      }
    }
    &:hover {
      color: ${styles_1.getPropColor('hoverColor', p)};
      opacity: ${p.hoverOp};
      background: ${styles_1.getPropColor('hoverBg', p)};
    }

    &:active svg {
      fill: ${styles_1.getPropColor('activeColor', p) || styles_1.getPropColor('hoverColor', p)};
    }
    &:active {
      & svg,
      & .icon {
        opacity: 1;
      }
    }
    &:active { ${activeStyles} }
  `}

  ${p => p.isActive && activeStyles}

  ${p => p.disabled && `
    opacity: 0.3;
  `}
`;
// TODO depracte
const pressableOnBlackTheme = {
    bg: 'transparent',
    hoverColor: styles_1.c.white,
    activeColor: styles_1.c.white,
    hoverBg: styles_1.themes.darkBackground.bgHover,
    activeBg: styles_1.themes.darkBackground.bgPressing
};
// TODO depracte
const pressableOnWhiteTheme = {
    bg: 'transparent',
    hoverBg: styles_1.themes.whiteBackground.bgHover,
    activeBg: styles_1.themes.whiteBackground.bgPressing,
};
exports.PressableOnBlack = styled_components_1.default(exports.RootPressable).attrs(p => ({ ...pressableOnBlackTheme, ...p })) ``;
exports.PressableOnWhite = styled_components_1.default(exports.RootPressable).attrs(p => ({ ...pressableOnWhiteTheme, ...p })) ``;
exports.PressableBlue = styled_components_1.default(exports.RootPressable).attrs(p => ({
    color: styles_1.c.brand,
    hoverColor: polished_1.darken(0.8, styles_1.c.brand),
    hoverBg: polished_1.transparentize(0.8, styles_1.c.brand),
    ...p
})) ``;
exports.Pressable = exports.RootPressable;
//# sourceMappingURL=PressablePrimitive.js.map