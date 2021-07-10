export declare type WispColor = {
    bg: string;
    textColor?: string;
    transparent?: string;
};
export declare const COLOR_SCALE_BASE: string[];
export declare const COLOR_SCALE: WispColor[];
export declare function getUniqueColorObjectForId(id?: string): WispColor;
export declare const getHash: (str: string) => number;
