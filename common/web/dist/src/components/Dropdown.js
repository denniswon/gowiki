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
exports.DropdownIcon = exports.Dropdown = void 0;
const React = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const primitives_1 = require("../primitives");
const Dropdown = (props) => {
    const { isActive, color, ...rest } = props;
    return (
    // @ts-ignore
    React.createElement(exports.DropdownIcon, { sz: 10, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...rest },
        React.createElement("path", { d: "M0.937906 3.5241C0.527894 2.85783 1.00724 2 1.78956 2H14.2104C14.9928 2 15.4721 2.85783 15.0621 3.5241L8.85166 13.6161C8.46117 14.2506 7.53883 14.2506 7.14834 13.6161L0.937906 3.5241Z", fill: "black" })));
};
exports.Dropdown = Dropdown;
exports.Dropdown.defaultProps = {
    size: 16
};
exports.DropdownIcon = styled_components_1.default(primitives_1.Svg) `
  ${p => p.isActive && `transform: rotate(180deg); opacity:1 !important;`}
`;
//# sourceMappingURL=Dropdown.js.map