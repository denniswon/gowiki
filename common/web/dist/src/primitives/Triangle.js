"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
const styles_global_1 = require("@gowiki/styles-global");
const styled_components_1 = __importDefault(require("styled-components"));
exports.Triangle = styled_components_1.default(styles_global_1.Box).attrs({}) ` width:0; height:0;
  ${p => p.direction == 'up' &&
    `border:${p.width}px solid transparent; border-bottom:${p.height}px solid ${p.color}; border-top:none;`}
  ${p => p.direction == 'right' &&
    `border:${p.width}px solid transparent; border-left:${p.height}px solid ${p.color}; border-right:none;`}
  ${p => p.direction == 'down' &&
    `border:${p.width}px solid transparent; border-top:${p.height}px solid ${p.color}; border-bottom:none;`}
  ${p => p.direction == 'left' &&
    `border:${p.width}px solid transparent; border-right:${p.height}px solid ${p.color}; border-left:none;`}
`;
//# sourceMappingURL=Triangle.js.map