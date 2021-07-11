import { Box, BoxProps } from '@gowiki/styles-global'

import styled from 'styled-components'

interface Props extends BoxProps {
  direction: 'up' | 'right' | 'down' | 'left'
  color: string
  height: number
  width: number
}
export const Triangle = styled(Box).attrs<Props>({  })<Props>` width:0; height:0;
  ${p =>
    p.direction == 'up' &&
    `border:${p.width}px solid transparent; border-bottom:${p.height}px solid ${p.color}; border-top:none;`}
  ${p =>
    p.direction == 'right' &&
    `border:${p.width}px solid transparent; border-left:${p.height}px solid ${p.color}; border-right:none;`}
  ${p =>
    p.direction == 'down' &&
    `border:${p.width}px solid transparent; border-top:${p.height}px solid ${p.color}; border-bottom:none;`}
  ${p =>
    p.direction == 'left' &&
    `border:${p.width}px solid transparent; border-right:${p.height}px solid ${p.color}; border-left:none;`}
`
