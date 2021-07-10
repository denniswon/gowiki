import { darken, transparentize } from 'polished'

import { isMac } from '@gowiki/core'
import { c, getPropColor, themes } from '@gowiki/styles'
import { Box, BoxProps, s } from '@gowiki/styles-global'

import styled, { css } from 'styled-components'

export type PressableProps = {
  bg?: string
  color?: string
  hoverColor?: string
  hoverOp?: string
  activeOp?: string
  hoverBg?: string
  activeColor?: string
  activeBg?: string
  isActive?: boolean
  iconOp?: number
  hoverIconOp?: number
  activeIconOp?: number
  disabled?: boolean
  selectable?: boolean
  onClick?: (e: MouseEvent) => void
} & BoxProps


const activeStyles = css`
  color: ${p => getPropColor('activeColor', p) || getPropColor('hoverColor', p)};
  background: ${p => getPropColor('activeBg', p) || getPropColor('hoverBg', p)};
  opacity: ${p => p.activeOp || p.hoverOp};
  & .icon, svg {
    fill:${p => getPropColor('activeColor', p) || getPropColor('hoverColor', p)};
    opacity:1 !important;
  }
`

export const RootPressable = styled(Box).attrs<PressableProps>(p => ({
  color: p.color,
  bg: p.bg || 'transparent',
  hoverBg: p.hoverBg || c.bgHover || c.black10,
  activeBg: p.activeBg || c.bgPressing || c.black15,

  hoverColor: p.hoverColor || c.ink || c.black,
  activeColor: p.activeColor || c.ink || c.black,

  br: 6,
  p: 4,
  iconOp: 0.6,
  ...p,
  onClick: p.disabled ? undefined : p.onClick,
}))`
  ${p => !p.selectable && s.unselectable} ${s.anchor} ${!isMac && '-webkit-app-region: no-drag;'}
  color: ${p => getPropColor('color', p)};

  & svg {
    ${p => p.color && `fill: ${getPropColor('color', p)};`}
  }

  & .icon {
    opacity: ${p => p.iconOp};
  }

  ${p => p.disabled ? `
    cursor: default;
  ` : `
    &:hover svg {
      ${p.color ? `fill: ${getPropColor('hoverColor', p)};` : ''}
    }
    &:hover {
      & svg,
      & .icon {
        opacity: 1;
      }
    }
    &:hover {
      color: ${getPropColor('hoverColor', p)};
      opacity: ${p.hoverOp};
      background: ${getPropColor('hoverBg', p)};
    }

    &:active svg {
      fill: ${getPropColor('activeColor', p) || getPropColor('hoverColor', p)};
    }
    &:active {
      & svg,
      & .icon {
        opacity: 1;
      }
    }
    &:active { ${activeStyles} }
  `}

  ${p => p.isActive && activeStyles }

  ${p => p.disabled && `
    opacity: 0.3;
  `}
`



export type PressableTheme = {
  color?: string
  hoverColor?: string
  activeColor?: string
  bg: string
  hoverBg: string
  activeBg: string
}

// TODO depracte
const pressableOnBlackTheme: PressableTheme = {
  bg: 'transparent',
  hoverColor: c.white,
  activeColor: c.white,
  hoverBg: themes.darkBackground.bgHover,
  activeBg: themes.darkBackground.bgPressing
}
// TODO depracte
const pressableOnWhiteTheme: PressableTheme = {
  bg: 'transparent',
  hoverBg: themes.whiteBackground.bgHover,
  activeBg: themes.whiteBackground.bgPressing,
}

export const PressableOnBlack = styled(RootPressable).attrs<PressableProps>(p => ({ ...pressableOnBlackTheme, ...p }))``
export const PressableOnWhite = styled(RootPressable).attrs<PressableProps>(p => ({ ...pressableOnWhiteTheme, ...p }))``

export const PressableBlue = styled(RootPressable).attrs<PressableProps>(p => ({
  color: c.brand,
  hoverColor: darken(0.8, c.brand),
  hoverBg: transparentize(0.8, c.brand),
  ...p
}))``

export const Pressable = RootPressable
