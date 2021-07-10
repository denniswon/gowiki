import { darken, getLuminance, lighten, readableColor, transparentize } from 'polished'
import * as React from 'react'

import { blacken, BoxProps, c, m, s } from 'styles'

import styled, { css } from 'styled-components'

import { Icon } from './Icon'

export type ButtonProps = BoxProps & {
  /** Full Width */
  fw?: boolean
  bg?: string
  color?: string

  hoverBg?: string
  hoverColor?: string

  borderColor?: string
  borderHoverColor?: string

  shadowColor?: string

  iconOp?: number
  iconName?: string
  useRightIcon?: boolean
  iconSize?: number

  disabled?: boolean
  disabledLook?: boolean
  withTextShadow?: boolean
  withBorder?: boolean
  defaultShadow?: boolean

  id?: string
  name?: string
  title?: string
  value?: string
  type?: string

  children?: any
  className?: string
  style?: any

  onClick?: React.MouseEventHandler<any>
  onMouseDown?: React.MouseEventHandler<any>
}

// Butons --------

// TODO @bernatfortet improve button Padding so if there's no pv or ph it will take in a p
export const buttonPadding = css<ButtonProps>`
  padding: ${p => p.pv || 10}px ${p => p.ph || 14}px;
`
export const buttonText = css`
  ${m.t15} ${m.tSemi}
`
export const buttonRounding = 6

export const buttonWithFocus = css`
  &:focus {
    box-shadow: 0 0 0 4px rgba(0, 147, 255, 0.4);
  }
`
export const baseButton = css` ${s.flxRow} ${s.aic} ${s.jcc} ${s.tac} ${buttonPadding} ${s.anchor} ${s.unselectable}
  border:0; border-radius:${buttonRounding}px; outline:0;
  transition:all 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  &:hover{ transition:all 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94) }
`
export const buttonWithTranslation = css`
  transform: translateY(0px);
  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0px);
    transition: transform 0ms linear;
  }
`
export const buttonWithShadow = css<{ defaultShadow?: boolean }>` transition: all 400ms ease;
  ${p =>
    p.defaultShadow && `box-shadow: 0 1px 5px 0 ${c.black10}, 0 3px 16px 0 ${c.black10}; transition: all 150ms ease;`}
  box-shadow: 0 1px 5px 0 ${c.black10}, 0 3px 16px 0 ${c.black10}; transition: all 150ms ease;
  &:hover{ box-shadow: 0 1px 5px 0 ${c.black10}, 0 3px 16px 0 ${c.black10}; transition: all 150ms ease; }
  &:active{ box-shadow: 0 1px 1px 0 ${c.black10}; transition:box-shadow 0ms linear; }
`
export const buttonWithBackgroundShadow = css<ButtonProps>`
  ${p =>
    p.defaultShadow && `box-shadow: 0 3px 6px 0 ${c.black10}, 0 3px 16px 0 ${c.black05}; transition: all 150ms ease;`}

  &:hover {
    box-shadow: 0 3px 7px 0px ${p => p.shadowColor || transparentize(0.75, p.hoverBg || p.bg || c.black10)},
      0 5px 24px 1px ${p => p.shadowColor || transparentize(0.75, p.hoverBg || p.bg || c.black10)};
  }
  &:active {
    box-shadow: 0 1px 1px 1px ${p => p.shadowColor || transparentize(0.5, p.hoverBg || p.bg || c.black10)};
  }
`
export const buttonWithOutline = css<ButtonProps>`
  border: 2px solid ${p => p.borderColor || transparentize(0.5, c.black30)};
  &:hover {
    border-color: ${p => (p.borderHoverColor || p.borderColor ? blacken(0.3, p.borderColor) : c.black60)};
  }
`
export const buttonWithColoredBackground = css<ButtonProps>`
  color: ${p => p.color || c.white};
  &:hover {
    background: ${p => p.hoverBg || (p.bg ? lighten(0.05, p.bg) : c.white90)};
  }
  &:active {
    background: ${p => p.hoverBg || (p.bg ? lighten(0.1, p.bg) : c.white40)};
  }
`

export const button = css<{ borderColor?: string }>`
  ${baseButton} ${buttonWithFocus} ${buttonWithTranslation} ${buttonWithBackgroundShadow} ${buttonWithColoredBackground}
  ${p => p.borderColor && buttonWithOutline}
`
export const ButtonInput = styled.input`
  ${button} ${s.spacingProps as any}
`

export const Button: React.SFC<ButtonProps> = (props: ButtonProps) => {
  const { iconName, useRightIcon, children, iconOp, iconSize = 20, fw = false, type, ...rest } = props
  let typeValue = undefined
  switch (type) {
    case 'button':
    case 'reset':
    case 'submit':
      typeValue = type
      break
    default:
      break
  }
  return (
    <StyledButton fw={fw} type={typeValue} {...rest}>
      {iconName && !useRightIcon && <Icon name={iconName} mr={8} size={iconSize} op={iconOp || 0.6} />}
      {children}
      {iconName && useRightIcon && <Icon name={iconName} ml={8} size={iconSize} op={iconOp || 0.6} />}
    </StyledButton>
  )
}

export const PrimaryButton = (p: ButtonProps) => <Button bg={c.brand} color={c.white} {...p} />
export const TertiaryButton = (p: ButtonProps) => <Button bg={c.getOpaqueOnWhite(c.black, 10)} color={c.ink} {...p} />
export const BlueButton = (p: ButtonProps) => <Button bg={c.brand} color={c.white} {...p} />
export const GreenButton = (p: ButtonProps) => <Button bg={c.getGreen(20)} color={c.green} {...p} />
export const GreyButton = (p: ButtonProps) => <Button bg={c.black10} color={c.black} hoverBg={c.black20} {...p} />
export const RedButton = (p: ButtonProps) => <Button bg={c.red} color={c.white} {...p} />

export const SecondaryButton = (p: ButtonProps) => (
  <Button
    borderColor={c.black20}
    borderHoverColor={c.transparent}
    bg={c.white}
    color={c.black}
    shadowColor={c.black10}
    {...p}
  />
)

export const SecondaryRedButton = (p: ButtonProps) => (
  <Button bg={c.getColor(c.red, 15)} color={c.red} hoverColor={darken(0.2, c.red)} {...p} />
)

Button.defaultProps = {
  bg: c.black,
  color: c.white
}

// TODO: Currently, the bg color for the disabled state is not in sync with our color scale
// Context: https://github.com/cryptagon/teamtalk/pull/1825#discussion_r499022507
const StyledButton = styled.button<ButtonProps>`
  ${s.boxProps}
  color:${p => p.color || c.black90}; ${buttonText}
  &:hover{ color:${p => p.hoverColor || p.color}; }
  -webkit-app-region: no-drag;

  ${p => p.fw && `width:100%;`}
  ${p => !p.disabled && button}
  ${p => p.withTextShadow && `text-shadow:0 0 2px rgba(0,0,0,0.2);`}
  ${p =>
    (p.disabledLook || p.disabled) &&
    css`
      ${disabledButton} cursor:default;
      transform: none !important;
    `}
  ${p => p.disabled && disabledButton}
`

const disabledButton = css<{ bgHover?: string, bg?: string }>` ${baseButton}
  background-color:${p => p.bg || p.theme.ink80}  !important;
  cursor:not-allowed; box-shadow:none !important; border:0 !important;
  text-shadow:none;
  &:hover{ background-color:${p => p.bgHover || p.bg || p.theme.disabledBackground} !important; }
`
