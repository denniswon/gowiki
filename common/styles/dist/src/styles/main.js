"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = exports.Video = exports.ImgFrame = exports.Img = void 0;
const styles_global_1 = require("@gowiki/styles-global");
const styled_components_1 = __importDefault(require("styled-components"));
const colors_1 = __importDefault(require("./colors"));
exports.Img = styled_components_1.default.img ` ${styles_global_1.s.boxProps}
  ${p => p.withShadow && ` box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); `}
  ${p => p.withStroke && ` border: 1px solid ${colors_1.default.black20}; `}
`;
exports.ImgFrame = styled_components_1.default(styles_global_1.Box) `
  background: black;
`;
exports.ImgFrame.defaultProps = { p: 20, br: 12, center: true };
exports.Video = styled_components_1.default.video `
  ${styles_global_1.s.boxProps}
`;
exports.Divider = styled_components_1.default(styles_global_1.Box).attrs((p) => ({
    minh: 1,
    mt: p.mv || 8,
    mb: p.mv || 8,
    mh: -4,
    bg: p.bg || p.theme.ink10,
    ...p
})) ``;
//# sourceMappingURL=main.js.map