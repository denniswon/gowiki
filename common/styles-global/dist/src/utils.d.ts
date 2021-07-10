export declare const is: (n: any) => boolean;
export declare const isNum: (n: any) => boolean;
export declare const parseUnit: (n: number | string) => string | number;
export declare const isNegative: (n: number) => boolean;
export declare const createMediaQuery: (n: number | string) => string;
export declare const defaultBreakpointsObject: {
    sm: string;
    md: string;
    lg: string;
};
export declare enum MediaValues {
    base = "base",
    sm = "sm",
    md = "md",
    lg = "lg",
    xlg = "xlg"
}
