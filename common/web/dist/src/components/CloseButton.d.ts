import * as React from 'react';
import { BoxProps } from '@gowiki/styles';
import { PressableProps } from '../primitives';
declare type Props = {
    onClick: () => void;
    color?: string;
    size?: number;
} & BoxProps & PressableProps;
export declare const CloseButton: React.SFC<Props>;
export {};
