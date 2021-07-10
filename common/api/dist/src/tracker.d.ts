import { EventsQueue, Team, User } from '@gowiki/core';
import { APIEvent } from './api';
export declare enum EventType {
    SCREEN_VIEW = "screen",
    ACTION = "action",
    AUTO = "auto"
}
export declare class TrackerListener {
    pageView(pageName: string, value1: string, source: string): void;
    event(category: EventType, action: string, value1: string, value2: string, value3: number, source: string): void;
    updateMetadata(user: User, team: Team, version: string): void;
    handledError(e: Error): void;
    thirdPartyEvent(action: string, value1: string, value2: string, value3: number): void;
}
declare class Tracker {
    currentScreen: string;
    currentParam: string;
    sessionId: string;
    user: User;
    team: Team;
    callId: string;
    listeners: TrackerListener[];
    eventsQueue: EventsQueue<APIEvent>;
    os: string;
    appVersion: string;
    version: string;
    addListener(t: TrackerListener): void;
    getSessionId(): string;
    logEvent(type: string, name: string, source?: string, value1?: string, value2?: string, value3?: number, meta?: any, targetUserId?: string, targetUsername?: string): void;
    pageView(pageName: string, value1?: string, value2?: string, value3?: number, meta?: any, source?: string): void;
    event(category: EventType, action: string, value1?: string, value2?: string, value3?: number, meta?: any, source?: string, targetUserId?: string, targetUsername?: string, skipListeners?: boolean): void;
    thirdPartyEvent(action: string, value1?: string, value2?: string, value3?: number): void;
    setCurrentScreen(screen: string, param: string): void;
    onChangeUser(newUser: User): void;
    onChangeTeam(newTeam: Team): void;
    getUserAndTeam(): (User | Team)[];
    updateCallId(newCallId: string): void;
    flush(): void;
    handledError(e: Error): void;
}
export declare const tracker: Tracker;
export {};
