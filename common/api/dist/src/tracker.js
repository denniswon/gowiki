"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tracker = exports.TrackerListener = exports.EventType = void 0;
const core_1 = require("@gowiki/core");
const api_1 = require("./api");
var EventType;
(function (EventType) {
    EventType["SCREEN_VIEW"] = "screen";
    EventType["ACTION"] = "action";
    EventType["AUTO"] = "auto";
})(EventType = exports.EventType || (exports.EventType = {}));
class TrackerListener {
    pageView(pageName, value1, source) { }
    event(category, action, value1, value2, value3, source) { }
    updateMetadata(user, team, version) { }
    handledError(e) { }
    // events that are not logged by our system but consumed by listeners
    thirdPartyEvent(action, value1, value2, value3) { }
}
exports.TrackerListener = TrackerListener;
const LS_SESSION_ID = 'session_id';
const hash = core_1.config.hash;
const browserOS = core_1.getBrowserOS();
const userAgent = navigator.userAgent
    ? navigator.userAgent
        .replace('Mozilla/5.0 ', '')
        .replace('(KHTML, like Gecko) ', '')
        .replace('Macintosh; ', '')
        .substr(0, 100) : '';
class Tracker {
    currentScreen;
    currentParam;
    sessionId;
    user;
    team;
    callId;
    listeners = [];
    eventsQueue = new core_1.EventsQueue(e => {
        if (IS_TEST)
            return Promise.resolve();
        return api_1.API.logEvents(e);
    });
    os = browserOS;
    appVersion = window.appVersion;
    version = `${core_1.config.appVersion}-${core_1.config.hash}`;
    // --- initialize
    addListener(t) {
        if (!this.listeners.find(l => l != t)) {
            this.listeners.push(t);
            t.updateMetadata(this.user, this.team, this.version);
        }
    }
    // --- analytics functions
    getSessionId() {
        if (!this.sessionId) {
            this.sessionId = localStorage.getItem(LS_SESSION_ID) ||
                Math.random()
                    .toString(36)
                    .substring(2, 15) +
                    Math.random()
                        .toString(36)
                        .substring(2, 15);
            localStorage.setItem(LS_SESSION_ID, this.sessionId);
        }
        return this.sessionId;
    }
    logEvent(type, name, source, value1, value2, value3, meta, targetUserId, targetUsername) {
        this.eventsQueue.push(new api_1.APIEvent(Date.now(), this.user?.id, this.user?.name, this.team?.id, this.team?.name, targetUserId, targetUsername, this.getSessionId(), type, name, source, value1, value2, value3, meta, this.os, this.appVersion, hash, userAgent, core_1.config.env));
    }
    pageView(pageName, value1, value2, value3, meta, source) {
        if (pageName == this.currentScreen && this.currentParam == value1)
            return;
        source = source || this.currentScreen;
        const logData = { value1, value2, value3, meta, source };
        Object.keys(logData).forEach(key => logData[key] === undefined && delete logData[key]);
        core_1.logger.info(`PAGEVIEW ——`, pageName, logData);
        if (!pageName) {
            return;
        }
        this.listeners.forEach(l => l.pageView(pageName, value1, source));
        if (pageName != 'landing')
            this.logEvent(EventType.SCREEN_VIEW, pageName, this.currentScreen, value1, value2, value3, meta);
        this.setCurrentScreen(pageName, value1);
    }
    event(category, action, value1, value2, value3, meta, source, targetUserId, targetUsername, skipListeners) {
        source = source || this.currentScreen;
        const logData = { source, category, value1, value2, value3, meta, targetUserId, targetUsername };
        Object.keys(logData).forEach(key => logData[key] === undefined && delete logData[key]);
        core_1.logger.info(`EVENT ——`, action, logData);
        if (!action)
            return;
        this.logEvent(category, action, source, value1, value2, value3, meta, targetUserId, targetUsername);
        if (!skipListeners)
            this.listeners.forEach(l => l.event(category, action, value1, value2, value3, source));
    }
    thirdPartyEvent(action, value1, value2, value3) {
        this.listeners.forEach(l => l.thirdPartyEvent(action, value1, value2, value3));
    }
    setCurrentScreen(screen, param) {
        this.currentScreen = screen;
        this.currentParam = param;
    }
    onChangeUser(newUser) {
        this.user = newUser;
        this.listeners.forEach(l => l.updateMetadata(this.user, this.team, this.version));
    }
    onChangeTeam(newTeam) {
        this.team = newTeam;
        this.listeners.forEach(l => l.updateMetadata(this.user, this.team, this.version));
    }
    getUserAndTeam() {
        return [this.user, this.team];
    }
    updateCallId(newCallId) {
        this.callId = newCallId;
    }
    flush() {
        this.eventsQueue.flush();
    }
    // --- error handling
    handledError(e) {
        this.listeners.forEach(l => l.handledError(e));
    }
}
exports.tracker = new Tracker();
//# sourceMappingURL=tracker.js.map