export declare type Mutable<T extends object> = {
    -readonly [K in keyof T]: T[K];
};
export declare type FunctionArgs<T> = T extends (...args: infer U) => any ? U : never;
export declare type FunctionReturnType<T> = T extends (...args: any) => infer U ? U : never;
export declare type OverlayingProps = {
    level?: "normal" | "floating" | "torn-off-menu" | "modal-panel" | "main-menu" | "status" | "pop-up-menu" | "screen-saver";
    relativeLevel?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    fullscreenable?: boolean;
};
export declare type Display = {
    bounds: Rectangle;
    id: number;
};
export declare type Size = {
    width: number;
    height: number;
};
export declare enum PubSubAction {
    WINDOW_UNLOAD = "unload",
    WINDOW_FOCUS = "focus",
    FIND_IN_PAGE = "find",
    FIND_FOCUS = "find_focus",
    CLEAR_SEARCH = "find_clear",
    SWITCH_TEAM = "switch_team",
    UPDATE_TEAM = "update_team",
    UPDATE_USER = "update_user",
    EXPAND_OR_COLLAPSE = "expand-or-collapse",
    OPENED_URL = "opened-url"
}
export declare type OS = 'windows' | 'mac' | 'linux' | 'android' | 'ios' | 'react-native';
export declare type Platform = 'win-web' | 'lin-web' | 'mac-web' | 'ios-web' | 'andr-web' | 'win-app' | 'mac-app' | 'lin-app' | 'ios-app' | 'andr-app' | 'unknown';
export declare enum AuthIntent {
    LOG_IN_ONLY = 0,
    SIGN_UP_ONLY = 1,
    LOG_IN_OR_SIGN_UP_WITH_INVITE = 2
}
export declare enum OAuthProvider {
    GOOGLE = "google",
    APPLE = "apple"
}
export declare type OAuthPayload = {
    provider: OAuthProvider;
    token: string;
    email: string;
    invite?: string;
    teamname?: string;
};
export declare type UserLite = {
    id: string;
    name: string;
};
export declare type FileInfo = {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    index: number;
};
export declare enum Role {
    ADMIN = "admin",
    MEMBER = "member",
    GUEST = "guest"
}
export declare type OSInfo = {
    arch: string;
    cpus: number;
    cpu: any;
    freemem: number;
    totalmem: number;
    loadavg: number[];
    os: string;
    platform: string;
    uptime: number;
};
export declare type ApiError = {
    error: {
        message: string;
        resend: boolean;
    };
};
export declare enum CommandEventType {
    TRIGGERED = "TRIGGERED",
    ON_WINDOW_BLURRED = "ON_WINDOW_BLURRED",
    ON_ESC_PRESSED = "ON_ESC_PRESSED",
    HIDE = "HIDE",
    SHOW = "SHOW",
    COMMAND_CHOSEN = "COMMAND_CHOSEN",
    ON_CLICK_LOGO = "ON_CLICK_LOGO",
    FULL_HIDE = "FULL_HIDE",
    TOGGLE_WINDOW_PINNING = "TOGGLE_WINDOW_PINNING"
}
export declare type CommandEventData = {
    type: CommandEventType;
    payload?: any;
};
export declare enum SettingsSource {
    SETTINGS_MENU = "settingsMenu"
}
export declare type Rectangle = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare type Point = {
    x: number;
    y: number;
};
export declare type WindowMoveEvent = Rectangle & {
    xDelta: number;
    yDelta: number;
};
export declare type WindowFlags = {
    window: Window;
    alwaysOnTop?: boolean;
    visibleOnAllWorkspaces?: boolean;
    hasShadow?: boolean;
    ignoreMouseEvents?: boolean;
    movable?: boolean;
    resizable?: boolean;
    opacity?: number;
    minWidth?: number;
    minHeight?: number;
    background?: string;
    visible?: boolean;
};
export declare type GoogleResponse = {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    id_token?: string;
    refresh_token?: string;
    code?: string;
};
export declare enum Themes {
    LIGHT = "light",
    DARK = "dark"
}
