"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageWithFallback = void 0;
const react_1 = __importDefault(require("react"));
const styles_1 = require("@gowiki/styles");
const styled_components_1 = __importDefault(require("styled-components"));
/**
 You can pass multiple images files to be more optimal. eg. webp
 Make sure to set the type to the correct file format
 */
function ImageWithFallback(props) {
    const { src, fallbackSrc = props.src, type = 'image/webp', ...rest } = props;
    return (react_1.default.createElement(Picture, { ...rest },
        react_1.default.createElement("source", { srcSet: src, type: type }),
        react_1.default.createElement("img", { height: '100%', width: '100%', src: fallbackSrc })));
}
exports.ImageWithFallback = ImageWithFallback;
const Picture = styled_components_1.default.picture ` ${styles_1.s.boxProps}
  img{ object-fit: cover; }
`;
//# sourceMappingURL=ImageWithFallback.js.map