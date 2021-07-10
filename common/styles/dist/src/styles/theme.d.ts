declare type ThemeColors = {
    background: string;
    detailsBackground: string;
    ink: string;
    detailsInk: string;
    highlight: string;
    highlightText: string;
    bgIdle?: string;
    bgHover?: string;
    bgPressing?: string;
};
export declare function makeTheme(name: string, themeColors: ThemeColors): {
    colors: {
        tooltipBackground: string;
        popoverBackground: string;
        bgIdle: string;
        bgHover: string;
        bgPressing: string;
        highlight: string;
        highlightHover: string;
        highlightPressing: string;
        highlightText: string;
        isDark: boolean;
        background: string;
        detailsBackground: string;
    };
    detailsTheme: {
        colors: {
            bgIdle: string;
            bgHover: string;
            bgPressing: string;
            highlightHover: string;
            highlightPressing: string;
            background: string;
            tooltipBackground: string;
            popoverBackground: string;
            highlight: string;
            highlightText: string;
            isDark: boolean;
            detailsBackground: string;
        };
        bgIdle: string;
        bgHover: string;
        bgPressing: string;
        highlightHover: string;
        highlightPressing: string;
        background: string;
        tooltipBackground: string;
        popoverBackground: string;
        highlight: string;
        highlightText: string;
        isDark: boolean;
        detailsBackground: string;
    };
    tooltipBackground: string;
    popoverBackground: string;
    bgIdle: string;
    bgHover: string;
    bgPressing: string;
    highlight: string;
    highlightHover: string;
    highlightPressing: string;
    highlightText: string;
    isDark: boolean;
    background: string;
    detailsBackground: string;
    name: string;
};
export declare type Theme = Partial<ThemeColors> & {
    name: string;
    isDark: boolean;
    highlightHover: string;
    highlightPressing: string;
    tooltipBackground: string;
    popoverBackground: string;
    colors: Partial<ThemeColors>;
    detailsTheme: Partial<ThemeColors> & {
        colors: Partial<ThemeColors>;
    };
} & Partial<InkScale>;
export declare function themeArrayToObject(arr: string[]): {
    background: string;
    detailsBackground: string;
    ink: string;
    detailsInk: string;
    highlight: string;
    highlightText: string;
};
declare type InkScale = {
    ink95: string;
    ink90: string;
    ink85: string;
    ink80: string;
    ink75: string;
    ink70: string;
    ink65: string;
    ink60: string;
    ink55: string;
    ink50: string;
    ink45: string;
    ink40: string;
    ink35: string;
    ink30: string;
    ink25: string;
    ink20: string;
    ink15: string;
    ink10: string;
    ink05: string;
};
export declare function colorVariablesScale(color: string, name: string, increment?: number): {};
export declare function modifyColor(base: string, extra: {
    h?: number;
    s?: number;
    l?: number;
}): string;
export declare function getPropColor(key: string, props: any): any;
export {};
