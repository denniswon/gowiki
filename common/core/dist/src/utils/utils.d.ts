import { OS, Platform } from '../config/types';
export declare function arraysEqual<T>(a: T[], b: T[], comparator?: (i: T, j: T) => boolean): boolean;
export declare function values<T>(obj: {
    [key: string]: T;
}): T[];
export declare function findMax(data: any): {
    max: any;
    index: number;
};
export declare function toPascalCase(str: string): string;
export declare function toTitleCase(str: string, delim?: string): string;
export declare function emailToName(str: string): string;
export declare const timeToString: (seconds: number) => string;
export declare function setCopyAdd<T>(source: Set<T>, value: T): Set<T>;
export declare function setCopyDelete<T>(source: Set<T>, value: T): Set<T>;
export declare function setCopyToggle<T>(source: Set<T>, value: T): Set<T>;
export declare function randInt(min: number, max: number): number;
export declare function isFilled(obj: any): boolean;
export declare function isEmpty(obj: any): boolean;
export declare function distribution(arr: number[]): {
    min: number;
    max: number;
    avg: number;
    p25: number;
    med: number;
    p75: number;
};
export declare function fuzzysearch(needle: string, haystack: string): boolean;
export declare function clamp(val: number, min: number, max: number): number;
export declare const getAudioContext: () => any;
export declare function delay(ms: any): Promise<void>;
export declare function currentTimezone(): string;
export declare enum DebounceStyle {
    RESET_ON_NEW = 0,
    IMMEDIATE_THEN_WAIT = 1,
    IGNORE_NEW = 2,
    QUEUE_LAST = 3
}
export declare const createScopedDebounce: () => {
    debounce: (id: string, func: () => void, wait: number, style: DebounceStyle) => void;
    clearDebounce: (id: string) => any;
    clearAllDebounces: () => void;
};
export declare const debounce: (id: string, func: () => void, wait: number, style: DebounceStyle) => void;
export declare const clearDebounce: (id: string) => any;
export declare class EventsQueue<T> {
    queued: T[];
    outstanding: T[];
    flushFn: (events: T[]) => Promise<any>;
    constructor(fn: (events: T[]) => Promise<any>);
    filter: (fn: (item: T) => boolean) => void;
    push: (e: T) => void;
    flush: () => Promise<void>;
}
export declare function getOS(): OS;
export declare function getPlatform(): Platform;
export declare const setPlatform: (newPlatform: Platform) => Platform;
export declare const isMac: boolean;
export declare const isMacBigSur: boolean;
export declare const isWindows: boolean;
export declare const isLinux: boolean;
export declare const isMobile: boolean;
export declare const isReactNative: boolean;
export declare const draggingClass: string;
export declare const classes: (classes: string[]) => string;
export declare function getOSInfo(): string;
export declare const isWebRTCSupported: () => boolean;
export declare function getBrowser(): "react-native" | "unknown" | "nodejs" | "opera" | "edge" | "chrome" | "safari" | "firefox" | "ie";
export declare function getBrowserOS(): string;
export declare function unwrapError(error: any, defaultMessage?: string): any;
export declare const errorHasCode: (error: any, code: number) => boolean;
export declare const shallowCompare: (obj1: any, obj2: any) => boolean;
export declare const deepCompareIntersection: (obj1: any, obj2: any) => any;
export declare const placeholderPromise: (shouldResolve?: boolean, delayMs?: number) => Promise<void>;
export declare function mapRange(value: number, in_min: number, in_max: number, out_min: number, out_max: number): number;
export declare function mapSlices(list: any[], chunk: number, func: (slice: any[], index: number) => any): any[];
export declare function range(start: number, end: number): number[];
export declare function apostrophedString(str: string): string;
export declare function objectToGetParams(object: any): string;
export declare function calculateDragOffset(cursorScreenPosition: any, windowPosition: any): number[];
export declare function updateWindowPosition(cursorScreenPosition: any, size: any, dragOffsetX: any, dragOffsetY: any, window: any): void;
export declare function offlineMessage(offlineTime: number): string;
export declare function shuffleArray(a: any): any;
export declare function commaAnd(strings: string[]): string;
export declare function timeDuration(time: string): number;
export declare function fileSize(size: number): string;
export declare const sleep: (milliseconds: number) => Promise<unknown>;
export declare const nounApostrophe: (noun: string) => string;
export declare const pluralizeWithCount: (noun: string, num: number) => string;
export declare const pluralize: (noun: string, num: number) => string;
export declare function assertUnreachable(x: never): never;
export declare function humanizeNumber(value: any): string | number;
export declare function performanceNow(): number;
export declare function debugCloneNodeWithAttrs(elem: HTMLElement): Node;
export declare function bfsTraverseElem(elem: HTMLElement, fn: (elem: HTMLElement) => void): void;
export declare function getCircularReplacer(): (key: any, value: any) => any;
export declare function renderTimeString(duration: number): string;
