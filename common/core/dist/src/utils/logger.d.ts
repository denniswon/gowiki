export declare enum Level {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4
}
export declare const LevelLabels: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
};
declare type LogListener = (level: Level, ...args: any[]) => void;
declare class Logger {
    level: Level;
    logListeners: LogListener[];
    didNotLogListeners: LogListener[];
    allLogListeners: LogListener[];
    constructor();
    setLevel: (level: Level) => Level;
    setLevelString: (level: string) => any;
    log(level: Level, ...args: any[]): void;
    saveDefaultLogLevel(level: string): void;
    trace: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    withPrefix: (prefix: string) => {
        trace: (...args: any[]) => void;
        debug: (...args: any[]) => void;
        info: (...args: any[]) => void;
        warn: (...args: any[]) => void;
        error: (...args: any[]) => void;
    };
}
export declare const logger: Logger;
export declare const loggerWithPrefix: (prefix: string) => {
    trace: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
};
export {};
