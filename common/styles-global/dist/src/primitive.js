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
exports.textProps = exports.boxProps = void 0;
const styled_components_1 = require("styled-components");
const global_styles_1 = require("./global-styles");
const styledSystem = __importStar(require("./styledSystems"));
const defaultBreakpoints = [576, 768, 992, 1200];
const quickFlexProps = styled_components_1.css `
	${(p) => (p.jcc ? global_styles_1.s.jcc : '')}
	${(p) => (p.jcsa ? global_styles_1.s.jcsa : '')}
	${(p) => (p.jcsb ? global_styles_1.s.jcsb : '')}
	${(p) => (p.jcfs ? global_styles_1.s.jcfs : '')}
	${(p) => (p.jcfe ? global_styles_1.s.jcfe : '')}

	${(p) => (p.aic ? global_styles_1.s.aic : '')}
	${(p) => (p.aifs ? global_styles_1.s.aifs : '')}
	${(p) => (p.aife ? global_styles_1.s.aife : '')}
	${(p) => (p.aib ? global_styles_1.s.aib : '')}


	${(p) => (p.ass ? global_styles_1.s.ass : '')}
	${(p) => (p.asfs ? global_styles_1.s.asfs : '')}
	${(p) => (p.asfe ? global_styles_1.s.asfe : '')}
	${(p) => (p.asc ? global_styles_1.s.asc : '')}

	${(p) => (p.jss ? global_styles_1.s.jss : '')}
	${(p) => (p.jsfs ? global_styles_1.s.jsfs : '')}
	${(p) => (p.jsfe ? global_styles_1.s.jsfe : '')}
  ${(p) => (p.jsc ? global_styles_1.s.jsc : '')}

  ${(p) => (p.center ? `${global_styles_1.s.aic} ${global_styles_1.s.jcc}` : '')}

	${(p) => (p.column || p.col ? global_styles_1.s.flxCol : '')}
  ${(p) => (p.row ? global_styles_1.s.flxRow : '')}

  ${(p) => (p.hCenter && (p.col || p.column) ? global_styles_1.s.aic : '')}
  ${(p) => (p.vCenter && (p.col || p.column) ? global_styles_1.s.jcc : '')}

  ${(p) => (p.hCenter && p.row ? global_styles_1.s.jcc : '')}
  ${(p) => (p.vCenter && p.row ? global_styles_1.s.aic : '')}

	${(p) => (p.flxWrap ? global_styles_1.s.flxWrap : '')}
	${(p) => (p.flxOrder ? `display:flex; order:${p.flxOrder};` : '')}
	${(p) => (p.flex && `display:flex; ${typeof p.flex == 'number' && `flex:${p.flex};`}`)}
  ${(p) => (p.flex1 ? `display:flex; flex: 1 1 0%;` : '')}
`;
const quickPositionProps = styled_components_1.css `
	${(p) => (p.pabs ? global_styles_1.s.pabs : '')}
	${(p) => (p.prel ? global_styles_1.s.prel : '')}
	${(p) => (p.pfix ? `position: fixed;` : '')}
`;
const quickUtilityProps = styled_components_1.css `
  ${(p) => (p.pointer && `cursor:pointer;`)}
  ${(p) => (p.cursor && `cursor:${p.cursor};`)}
`;
// Box Props
exports.boxProps = styled_components_1.css `
  ${styledSystem.systemBox}
	${quickFlexProps}
  ${quickPositionProps}
  ${quickUtilityProps}
  `;
// ------------------------------------------
// TextProps
const quickTypographyProps = styled_components_1.css `
  ${(p) => (p.light ? `font-weight:300;` : '')}
  ${(p) => (p.regular ? `font-weight:400;` : '')}
  ${(p) => (p.medium ? `font-weight:500;` : '')}
  ${(p) => (p.semi ? `font-weight:600;` : '')}
  ${(p) => (p.bold ? `font-weight:700;` : '')}
  ${(p) => (p.extraBold ? `font-weight:800;` : '')}
  ${(p) => (p.black ? `font-weight:900;` : '')}

  ${(p) => (p.tal ? `text-align:left;` : '')}
  ${(p) => (p.tac ? `text-align:center;` : '')}
  ${(p) => (p.tar ? `text-align:right;` : '')}

  ${(p) => (p.upcase ? `text-transform:uppercase;` : '')}
`;
exports.textProps = styled_components_1.css `
  ${quickTypographyProps}
  ${styledSystem.typography}
`;
//# sourceMappingURL=primitive.js.map