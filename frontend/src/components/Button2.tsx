import React, { PropsWithChildren, useContext } from 'react'

import { BoxProps, c, m, s, Theme } from 'styles'

import styled, { css, ThemeContext } from 'styled-components'

import { Icon } from './Icon'

type ButtonProps = PropsWithChildren<{
  bg?: string
  hoverBg?: string
  activeBg?: string

  color?: string
  hoverColor?: string
  activeColor?: string

  borderColor?: string
  hoverBorderColor?: string

  disabled?: boolean

  small?: boolean
  big?: boolean

} & ButtonContentProps & BoxProps>

type ButtonContentProps = PropsWithChildren<{
  icon?: string
  iconSize?: number
  rightIcon?: string
  iconOp?: number
} & BoxProps & React.HTMLAttributes<HTMLButtonElement> >


const ButtonContent = (props: ButtonContentProps ) => {
  const { icon, rightIcon, iconSize, iconOp = 0.6, children } = props

  return <>
    {icon && <Icon name={icon} mr={8} size={iconSize} op={iconOp} />}
    {children}
    {rightIcon && <Icon name={rightIcon} ml={8} size={iconSize} op={iconOp} />}
  </>
}

function BaseButton(props: ButtonProps) {
  const { icon, rightIcon, iconSize, iconOp, children, big, small, ...rest } = props

  const dimensionVariant = big ? 'big' : small ? 'small' : 'default'

  return (
    <ButtonBox dimension={dimensionVariant} {...rest}>
      <ButtonContent icon={icon} rightIcon={rightIcon} iconSize={iconSize} iconOp={iconOp}>
        {typeof children == 'string'
          ? <ButtonText dimension={dimensionVariant}>{children}</ButtonText>
          : children
        }
      </ButtonContent>
    </ButtonBox>
  )
}

export const Button2 = (p: ButtonProps) => {
  const theme = useTheme()

  return <BaseButton
    bg={theme.highlight} hoverBg={theme.highlightHover} activeBg={theme.highlightPressing}
    color={theme.highlightText} {...p}
  />
}

const Secondary = (p: ButtonProps) => {
  const theme = useTheme()
  return <BaseButton
    bg={theme.ink10} hoverBg={theme.ink15} activeBg={theme.ink20}
    color={theme.ink90} hoverColor={theme.ink}
    borderColor={theme.ink05} hoverBorderColor={theme.ink10}
    {...p}
  />
}

const coloredButtons = {
  blue: { bg: c.brand, hoverBg: c.brand, color: c.white },
  green: { bg: c.green, hoverBg: c.green, color: c.white },
  red: { bg: c.red, hoverBg: c.red, color: c.white },
}

const GreenButton = (p: ButtonProps) => <BaseButton {...coloredButtons.green} {...p} />
const RedButton = (p: ButtonProps) => <BaseButton {...coloredButtons.red} {...p} />
const BlueButton = (p: ButtonProps) => <BaseButton {...coloredButtons.blue} {...p} />

Button2.Secondary = Secondary
Button2.Green = GreenButton
Button2.Red = RedButton


const buttonRounding = 6

const outline = css`
  focus::after {
    content: '';
    display: block;
    top:-2px; right:-2px; bottom:-2px; left: -2px;
    position: absolute;
    border-radius:${buttonRounding+2}px;
    box-shadow: 0 0 0 2px rgba(0, 147, 255, 0.6);
  }
`

const clickableButton = css`
  cursor:pointer;
  ${outline}
`

const disabledButton = css`
  cursor:not-allowed;
  pointer-events: none;
  box-shadow:none !important;
  border:0 !important;
  background-color:${p => p.theme.ink10} !important;
  color:${p => p.theme.ink50};
`

const baseBoxShadow = `0px 1px 3px rgb(0 0 0 / 4%)`

const baseButton = css`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-text: center;

  user-select: none;
  -webkit-app-region: no-drag;
  border:0;
  outline:0;
  border-radius: ${buttonRounding}px;
`

const ButtonBox = styled.button<ButtonProps & { dimension?: string }>`
  ${baseButton}
  position: relative;

  ${p => getDimensionVariants(p.dimension)}

  color:${p => p.color || p.theme.ink };
  background:${p => p.bg};

  &:hover{
    ${p => p.hoverColor && `color: ${p.hoverColor};`}
    ${p => p.hoverBg && `background: ${p.hoverBg};`}
  }
  &:active{
    ${p => p.activeColor && `color: ${p.activeColor};`}
    ${p => p.activeBg && `background: ${p.activeBg};`}
  }

  ${p => p.borderColor && `
    box-shadow: ${baseBoxShadow}, inset 0 0 0 1px ${p.borderColor};

    &:hover {
      ${p.hoverBorderColor && `box-shadow: ${baseBoxShadow}, inset 0 0 0 1px ${p.hoverBorderColor};`}
    }
  `}

  ${p => p.disabled ? disabledButton : clickableButton}

  ${s.boxProps}
`

const ButtonText = styled(m.Text)<{ dimension?: string }>`
  ${p => p.dimension == 'small' && m.t14 }
  ${p => p.dimension == 'small' && m.tMedium }
  ${p => p.dimension == 'default' && m.t15 }
  ${p => p.dimension == 'default' && m.tSemi }
`

const getDimensionVariants = (size) => {
  switch (size) {
    case 'small': return css`padding:6px 12px; ${m.t14} ${m.tMedium}`
    case 'big': return css`padding:16px 24px; ${m.t16} ${m.tSemi}`
    default:
    case 'default': return css`padding:12px 20px; ${m.t15} ${m.tSemi} `
  }
}



// Can't import it from assets/utils
const useTheme = () => {
  const themeContext = useContext(ThemeContext as React.Context<Theme>)
  return themeContext
}