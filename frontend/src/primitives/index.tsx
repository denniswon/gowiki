import { BoxProps, s } from 'styles-global'

import styled from 'styled-components'

import * as Circle from './Circle'
import * as InputPrimitive from './InputPrimitive'
import * as PressablePrimitive from './PressablePrimitive'

const Svg = styled.svg<BoxProps>`
  ${s.boxProps}
`

export const primitives = {
  ...Circle,
  ...InputPrimitive,
  ...PressablePrimitive,
  Svg
}