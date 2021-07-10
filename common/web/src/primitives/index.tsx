import { BoxProps, s } from '@gowiki/styles-global'

import styled from 'styled-components'

export * from './Circle'
export * from './Triangle'
export * from './InputPrimitive'
export * from './PressablePrimitive'

export const Svg = styled.svg<BoxProps>`
  ${s.boxProps}
`