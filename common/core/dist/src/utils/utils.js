"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDragOffset = exports.objectToGetParams = exports.apostrophedString = exports.range = exports.mapSlices = exports.mapRange = exports.placeholderPromise = exports.deepCompareIntersection = exports.shallowCompare = exports.errorHasCode = exports.unwrapError = exports.getBrowserOS = exports.getBrowser = exports.isWebRTCSupported = exports.getOSInfo = exports.classes = exports.draggingClass = exports.isReactNative = exports.isMobile = exports.isLinux = exports.isWindows = exports.isMacBigSur = exports.isMac = exports.setPlatform = exports.getPlatform = exports.getOS = exports.EventsQueue = exports.clearDebounce = exports.debounce = exports.createScopedDebounce = exports.DebounceStyle = exports.currentTimezone = exports.delay = exports.getAudioContext = exports.clamp = exports.fuzzysearch = exports.distribution = exports.isEmpty = exports.isFilled = exports.randInt = exports.setCopyToggle = exports.setCopyDelete = exports.setCopyAdd = exports.timeToString = exports.emailToName = exports.toTitleCase = exports.toPascalCase = exports.findMax = exports.values = exports.arraysEqual = void 0;
exports.renderTimeString = exports.getCircularReplacer = exports.bfsTraverseElem = exports.debugCloneNodeWithAttrs = exports.performanceNow = exports.humanizeNumber = exports.assertUnreachable = exports.pluralize = exports.pluralizeWithCount = exports.nounApostrophe = exports.sleep = exports.fileSize = exports.timeDuration = exports.commaAnd = exports.shuffleArray = exports.offlineMessage = exports.updateWindowPosition = void 0;
const config_1 = require("../config");
const logger_1 = require("./logger");
// --- Basic JS Helpers
function arraysEqual(a, b, comparator) {
    if (a == null && b == null)
        return true;
    if (!a || !b)
        return false;
    if (a.length != b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (comparator) {
            if (!comparator(a[i], b[i]))
                return false;
        }
        else {
            if (a[i] != b[i])
                return false;
        }
    }
    return true;
}
exports.arraysEqual = arraysEqual;
function values(obj) {
    return Object.keys(obj).map(k => obj[k]);
}
exports.values = values;
function findMax(data) {
    let max, index = -1;
    data.forEach((x, i) => {
        if (index == -1 || x > max) {
            max = x;
            index = i;
        }
    });
    return { max, index };
}
exports.findMax = findMax;
const SHORTWORDS = /^(and|as|but|for|if|nor|or|so|yet|a|an|the|as|at|by|for|in|of|off|on|per|to|up|via)$/i;
function toPascalCase(str) {
    return str.match(/[a-z]+/gi)
        .map((word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
        .join('');
}
exports.toPascalCase = toPascalCase;
function toTitleCase(str, delim) {
    const title = str.replace(/\w\S*/g, function (txt) {
        if (txt.match(SHORTWORDS)) {
            return txt.toLowerCase();
        }
        else {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    });
    return title.charAt(0).toUpperCase() + title.substr(1);
}
exports.toTitleCase = toTitleCase;
function emailToName(str) {
    if (str.indexOf(' ') > -1)
        return str;
    return str.split('.').map(s => toTitleCase(s)).join(' ');
}
exports.emailToName = emailToName;
const timeToString = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let remain = Math.floor(seconds - minutes * 60);
    return `${minutes}:${remain < 10 ? '0' : ''}${remain}`;
};
exports.timeToString = timeToString;
function setCopyAdd(source, value) {
    let newSet = new Set(source);
    newSet.add(value);
    return newSet;
}
exports.setCopyAdd = setCopyAdd;
function setCopyDelete(source, value) {
    let newSet = new Set(source);
    newSet.delete(value);
    return newSet;
}
exports.setCopyDelete = setCopyDelete;
function setCopyToggle(source, value) {
    let newSet = new Set(source);
    source.has(value) ? newSet.delete(value) : newSet.add(value);
    return newSet;
}
exports.setCopyToggle = setCopyToggle;
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
exports.randInt = randInt;
function isFilled(obj) {
    if (obj == null && obj == undefined)
        return false;
    if (typeof obj == 'string' || typeof obj == 'number') {
        if (obj != null && obj != '' && obj != undefined)
            return true;
        else
            return false;
    }
    else if (typeof obj == 'object') {
        if (Array.isArray(obj)) {
            if (obj != null && obj != undefined && obj.length > 0)
                return true;
            else
                return false;
        }
        else {
            if (obj != null && obj != undefined && Object.keys(obj).length > 0)
                return true;
            else
                return false;
        }
    }
    else if (typeof obj == 'function') {
        return true;
    }
    else {
        // undefined?
        return false;
    }
}
exports.isFilled = isFilled;
function isEmpty(obj) {
    return !isFilled(obj);
}
exports.isEmpty = isEmpty;
// note: gives approximate median; does not average middle two entries
function distribution(arr) {
    if (!arr || arr.length == 0)
        return { min: 0, max: 0, p25: 0, med: 0, p75: 0, avg: 0 };
    const sorted = arr.sort((a, b) => a - b);
    const p25 = sorted[Math.floor(arr.length / 4)];
    const med = sorted[Math.floor(arr.length / 2)];
    const p75 = sorted[Math.floor(arr.length * 0.75)];
    const min = sorted[0];
    const max = sorted[arr.length - 1];
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    return { min, max, avg, p25, med, p75 };
}
exports.distribution = distribution;
function fuzzysearch(needle, haystack) {
    const hlen = haystack.length;
    const nlen = needle.length;
    if (nlen > hlen) {
        return false;
    }
    if (nlen === hlen) {
        return needle === haystack;
    }
    outer: for (var i = 0, j = 0; i < nlen; i++) {
        const nChar = needle.charCodeAt(i);
        let prevHChar = 0;
        while (j < hlen) {
            const hChar = haystack.charCodeAt(j);
            if (hChar === nChar && (i !== 0 || prevHChar < 96 || prevHChar > 123)) {
                j++;
                prevHChar = hChar;
                continue outer;
            }
            else {
                j++;
                prevHChar = hChar;
            }
        }
        return false;
    }
    return true;
}
exports.fuzzysearch = fuzzysearch;
// Restrict <tt>val</tt> to [min,max]; if it goes outside that
// range then set it to the min or max value as appropriate
function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}
exports.clamp = clamp;
// --- Audio helpers
const getAudioContext = () => {
    const w = window;
    const ContextConstructor = w.AudioContext || w.webkitAudioContext;
    let context = (w.audioContext = new ContextConstructor());
    return context;
};
exports.getAudioContext = getAudioContext;
function delay(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}
exports.delay = delay;
// --- Date/time
function currentTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
exports.currentTimezone = currentTimezone;
// --- Debouncing
var DebounceStyle;
(function (DebounceStyle) {
    DebounceStyle[DebounceStyle["RESET_ON_NEW"] = 0] = "RESET_ON_NEW";
    DebounceStyle[DebounceStyle["IMMEDIATE_THEN_WAIT"] = 1] = "IMMEDIATE_THEN_WAIT";
    DebounceStyle[DebounceStyle["IGNORE_NEW"] = 2] = "IGNORE_NEW";
    DebounceStyle[DebounceStyle["QUEUE_LAST"] = 3] = "QUEUE_LAST";
})(DebounceStyle = exports.DebounceStyle || (exports.DebounceStyle = {}));
const createScopedDebounce = () => {
    const debounceTimers = {};
    const debounce = (id, func, wait, style) => {
        let timer = debounceTimers[id];
        switch (style) {
            case DebounceStyle.IMMEDIATE_THEN_WAIT:
                if (timer)
                    return;
                debounceTimers[id] = setTimeout(() => delete debounceTimers[id], wait);
                func();
                return;
            case DebounceStyle.QUEUE_LAST:
                if (timer) {
                    timer.queued = func;
                    timer.wait = wait;
                    return;
                }
                debounceTimers[id] = { timer: setTimeout(() => {
                        const queued = debounceTimers[id];
                        delete debounceTimers[id];
                        if (queued.queued)
                            debounce(id, queued.queued, queued.wait, style);
                    }, wait) };
                func();
                return;
            case DebounceStyle.IGNORE_NEW:
                if (timer)
                    return;
                debounceTimers[id] = setTimeout(() => {
                    func();
                    delete debounceTimers[id];
                }, wait);
                return;
            case DebounceStyle.RESET_ON_NEW:
            default:
                clearTimeout(timer);
                debounceTimers[id] = setTimeout(() => {
                    func();
                    delete debounceTimers[id];
                }, wait);
                return;
        }
    };
    const clearDebounce = (id) => {
        let timer = debounceTimers[id];
        if (typeof (timer) == 'object') {
            clearTimeout(timer.timer);
        }
        else {
            clearTimeout(timer);
        }
        delete debounceTimers[id];
        return timer;
    };
    const clearAllDebounces = () => {
        const debounceIds = Object.keys(debounceTimers);
        debounceIds.forEach(id => clearDebounce(id));
    };
    return { debounce, clearDebounce, clearAllDebounces };
};
exports.createScopedDebounce = createScopedDebounce;
const globalDebounce = exports.createScopedDebounce();
exports.debounce = globalDebounce.debounce;
exports.clearDebounce = globalDebounce.clearDebounce;
// --- queue + flush
const MAX_QUEUE_SIZE = 35;
class EventsQueue {
    // ordered from oldest to newest
    queued = [];
    outstanding = [];
    flushFn;
    constructor(fn) {
        this.flushFn = fn;
    }
    filter = (fn) => {
        this.queued = this.queued.filter(fn);
    };
    push = (e) => {
        this.queued.push(e);
        this.flush();
    };
    flush = async () => {
        if (this.outstanding.length != 0 || this.queued.length == 0)
            return;
        this.outstanding = this.queued;
        this.queued = [];
        let success = false;
        try {
            await this.flushFn(this.outstanding);
            success = true;
        }
        catch (ex) {
            this.queued = this.outstanding.concat(this.queued);
            if (this.queued.length > MAX_QUEUE_SIZE)
                this.queued = this.queued.slice(0, MAX_QUEUE_SIZE);
        }
        this.outstanding = [];
        if (success && this.queued.length != 0)
            this.flush();
    };
}
exports.EventsQueue = EventsQueue;
// --- user agent processing
// detect operating system
let os = null;
function getOS() {
    if (os)
        return os;
    if (typeof window === 'undefined') {
        // use node.js version of the check
        switch (process.platform) {
            case 'darwin': return os = 'mac';
            case 'win32': return os = 'windows';
            case 'android': return os = 'android';
            default:
                return 'linux';
        }
    }
    if (typeof navigator != 'undefined' && navigator.product == 'ReactNative')
        return os = 'react-native';
    let userAgent = window.navigator.userAgent, platform = window.navigator.platform, macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'], windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'], iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'mac';
    }
    else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'ios';
    }
    else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'windows';
    }
    else if (/Android/.test(userAgent)) {
        os = 'android';
    }
    else if (!os && /Linux/.test(platform)) {
        os = 'linux';
    }
    return os;
}
exports.getOS = getOS;
let protocol = config_1.getProtocol(config_1.config.env, config_1.config.dev, getOS());
config_1.config.protocol = protocol;
// detect app platform
let platform = null;
function getPlatform() {
    if (platform)
        return platform;
    const os = getOS();
    if (os == 'mac') {
        platform = 'mac-web';
    }
    else if (os == 'windows') {
        platform = 'win-web';
    }
    else if (os == 'linux') {
        platform = 'lin-web';
    }
    else if (os == 'android') {
        platform = 'andr-web';
    }
    else if (os == 'ios') {
        platform = 'ios-web';
    }
    else {
        platform = 'unknown';
    }
    return platform;
}
exports.getPlatform = getPlatform;
const setPlatform = (newPlatform) => platform = newPlatform;
exports.setPlatform = setPlatform;
exports.isMac = getOS() == 'mac';
exports.isMacBigSur = (() => {
    const osInfo = getOSInfo();
    if (osInfo.includes('Mac OS X 10_16') || osInfo.includes('Mac OS X 11')) {
        return true;
    }
    return false;
})();
exports.isWindows = getOS() == 'windows';
exports.isLinux = getOS() == 'linux';
exports.isMobile = ['ios', 'android'].indexOf(getOS()) > -1;
exports.isReactNative = getOS() == 'react-native';
// mac can use dragging on the entire app, but windows/linux cannot receive both drag and click
exports.draggingClass = !exports.isMac ? 'app-non-dragging' : 'app-dragging';
const classes = (classes) => classes.filter(c => c).join(" ");
exports.classes = classes;
function getOSInfo() {
    if (typeof window === 'undefined')
        return 'nodejs';
    if (typeof navigator != 'undefined' && navigator.product == 'ReactNative')
        return navigator.product;
    const userAgent = window.navigator.userAgent;
    const platform = /[^(]+\(([^)]+)\)/.exec(userAgent);
    return platform[1];
}
exports.getOSInfo = getOSInfo;
const isWebRTCSupported = () => {
    return true;
};
exports.isWebRTCSupported = isWebRTCSupported;
function getBrowser() {
    if (typeof window === 'undefined')
        return 'nodejs';
    if (typeof navigator != 'undefined' && navigator.product == 'ReactNative')
        return 'react-native';
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('Opera') != -1 || userAgent.indexOf('OPR') != -1)
        return 'opera';
    else if (userAgent.indexOf('Edge') > -1)
        return 'edge';
    else if (userAgent.indexOf('Chrome') > -1)
        return 'chrome';
    else if (userAgent.indexOf('Safari') > -1)
        return 'safari';
    else if (userAgent.indexOf('Firefox') > -1)
        return 'firefox';
    else if (userAgent.indexOf('MSIE') > -1)
        return 'ie';
    return 'unknown';
}
exports.getBrowser = getBrowser;
function getBrowserOS() {
    const os = getOS();
    const browser = getBrowser();
    return os + '-' + browser;
}
exports.getBrowserOS = getBrowserOS;
// --- Wisp-specific helpers
function unwrapError(error, defaultMessage) {
    if (!error)
        return 'Error';
    if (typeof error == 'string')
        return error;
    if (!defaultMessage)
        defaultMessage = error.message;
    if (error.response) {
        let response = error.response;
        if (response.data)
            logger_1.logger.info(response.data);
        return response.data && response.data.error
            ? response.data.error.message || response.data.error.toString()
            : defaultMessage;
    }
    else {
        return defaultMessage;
    }
}
exports.unwrapError = unwrapError;
const errorHasCode = (error, code) => error && error.response && error.response.status == code;
exports.errorHasCode = errorHasCode;
const shallowCompare = (obj1, obj2) => obj1 && obj2 && Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
exports.shallowCompare = shallowCompare;
const deepCompareIntersection = (obj1, obj2) => obj1 === obj2 || typeof obj1 === typeof obj2 && typeof obj1 === "object" &&
    Object.keys(obj1).every(key => !obj2.hasOwnProperty(key) || exports.deepCompareIntersection(obj1[key], obj2[key]));
