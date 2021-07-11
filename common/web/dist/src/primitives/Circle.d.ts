import { BoxProps } from '@gowiki/styles-global';
declare type BoxPropsWithoutDimensions = Pick<BoxProps, Exclude<keyof BoxProps, 'w' | 'h' | 'minw' | 'minh'>>;
export declare const Circle: import("styled-components").StyledComponent<"div", any, {
    size?: number;
} & BoxPropsWithoutDimensions, never>;
export declare const Ring: import("styled-components").StyledComponent<"div", any, {
    size?: number;
} & BoxPropsWithoutDimensions, never>;
export {};
