import { BoxProps } from '@gowiki/styles-global';
export declare type PressableProps = {
    bg?: string;
    color?: string;
    hoverColor?: string;
    hoverOp?: number;
    activeOp?: number;
    hoverBg?: string;
    activeColor?: string;
    activeBg?: string;
    isActive?: boolean;
    iconOp?: number;
    hoverIconOp?: number;
    activeIconOp?: number;
    disabled?: boolean;
    selectable?: boolean;
    onClick?: (e: MouseEvent) => void;
} & BoxProps;
export declare const RootPressable: import("styled-components").StyledComponent<"div", any, {
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
    flexShrink?: string | number | string[] | number[];
    flexBasis?: string | string[];
    flexDirection?: string | string[];
    alignSelf?: string | string[];
} & import("../styles-global/src/types").QuickTypographyProps & import("../styles-global/src/types").QuickFlexProps & import("../styles-global/src/types").QuickPositionProps & import("../styles-global/src/types").MediaProps & {
    selectable?: boolean;
    iconOp?: number;
    disabled?: boolean;
    hoverOp?: number;
    isActive?: boolean;
}, never>;
export declare type PressableTheme = {
    color?: string;
    hoverColor?: string;
    activeColor?: string;
    bg: string;
    hoverBg: string;
    activeBg: string;
};
export declare const PressableOnBlack: import("styled-components").StyledComponent<"div", any, {
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
    flexShrink?: string | number | string[] | number[];
    flexBasis?: string | string[];
    flexDirection?: string | string[];
    alignSelf?: string | string[];
} & import("../styles-global/src/types").QuickTypographyProps & import("../styles-global/src/types").QuickFlexProps & import("../styles-global/src/types").QuickPositionProps & import("../styles-global/src/types").MediaProps & {
    selectable?: boolean;
    iconOp?: number;
    disabled?: boolean;
    hoverOp?: number;
    isActive?: boolean;
}, never>;
export declare const PressableOnWhite: import("styled-components").StyledComponent<"div", any, {
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
    flexShrink?: string | number | string[] | number[];
    flexBasis?: string | string[];
    flexDirection?: string | string[];
    alignSelf?: string | string[];
} & import("../styles-global/src/types").QuickTypographyProps & import("../styles-global/src/types").QuickFlexProps & import("../styles-global/src/types").QuickPositionProps & import("../styles-global/src/types").MediaProps & {
    selectable?: boolean;
    iconOp?: number;
    disabled?: boolean;
    hoverOp?: number;
    isActive?: boolean;
}, never>;
export declare const PressableBlue: import("styled-components").StyledComponent<"div", any, {
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
    flexShrink?: string | number | string[] | number[];
    flexBasis?: string | string[];
    flexDirection?: string | string[];
    alignSelf?: string | string[];
} & import("../styles-global/src/types").QuickTypographyProps & import("../styles-global/src/types").QuickFlexProps & import("../styles-global/src/types").QuickPositionProps & import("../styles-global/src/types").MediaProps & {
    selectable?: boolean;
    iconOp?: number;
    disabled?: boolean;
    hoverOp?: number;
    isActive?: boolean;
}, never>;
export declare const Pressable: import("styled-components").StyledComponent<"div", any, {
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
    flexShrink?: string | number | string[] | number[];
    flexBasis?: string | string[];
    flexDirection?: string | string[];
    alignSelf?: string | string[];
} & import("../styles-global/src/types").QuickTypographyProps & import("../styles-global/src/types").QuickFlexProps & import("../styles-global/src/types").QuickPositionProps & import("../styles-global/src/types").MediaProps & {
    selectable?: boolean;
    iconOp?: number;
    disabled?: boolean;
    hoverOp?: number;
    isActive?: boolean;
}, never>;