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
exports.fontWeights = exports.AnchorUnderline = exports.Anchor = exports.linkStyle = exports.Code = exports.Strong = exports.Text = exports.textTags = exports.textStyles = exports.BaseText = exports.T10 = exports.T11 = exports.T12 = exports.T13 = exports.T14 = exports.T15 = exports.T16 = exports.T20 = exports.T18 = exports.T24 = exports.T28 = exports.T32 = exports.T48 = exports.T80 = exports.globalTextStyles = exports.t10 = exports.t11 = exports.t12 = exports.t13 = exports.t14 = exports.t15 = exports.t16 = exports.t18 = exports.t20 = exports.t22 = exports.t24 = exports.t28 = exports.t32 = exports.t48 = exports.t80 = exports.tRegular = exports.tMedium = exports.tSemi = exports.tBold = exports.tExtraBold = exports.resetTextAttributes = void 0;
const core_1 = require("@gowiki/core");
const styles_global_1 = require("@gowiki/styles-global");
const styled_components_1 = __importStar(require("styled-components"));
const colors_1 = __importDefault(require("./colors"));
exports.resetTextAttributes = styled_components_1.css `
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
`;
exports.tExtraBold = styled_components_1.css `
  font-weight: 900;
`;
exports.tBold = styled_components_1.css `
  font-weight: 700;
`;
exports.tSemi = styled_components_1.css `
  font-weight: 600;
`;
exports.tMedium = styled_components_1.css `
  font-weight: 500;
`;
exports.tRegular = styled_components_1.css `
  font-weight: 400;
`;
exports.t80 = styled_components_1.css `
  font-size: 80px;
  line-height: 88px;
  ${exports.tBold}
`;
exports.t48 = styled_components_1.css `
  font-size: 48px;
  line-height: 56px;
  ${exports.tBold}
`;
exports.t32 = styled_components_1.css `
  font-size: 32px;
  line-height: 42px;
  ${exports.tBold}
`;
exports.t28 = styled_components_1.css `
  font-size: 28px;
  line-height: 36px;
  ${exports.tBold}
`;
exports.t24 = styled_components_1.css `
  font-size: 24px;
  line-height: 32px;
  ${exports.tBold}
`;
exports.t22 = styled_components_1.css `
  font-size: 22px;
  line-height: 28px;
  ${exports.tRegular}
`;
exports.t20 = styled_components_1.css `
  font-size: 20px;
  line-height: 24px;
  ${exports.tRegular}
`;
exports.t18 = styled_components_1.css `
  font-size: 18px;
  line-height: 22px;
  ${exports.tRegular} letter-spacing:-0.02em;
`;
exports.t16 = styled_components_1.css `
  font-size: 16px;
  line-height: 19px;
  ${exports.tRegular}
`;
exports.t15 = styled_components_1.css `
  font-size: 15px;
  line-height: 16px;
  ${exports.tRegular}
`;
exports.t14 = styled_components_1.css `
  font-size: 14px;
  line-height: 16px;
  ${exports.tRegular}
`;
exports.t13 = styled_components_1.css `
  font-size: 13px;
  line-height: 15px;
  ${exports.tRegular}
`;
exports.t12 = styled_components_1.css `
  font-size: 12px;
  line-height: 14px;
  ${exports.tRegular}
`;
exports.t11 = styled_components_1.css `
  font-size: 11px;
  line-height: 13px;
  ${exports.tRegular}
`;
exports.t10 = styled_components_1.css `
  font-size: 10px;
  line-height: 12px;
  ${exports.tRegular}
`;
const showFontFeatures = core_1.isMac && !navigator.userAgent.includes('Mac OS X 10_12');
exports.globalTextStyles = styled_components_1.css `
  html {
    ${exports.t15} color:${colors_1.default.black};
    ${showFontFeatures &&
    `
      font-feature-settings: 'calt' 1, 'tnum' 1, 'case' 0, 'ss02' 0;
      -webkit-font-feature-settings: 'calt' 1, 'tnum' 1, 'case' 0, 'ss02' 0;`}
    font-kerning:normal;
    text-rendering:geometricPrecision;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
const textProps = styled_components_1.css `
  ${p => (p.lh ? `line-height: ${styles_global_1.parseUnit(p.lh)};` : '')}
  ${p => (p.ls ? `letter-spacing: ${styles_global_1.parseUnit(p.ls)};` : '')}
  ${p => (p.opacity ? `opacity: ${p.opacity};` : '')}
  ${p => (p.op ? `opacity: ${p.op};` : '')}
  ${p => (p.color ? `color: ${p.color};` : '')}
  ${p => (p.center ? `text-align: center;` : '')}
  ${p => (p.tCenter ? `text-align: center;` : '')}
  ${p => (p.right ? `text-align: right;` : '')}
  ${p => (p.upcase ? `text-transform: uppercase;` : '')}
  ${p => (p.italic ? `font-style: italic;` : '')}
  ${p => (p.underline ? `text-decoration: underline;` : '')}
  ${p => (p.body ? `line-height: 140%;` : '')}
  ${p => (p.unselectable && `user-select: none;`)}

  ${p => p.size && exports.textStyles[p.size]}
  ${p => p.fs && `font-size: ${p.fs};`}

  ${p => p.ellipsize && styles_global_1.s.ellipsis}
  ${p => p.bold && exports.tBold}
  ${p => p.medium && exports.tMedium}
  ${p => p.semi && exports.tSemi}
  ${p => p.regular && exports.tRegular}
  ${p => p.weight && `font-weight:${p.weight};`}

  ${p => p.inline && `display: inline;`}

  ${p => p.paragraph && `line-height:${p.lh || '150%'};`}

  ${p => p.multiLineEllipsis &&
    ` text-overflow:hidden; overflow:hidden; -webkit-box-orient: vertical; -webkit-line-clamp:${p.multiLineEllipsis}; display: -webkit-box; word-break: break-word;`}
