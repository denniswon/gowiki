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
exports.IconWithStyles = exports.Icon = void 0;
const React = __importStar(require("react"));
const styles_1 = require("@gowiki/styles");
const styled_components_1 = __importDefault(require("styled-components"));
class Icon extends React.Component {
    static defaultProps = {
        size: 20
    };
    render() {
        const { name, color, className, style, opacity, op, onClick, size, ...rest } = this.props;
        const nameCompat = name.replace(/-/g, '_');
        const iconProps = {
            style: {
                maxWidth: size,
                maxHeight: size,
                boxSizing: 'content-box',
                color,
                opacity: op,
                fontSize: size,
                ...style
            },
            onClick: onClick,
            ...rest
        };
        return (React.createElement(StyledMaterialIcon, { className: `icon material-icons ${className}`, ...iconProps }, nameCompat));
    }
}
exports.Icon = Icon;
const IconTagComponent = ({ tag, children, ...props }) => React.createElement(tag, props, children);
exports.IconWithStyles = styled_components_1.default(IconTagComponent).attrs({}) ` ${styles_1.s.boxProps}
  ${p => (p.op ? `opacity:${p.op}` : '')}
  ${p => (p.opacity ? `opacity:${p.opacity}` : '')}
`;
const StyledMaterialIcon = styled_components_1.default.i `
  ${styles_1.s.boxProps} text-align: center;
`;
//# sourceMappingURL=Icon.js.map