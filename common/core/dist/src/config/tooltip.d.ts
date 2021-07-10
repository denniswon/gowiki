export declare class TooltipAction {
    label?: string;
    sublabel?: string;
    description?: string;
    icon?: string;
    iconUrl?: string;
    iconColor?: string;
    endIcon?: string;
    command?: string;
    args?: any;
    enabled?: boolean;
    highlight?: boolean;
    compact?: boolean;
    type?: TooltipActionType;
    value?: number;
}
export declare enum TooltipActionType {
    TITLE = 0,
    SEPARATOR = 1,
    SLIDER = 2
}
export declare type TooltipUser = {
    id: string;
    name: string;
    nickname: string;
    profileImg?: string;
    inCall?: boolean;
    agent?: string;
    idleMinutes?: number;
    dnd?: boolean;
    limited?: boolean;
    timezone?: string;
    collapsed?: boolean;
    offline?: boolean;
};
export declare enum TooltipType {
    USER = "user",
    MENU = "menu"
}
export declare enum ToastSubtype {
    WARNING = "warning",
    INFO = "info",
    ONBOARDING = "onbo",
    ERROR = "error"
}
export declare enum ToastPriority {
    HIGH = 3,
    LOW = 1,
    ZERO = 0
}
export declare enum TooltipTheme {
    LIGHT = "light",
    DARK = "dark"
}
export declare class TooltipData {
    type: TooltipType;
    pos: 'h' | 'v';
    orientation?: 'above' | 'below' | 'left' | 'right';
    dims?: {
        width: number;
        height: number;
    };
    subtype?: string;
    target?: {
        width: number;
        height: number;
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    user?: TooltipUser;
    actions?: TooltipAction[];
    message?: string;
    bounds?: any;
    theme?: TooltipTheme;
    title?: string;
}
