"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerWithPrefix = exports.logger = exports.LevelLabels = exports.Level = void 0;
const config_1 = require("../config");
const LS_LOGLEVEL = 'loglevel';
var Level;
(function (Level) {
    Level[Level["TRACE"] = 0] = "TRACE";
    Level[Level["DEBUG"] = 1] = "DEBUG";
    Level[Level["INFO"] = 2] = "INFO";
    Level[Level["WARN"] = 3] = "WARN";
    Level[Level["ERROR"] = 4] = "ERROR";
})(Level = exports.Level || (exports.Level = {}));
const LevelMap = {
    'trace': Level.TRACE,
    'debug': Level.DEBUG,
    'info': Level.INFO,
    'warn': Level.WARN,
    'error': Level.ERROR,
};
exports.LevelLabels = {
    [Level.TRACE]: 'trace',
    [Level.DEBUG]: 'debug',
    [Level.INFO]: 'info',
    [Level.WARN]: 'warn',
    [Level.ERROR]: 'error',
};
const isReactNative = (typeof navigator != 'undefined' && navigator.product == 'ReactNative');
const ConsoleMethodMap = {
    [Level.TRACE]: console.trace,
    [Level.DEBUG]: console.debug,
    [Level.INFO]: console.info,
    [Level.WARN]: console.warn,
    [Level.ERROR]: console.error,
};
const ConsoleLogger = (level, ...args) => {
    ConsoleMethodMap[level](...args);
};
class Logger {
    level;
    logListeners = [ConsoleLogger];
    didNotLogListeners = [];
    allLogListeners = [];
    constructor() {
        const storedLogLevel = typeof localStorage != 'undefined' && localStorage.getItem(LS_LOGLEVEL);
        const level = LevelMap[storedLogLevel];
        if (config_1.config.dev) {
            this.level = level || Level.DEBUG;
        }
        else {
            this.level = level || Level.ERROR;
        }
    }
    setLevel = (level) => this.level = level;
    setLevelString = (level) => this.level = LevelMap[level];
    log(level, ...args) {
        this.allLogListeners.forEach(l => l(level, ...args));
        if (level < this.level) {
            this.didNotLogListeners.forEach(l => l(level, ...args));
            return;
        }
        this.logListeners.forEach(l => l(level, ...args));
    }
    saveDefaultLogLevel(level) {
        localStorage.setItem(LS_LOGLEVEL, level);
        this.setLevelString(level);
    }
    trace = (...args) => this.log(Level.TRACE, ...args);
    debug = (...args) => this.log(Level.DEBUG, ...args);
    info = (...args) => this.log(Level.INFO, ...args);
    warn = (...args) => this.log(Level.WARN, ...args);
    error = (...args) => this.log(Level.ERROR, ...args);
    withPrefix = (prefix) => {
        return {
            trace: (...args) => this.log(Level.TRACE, prefix, ...args),
            debug: (...args) => this.log(Level.DEBUG, prefix, ...args),
            info: (...args) => this.log(Level.INFO, prefix, ...args),
            warn: (...args) => this.log(Level.WARN, prefix, ...args),
            error: (...args) => this.log(Level.ERROR, prefix, ...args),
        };
    };
}
const instance = new Logger();
exports.logger = instance;
exports.loggerWithPrefix = instance.withPrefix;
//# sourceMappingURL=logger.js.map