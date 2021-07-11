import * as React from 'react';
import { BoxProps } from '@gowiki/styles';
declare type Props = {
    on: boolean;
    size?: number;
    semiActive?: boolean;
    inactiveColor?: string;
    activeColor?: string;
    onMouseDown?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;
    onClick?: React.MouseEventHandler;
    style?: any;
} & BoxProps;
export declare const Switch: React.SFC<Props>;
export declare const RefSwitch: React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<unknown>>;
export {};
