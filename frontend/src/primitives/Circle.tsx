import { BoxProps, s } from 'styles-global'

import styled from 'styled-components'

type BoxPropsWithoutDimensions = Pick<BoxProps, Exclude<keyof BoxProps, 'w' | 'h' | 'minw' | 'minh'>>
type Props = {
  size?: number
} & BoxPropsWithoutDimensions

export const Circle = styled.div<Props>`
  ${s.boxProps} box-sizing:border-box;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  min-width: ${p => p.size}px;
  min-height: ${p => p.size}px;
  max-width: ${p => p.size}px;
  max-height: ${p => p.size}px;
  border-radius: ${p => p.size}px;
`
Circle.defaultProps = {
  size: 40,
  center: true
}

export const Ring = styled(Circle)`
  border: 2px solid ${p => p.color};
  padding: 1px;
`