`;
exports.T80 = styled_components_1.default(styles_global_1.Box) `
  ${exports.t80} ${textProps}
`;
exports.T48 = styled_components_1.default(styles_global_1.Box) `
  ${exports.t48} ${textProps}
`;
exports.T32 = styled_components_1.default(styles_global_1.Box) `
  ${exports.t32} ${textProps}
`;
exports.T28 = styled_components_1.default(styles_global_1.Box) `
  ${exports.t28} ${textProps}
`;
exports.T24 = styled_components_1.default(styles_global_1.Box) `
  ${exports.t24} ${textProps}
`;
exports.T18 = styled_components_1.default(styles_global_1.Box) `
  ${exports.t18} ${textProps}
`;
exports.T20 = styled_components_1.default(styles_global_1.Box) `
  ${exports.t20} ${textProps}
`;
exports.T16 = styled_components_1.default(styles_global_1.Box) `
  ${exports.t16} ${textProps}
`;
exports.T15 = styled_components_1.default(styles_global_1.Box) `
  ${exports.t15} ${textProps}
`;
exports.T14 = styled_components_1.default(styles_global_1.Box) `
  ${exports.t14} ${textProps}
`;
exports.T13 = styled_components_1.default(styles_global_1.Box) `
  ${exports.t13} ${textProps}
`;
exports.T12 = styled_components_1.default(styles_global_1.Box) `
  ${exports.t12} ${textProps}
`;
exports.T11 = styled_components_1.default(styles_global_1.Box) `
  ${exports.t11} ${textProps}
`;
exports.T10 = styled_components_1.default(styles_global_1.Box) `
  ${exports.t10} ${textProps}
`;
exports.BaseText = styled_components_1.default(styles_global_1.Box) `
  ${textProps}
`;
exports.textStyles = {
    10: exports.t10,
    12: exports.t12,
    13: exports.t13,
    14: exports.t14,
    15: exports.t15,
    16: exports.t16,
    18: exports.t18,
    20: exports.t20,
    24: exports.t24,
    28: exports.t28,
    32: exports.t32,
    48: exports.t48,
    80: exports.t80
};
exports.textTags = {
    10: exports.T10,
    12: exports.T12,
    13: exports.T13,
    14: exports.T14,
    15: exports.T15,
    16: exports.T16,
    18: exports.T18,
    20: exports.T20,
    24: exports.T24,
    28: exports.T28,
    32: exports.T32,
    48: exports.T48,
    80: exports.T80
};
exports.Text = styled_components_1.default(styles_global_1.Box).attrs({ className: 'text' }) `
  ${styles_global_1.s.boxProps}
  ${textProps}

  strong {
    ${exports.tBold}
  }
  em {
    font-style: italic;
  }
`;
exports.Strong = styled_components_1.default.strong ` ${styles_global_1.s.boxProps} ${textProps} ${exports.tBold} `;
exports.Code = styled_components_1.default.code ` ${styles_global_1.s.boxProps}
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
`;
exports.linkStyle = styled_components_1.css `
  color: ${p => p.color || colors_1.default.brand};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
exports.Anchor = styled_components_1.default.a `
  ${styles_global_1.s.boxProps}
  ${exports.linkStyle}
`;
exports.AnchorUnderline = styled_components_1.default.a `
  ${styles_global_1.s.boxProps}
  text-decoration: underline; cursor: pointer;
  &:hover { opacity: 0.8 }
`;
exports.fontWeights = {
    regular: 400,
    medium: 500,
    semi: 600,
    bold: 700,
};
//# sourceMappingURL=text.js.map