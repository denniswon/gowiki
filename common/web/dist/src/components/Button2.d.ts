import React, { PropsWithChildren } from 'react';
import { BoxProps } from '@gowiki/styles';
declare type ButtonProps = PropsWithChildren<{
    bg?: string;
    hoverBg?: string;
    activeBg?: string;
    color?: string;
    hoverColor?: string;
    activeColor?: string;
    borderColor?: string;
    hoverBorderColor?: string;
    disabled?: boolean;
    small?: boolean;
    big?: boolean;
} & ButtonContentProps & BoxProps>;
declare type ButtonContentProps = PropsWithChildren<{
    icon?: string;
    iconSize?: number;
    rightIcon?: string;
    iconOp?: number;
} & BoxProps & React.HTMLAttributes<HTMLButtonElement>>;
export declare const Button2: {
    (p: ButtonProps): JSX.Element;
    Secondary: (p: ButtonProps) => JSX.Element;
    Green: (p: ButtonProps) => JSX.Element;
    Red: (p: ButtonProps) => JSX.Element;
};
export {};
