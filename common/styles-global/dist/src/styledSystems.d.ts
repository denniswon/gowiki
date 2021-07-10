declare type UnitValue = string | number | string[] | number[];
declare type StringValue = string | string[];
declare type NumberValue = number | number[];
export declare const defaultBreakpoints: string[];
export declare const spacing: (props: any) => any;
declare type SpacingProps = {
    m?: UnitValue;
    mh?: UnitValue;
    mv?: UnitValue;
    mt?: UnitValue;
    mr?: UnitValue;
    mb?: UnitValue;
    ml?: UnitValue;
    p?: UnitValue;
    ph?: UnitValue;
    pv?: UnitValue;
    pt?: UnitValue;
    pr?: UnitValue;
    pb?: UnitValue;
    pl?: UnitValue;
};
export declare const typography: (props: any) => any[];
export declare type TypographyProps = {
    fontSize?: UnitValue;
    fontFamily?: StringValue;
    fontWeight?: NumberValue;
    lineHeight?: StringValue;
    fontStyle?: StringValue;
    letterSpacing?: StringValue;
};
export declare const layout: (props: any) => any[];
declare type LayoutProps = {
    w?: UnitValue;
    maxw?: UnitValue;
    minw?: UnitValue;
    h?: UnitValue;
    minh?: UnitValue;
    maxh?: UnitValue;
    display?: StringValue;
    sz?: UnitValue;
    verticalAlign?: StringValue;
};
declare type FlexProps = {
    order?: NumberValue;
    flexWrap?: StringValue;
    flexShrink?: NumberValue | StringValue;
    flexBasis?: StringValue;
    flexDirection?: StringValue;
    alignSelf?: StringValue;
};
declare type BorderProps = {
    border?: UnitValue;
    borderTop?: UnitValue;
    borderRight?: UnitValue;
    borderBottom?: UnitValue;
    borderLeft?: UnitValue;
    borderWidth?: UnitValue;
    borderStyle?: UnitValue;
    borderColor?: string;
    borderRadius?: UnitValue;
};
declare type AppearanceProps = BorderProps & {
    /** background-color */
    bg?: string;
    /** color */
    color?: string;
    /** background */
    background?: StringValue;
    /** box-sadow */
    bs?: StringValue;
    /** border-radius: 50% | 8 */
    br?: UnitValue;
    /** opacity => Depracted, use op  */
    opacity?: UnitValue;
    /** opacity  */
    op?: UnitValue;
    overflow?: 'hidden' | 'visible' | 'scroll' | 'auto';
    boxShadow?: StringValue;
    backgroundImage?: StringValue;
    backgroundSize?: StringValue;
    backgroundPosition?: StringValue;
    backgroundRepeat?: StringValue;
    anchor?: boolean;
};
declare type PositionProps = {
    /** position */
    pos?: StringValue;
    /** z-index */
    zi?: NumberValue;
    top?: UnitValue;
    right?: UnitValue;
    bottom?: UnitValue;
    left?: UnitValue;
};
export declare const systemBox: (props: any) => any[];
export declare type StyledSystemPropsTypes = LayoutProps & TypographyProps & SpacingProps & AppearanceProps & PositionProps & FlexProps;
export {};
