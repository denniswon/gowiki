import styled, { css, ThemedCssFunction } from 'styled-components'
import { s } from './global-styles'

import { boxProps, textProps } from './primitive'
import { scale as spaceScale } from './space'
import { defaultBreakpoints, spacing } from './styledSystems'
import * as types from './types'
import { defaultBreakpointsObject } from './utils'

const Root = styled.div``

const size = (size: number) =>
  `width:${size ? size : 24}px; height:${size ? size : 24}px;`

const anim = css`
  transition: 300ms;
  &:hover {
    transition: all 100ms;
  }
`
const unselectable = css`
  user-select: none;
  & * {
    user-select: none;
  }
`
const untouchable = css`
  ${unselectable} pointer-events:none;
  & * {
    pointer-events: none;
  }
`
const actionable = css`
  ${unselectable} cursor:pointer;
`

const sizes = defaultBreakpointsObject

export const media = (Object.keys(sizes) as (keyof typeof sizes)[]).reduce(
  (acc, label) => {
    acc[label] = (first: any, ...interpolations: any[]) => css`
      @media (max-width: ${sizes[label]}) {
        ${css(first, ...interpolations)}
      }
    `

    return acc
  },
  {} as { [key in keyof typeof sizes]: ThemedCssFunction<any> }
)

const mediaQuery = (maxWidth: number) => `@media (max-width: ${maxWidth}px)`

export const Column = styled(Root).attrs({ col: true })<BoxProps>`
  ${boxProps}
`

export const Row = styled(Root).attrs({ row: true })<BoxProps>`
  ${boxProps}
`

export const Box = styled(Root)<BoxProps>`
  ${boxProps}
`

const globalStyles = {
  ...s,

  size,
  anim,
  media,
  unselectable,
  untouchable,
  actionable,

  mediaQuery,

  textProps,
  boxProps,
  spacingProps: spacing,

  breakpoints: defaultBreakpoints,
}

export { globalStyles as s }

// Exported Utils
export { parseUnit } from './utils'

export type BoxProps = types.BoxProps & types.MediaProps

export { spaceScale }

export { boxProps, textProps }