"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = void 0;
const react_1 = __importDefault(require("react"));
const core_1 = require("@gowiki/core");
const styles_1 = require("@gowiki/styles");
const ErrorMessage = (props) => {
    const { error, ...rest } = props;
    if (!error)
        return null;
    return (react_1.default.createElement(styles_1.m.Text, { bold: true, size: 14, lh: 1.3, color: styles_1.c.red, ...rest }, core_1.unwrapError(error)));
};
exports.ErrorMessage = ErrorMessage;
//# sourceMappingURL=ErrorMessage.js.map