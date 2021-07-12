export declare const focusOutline: string;
export declare const inputBorderWidth = 2;
export declare const inputBorderUnits: string;
export declare const errorStyle: import("styled-components").FlattenSimpleInterpolation;
export declare const resetTextAttributes: import("styled-components").FlattenSimpleInterpolation;
export declare const globalInputStyles: import("styled-components").FlattenSimpleInterpolation;
export declare type InputProps = {
    hasError?: boolean;
    color?: string;
};
export declare const baseInput: import("styled-components").FlattenSimpleInterpolation;
export declare const inputText: import("styled-components").FlattenInterpolation<import("styled-components").ThemeProps<any>>;
export declare const inputBox: import("styled-components").FlattenInterpolation<import("styled-components").ThemedStyledProps<{
    isActive?: boolean;
    isFocused?: boolean;
}, any>>;
export declare const innerInput: import("styled-components").FlattenInterpolation<import("styled-components").ThemeProps<any>>;
export declare const textarea: import("styled-components").FlattenInterpolation<import("styled-components").ThemeProps<any>>;
export declare const segmentedControlBox: import("styled-components").FlattenInterpolation<import("styled-components").ThemedStyledProps<{
    isActive?: boolean;
    isFocused?: boolean;
}, any>>;
export declare const Form: import("styled-components").StyledComponent<"form", any, {
    center?: boolean;
} & {
    w?: string | number | string[] | number[];
    maxw?: string | number | string[] | number[];
    minw?: string | number | string[] | number[];
    h?: string | number | string[] | number[];
    minh?: string | number | string[] | number[];
    maxh?: string | number | string[] | number[];
    display?: (string | number) & (string | string[]);
    sz?: string | number | string[] | number[];
    verticalAlign?: string | string[];
} & import("../styles-global/src/styledSystems").TypographyProps & {
    m?: string | number | string[] | number[];
    mh?: string | number | string[] | number[];
    mv?: string | number | string[] | number[];
    mt?: string | number | string[] | number[];
    mr?: string | number | string[] | number[];
    mb?: string | number | string[] | number[];
    ml?: string | number | string[] | number[];
    p?: string | number | string[] | number[];
    ph?: string | number | string[] | number[];
    pv?: string | number | string[] | number[];
    pt?: string | number | string[] | number[];
    pr?: string | number | string[] | number[];
    pb?: string | number | string[] | number[];
    pl?: string | number | string[] | number[];
} & {
    border?: string | number | string[] | number[];
    borderTop?: string | number | string[] | number[];
    borderRight?: string | number | string[] | number[];
    borderBottom?: string | number | string[] | number[];
    borderLeft?: string | number | string[] | number[];
    borderWidth?: string | number | string[] | number[];
    borderStyle?: string | number | string[] | number[];
    borderColor?: string;
    borderRadius?: string | number | string[] | number[];
} & {
    bg?: string;
    color?: string;
    background?: string | string[];
    bs?: string | string[];
    br?: string | number | string[] | number[];
    opacity?: string | number | string[] | number[];
    op?: string | number | string[] | number[];
    overflow?: "hidden" | "visible" | "scroll" | "auto";
    boxShadow?: string | string[];
    backgroundImage?: string | string[];
    backgroundSize?: string | string[];
    backgroundPosition?: string | string[];
    backgroundRepeat?: string | string[];
    anchor?: boolean;
} & {
    pos?: string | string[];
    zi?: number | number[];
    top?: string | number | string[] | number[];
    right?: string | number | string[] | number[];
    bottom?: string | number | string[] | number[];
    left?: string | number | string[] | number[];
} & {
    order?: (string | number) & (number | number[]);
    flexWrap?: string | string[];
    flexShrink?: (string | string[]) | (number | number[]);
    flexBasis?: string | string[];
    flexDirection?: string | string[];
    alignSelf?: string | string[];
} & import("../styles-global/src/types").QuickTypographyProps & import("../styles-global/src/types").QuickFlexProps & import("../styles-global/src/types").QuickPositionProps & import("../styles-global/src/types").MediaProps, never>;