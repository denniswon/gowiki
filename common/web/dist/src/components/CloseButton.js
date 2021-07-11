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
exports.CloseButton = void 0;
const React = __importStar(require("react"));
const styles_1 = require("@gowiki/styles");
const primitives_1 = require("../primitives");
const Icon_1 = require("./Icon");
const CloseButton = (props) => {
    const { onClick, color, size = 24, ...rest } = props;
    return (React.createElement(primitives_1.Pressable, { center: true, pabs: true, p: 6, id: "Close", onClick: onClick, tabIndex: 0, className: 'app-non-dragging', hoverColor: styles_1.c.ink, iconOp: 0.5, hoverBg: styles_1.c.ink15, hoverIconOp: 1, ...rest },
        React.createElement(Icon_1.Icon, { name: "close", size: size, color: color })));
};
exports.CloseButton = CloseButton;
exports.CloseButton.defaultProps = {
    top: 8,
    right: 8,
};
//# sourceMappingURL=CloseButton.js.map