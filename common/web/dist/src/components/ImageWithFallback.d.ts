/// <reference types="react" />
import { BoxProps } from '@gowiki/styles';
declare type Props = {
    src: string;
    fallbackSrc?: string;
    type?: string;
} & BoxProps;
/**
 You can pass multiple images files to be more optimal. eg. webp
 Make sure to set the type to the correct file format
 */
export declare function ImageWithFallback(props: Props): JSX.Element;
export {};
