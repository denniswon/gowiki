"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimedToggle = void 0;
const react_1 = require("react");
const useTimedToggle = (onEnd, duration = 1000) => {
    const [isActive, setActive] = react_1.useState(false);
    const toggleTimeoutRef = react_1.useRef();
    const clearActiveTimeout = () => clearTimeout(toggleTimeoutRef.current);
    react_1.useEffect(() => {
        return () => clearActiveTimeout();
    }, []);
    const activate = () => {
        clearActiveTimeout();
        setActive(true);
        toggleTimeoutRef.current = setTimeout(() => {
            setActive(false);
            onEnd();
        }, duration);
    };
    return [isActive, activate];
};
exports.useTimedToggle = useTimedToggle;
//# sourceMappingURL=useTimedToggle.js.map