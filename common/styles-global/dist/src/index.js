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
exports.textProps = exports.boxProps = exports.spaceScale = exports.parseUnit = exports.s = exports.Box = exports.Row = exports.Column = exports.media = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const global_styles_1 = require("./global-styles");
const primitive_1 = require("./primitive");
Object.defineProperty(exports, "boxProps", { enumerable: true, get: function () { return primitive_1.boxProps; } });
Object.defineProperty(exports, "textProps", { enumerable: true, get: function () { return primitive_1.textProps; } });
const space_1 = require("./space");
Object.defineProperty(exports, "spaceScale", { enumerable: true, get: function () { return space_1.scale; } });
const styledSystems_1 = require("./styledSystems");
const utils_1 = require("./utils");
const Root = styled_components_1.default.div ``;
const size = (size) => `width:${size ? size : 24}px; height:${size ? size : 24}px;`;
const anim = styled_components_1.css `
  transition: 300ms;
  &:hover {
    transition: all 100ms;
  }
`;
const unselectable = styled_components_1.css `
  user-select: none;
  & * {
    user-select: none;
  }
`;
const untouchable = styled_components_1.css `
  ${unselectable} pointer-events:none;
  & * {
    pointer-events: none;
  }
`;
const actionable = styled_components_1.css `
  ${unselectable} cursor:pointer;
`;
const sizes = utils_1.defaultBreakpointsObject;
exports.media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (first, ...interpolations) => styled_components_1.css `
      @media (max-width: ${sizes[label]}) {
        ${styled_components_1.css(first, ...interpolations)}
      }
    `;
    return acc;
}, {});
const mediaQuery = (maxWidth) => `@media (max-width: ${maxWidth}px)`;
exports.Column = styled_components_1.default(Root).attrs({ col: true }) `
  ${primitive_1.boxProps}
`;
exports.Row = styled_components_1.default(Root).attrs({ row: true }) `
  ${primitive_1.boxProps}
`;
exports.Box = styled_components_1.default(Root) `
  ${primitive_1.boxProps}
`;
const globalStyles = {
    ...global_styles_1.s,
    size,
    anim,
    media: exports.media,
    unselectable,
    untouchable,
    actionable,
    mediaQuery,
    textProps: primitive_1.textProps,
    boxProps: primitive_1.boxProps,
    spacingProps: styledSystems_1.spacing,
    breakpoints: styledSystems_1.defaultBreakpoints,
};
exports.s = globalStyles;
// Exported Utils
var utils_2 = require("./utils");
Object.defineProperty(exports, "parseUnit", { enumerable: true, get: function () { return utils_2.parseUnit; } });
//# sourceMappingURL=index.js.map