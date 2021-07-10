import { StyledSystemPropsTypes } from './styledSystems';
export interface QuickTypographyProps {
    /** Font Weight: 300 */
    light?: boolean;
    /** Font Weight: 400 */
    regular?: boolean;
    /** Font Weight: 500 */
    medium?: boolean;
    /** Font Weight: 600 */
    semi?: boolean;
    /** Font Weight: 700 */
    bold?: boolean;
    /** Font Weight: 800 */
    extraBold?: boolean;
    /** Font Weight: 900 */
    black?: boolean;
    /** text-align: left */
    tal?: boolean;
    /** text-align: right */
    tar?: boolean;
    /** text-align: center */
    tac?: boolean;
    /** text-transform: uppercase */
    upcase?: boolean;
}
export declare type QuickFlexProps = {
    jcc?: boolean;
    jcsa?: boolean;
    jcsb?: boolean;
    jcfs?: boolean;
    jcfe?: boolean;
    aic?: boolean;
    aifs?: boolean;
    aife?: boolean;
    ass?: boolean;
    asfs?: boolean;
    asfe?: boolean;
    asc?: boolean;
    aib?: boolean;
    jss?: boolean;
    jsfs?: boolean;
    jsfe?: boolean;
    jsc?: boolean;
    row?: boolean;
    column?: boolean;
    col?: boolean;
    vCenter?: boolean;
    hCenter?: boolean;
    center?: boolean;
    flxWrap?: boolean;
    flex?: number | string;
    flex1?: boolean;
    flxOrder?: number;
};
export declare type QuickPositionProps = {
    /** position: absolute */
    pabs?: boolean;
    /** position: relative */
    prel?: boolean;
    /** position: fixed */
    pfix?: boolean;
};
export declare type QuickUtilityProps = {
    /** cursor: pointer */
    pointer?: boolean;
    cursor?: 'default' | 'pointer';
};
declare type QuickPropsTypes = QuickTypographyProps & QuickFlexProps & QuickPositionProps;
export declare type BoxProps = {
    center?: boolean;
} & StyledSystemPropsTypes & QuickPropsTypes;
export declare type GlobalStyles = {
    /** position: absolute; */
    pabs: string;
    /** position: relative; */
    prel: string;
    /** display: flex; */
    flex: string;
    /** flex: 1 1 0%; display:flex; */
    flex1: string;
    /** flex-direction: row; display:flex; */
    flxRow: string;
    /** flex-direction: column; display:flex; */
    flxCol: string;
    /** flex-direction: row-reverse; display:flex; */
    flxRowReverse: string;
    /** flex-direction: column-reverse; display:flex; */
    flxColReverse: string;
    /** */
    flxWrap: string;
    /** align-items: flex-start */
    aifs: string;
    /** align-items: center */
    aic: string;
    /** align-items: stretch */
    ais: string;
    /** align-items: flex-end */
    aife: string;
    /** align-items: baseline */
    aib: string;
    /** justify-content: center  */
    jcc: string;
    /** justify-content: flext-start */
    jcfs: string;
    /** justify-content: flex-end */
    jcfe: string;
    /** justify-content: space-between */
    jcsb: string;
    /** justify-content: space-around */
    jcsa: string;
    asfs: string;
    asfe: string;
    asc: string;
    ass: string;
    jsfs: string;
    jsfe: string;
    jsc: string;
    jss: string;
    if: string;
    tal: string;
    tac: string;
    tar: string;
    ofh: string;
    cover: string;
    contain: string;
    anchor: string;
    /** width:100%; height:100%; left:0; top:0; bottom:0; right:0; */
    full: string;
    /** text-overflow: ellipsis; overflow: hidden; white-space: nowrap; */
    ellipsis: string;
};
export declare type WebGlobalStyles = {
    size: (s: number) => string;
    hideVisually: string;
    actionable: string;
    unselectable?: string;
    untouchable?: string;
    anim?: string;
    mediaDimensions?: {
        sm: number;
        md: number;
        lg: number;
    };
    media?: {
        sm: any;
        md: any;
        lg: any;
        w: any;
    };
};
export declare type MediaProps = {
    smHide?: boolean;
    mdHide?: boolean;
    lgHide?: boolean;
};
export {};
