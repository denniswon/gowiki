import * as React from 'react';
import { BoxProps } from '@gowiki/styles';
export declare type Props = {
    size?: number;
    thickness?: number;
    speed?: number;
    bg?: string;
    color?: string;
    fast?: boolean;
    slow?: boolean;
} & BoxProps;
export declare const Loader: React.SFC<Props>;