exports.deepCompareIntersection = deepCompareIntersection;
const placeholderPromise = (shouldResolve = true, delayMs = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve)
                resolve();
            else
                reject();
        }, delayMs);
    });
};
exports.placeholderPromise = placeholderPromise;
function mapRange(value, in_min, in_max, out_min, out_max) {
    return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
exports.mapRange = mapRange;
function mapSlices(list, chunk, func) {
    const buffer = [];
    for (let i = 0, j = list.length; i < j; i += chunk) {
        let slice = list.slice(i, i + chunk);
        buffer.push(func(slice, i));
    }
    return buffer;
}
exports.mapSlices = mapSlices;
function range(start, end) {
    const r = [];
    for (let i = start; i <= end; i++)
        r.push(i);
    return r;
}
exports.range = range;
function apostrophedString(str) {
    const stringEndsWithS = str.toLowerCase()[str.length - 1] == 's';
    const apostrophedString = stringEndsWithS ? `${str}'` : `${str}'s`;
    return apostrophedString;
}
exports.apostrophedString = apostrophedString;
function objectToGetParams(object) {
    return ('?' +
        Object.keys(object)
            .filter(key => !!object[key])
            .map(key => `${key}=${encodeURIComponent(object[key])}`)
            .join('&'));
}
exports.objectToGetParams = objectToGetParams;
function calculateDragOffset(cursorScreenPosition, windowPosition) {
    const { x, y } = cursorScreenPosition;
    const windowX = windowPosition[0];
    const windowY = windowPosition[1];
    const dragOffsetX = windowX - x;
    const dragOffsetY = windowY - y;
    return [dragOffsetX, dragOffsetY];
}
exports.calculateDragOffset = calculateDragOffset;
function updateWindowPosition(cursorScreenPosition, size, dragOffsetX, dragOffsetY, window) {
    if (!window)
        return;
    const { x, y } = cursorScreenPosition;
    const bounds = {
        width: size[0],
        height: size[1],
        x: dragOffsetX + x,
        y: dragOffsetY + y
    };
    window.setBounds(bounds);
}
exports.updateWindowPosition = updateWindowPosition;
function offlineMessage(offlineTime) {
    const navOffline = navigator.onLine ? 'up' : 'down';
    return ` sock:${Math.round(offlineTime / 1000)}s nav:${navOffline}`;
}
exports.offlineMessage = offlineMessage;
function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
exports.shuffleArray = shuffleArray;
function commaAnd(strings) {
    return strings.slice(0, strings.length - 1).join(", ")
        + (strings.length > 1 ? " and " : "")
        + strings[strings.length - 1];
}
exports.commaAnd = commaAnd;
function timeDuration(time) {
    const groups = time.match(/^(\d+) *(\w+)/);
    if (!groups)
        return null;
    const [_, value, unit] = groups;
    const amount = parseInt(value);
    if (unit.startsWith('m'))
        return amount * 60_000;
    if (unit.startsWith('s'))
        return amount * 1_000;
    if (unit.startsWith('h'))
        return amount * 3600_000;
    return null;
}
exports.timeDuration = timeDuration;
function fileSize(size) {
    if (size < 1024)
        return size + 'b';
    size /= 1024;
    if (size < 1024)
        return Math.round(size) + 'kb';
    size /= 1024;
    if (size < 1024)
        return Math.round(size) + 'Mb';
    size /= 1024;
    return Math.round(size) + 'Gb';
}
exports.fileSize = fileSize;
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};
exports.sleep = sleep;
const nounApostrophe = (noun) => `${noun}${noun[noun.length - 1] == 's' ? `'` : `'s`}`;
exports.nounApostrophe = nounApostrophe;
const pluralizeWithCount = (noun, num) => {
    return num + ' ' + exports.pluralize(noun, num);
};
exports.pluralizeWithCount = pluralizeWithCount;
const pluralize = (noun, num) => {
    return `${noun}${num == 1 ? '' : 's'}`;
};
exports.pluralize = pluralize;
function assertUnreachable(x) {
    throw new Error("Didn't expect to get here");
}
exports.assertUnreachable = assertUnreachable;
function humanizeNumber(value) {
    const absValue = Math.abs(value);
    if (absValue > 1_000_000)
        return Math.round(value * 100 / 1_000_000) / 100 + 'M';
    if (absValue > 1_000)
        return Math.round(value * 100 / 1_000) / 100 + 'k';
    if (absValue > 1)
        return Math.round(value * 100) / 100;
    return Math.round(value * 1000) / 1000;
}
exports.humanizeNumber = humanizeNumber;
function performanceNow() {
    return typeof performance != 'undefined' ? performance.now() : Date.now();
}
exports.performanceNow = performanceNow;
function debugCloneNodeWithAttrs(elem) {
    bfsTraverseElem(elem, (el) => {
        try {
            el.className += ` h_${el.clientHeight}`;
        }
        catch (e) { }
    });
    return elem.cloneNode(true);
}
exports.debugCloneNodeWithAttrs = debugCloneNodeWithAttrs;
function bfsTraverseElem(elem, fn) {
    let queue = [elem];
    while (queue.length) {
        const el = queue.shift();
        fn(el);
        const children = Array.from(el.children);
        if (children.length) {
            queue.push(...children);
        }
    }
}
exports.bfsTraverseElem = bfsTraverseElem;
function getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}
exports.getCircularReplacer = getCircularReplacer;
function renderTimeString(duration) {
    const hrs = Math.floor(duration / 3600_000);
    duration = duration - hrs * 3600_000;
    const mins = Math.floor(duration / 60_000);
    duration = duration - mins * 60_000;
    const secs = Math.floor(duration / 1000);
    const hrsString = hrs > 0 ? hrs.toString() + ':' : '';
    const minString = Math.min(mins, 59).toString().padStart(2, '0');
    const secString = Math.min(secs, 59).toString().padStart(2, '0');
    return `${hrsString}${minString}:${secString}`;
}
exports.renderTimeString = renderTimeString;
//# sourceMappingURL=utils.js.map