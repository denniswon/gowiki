// TODO improve component props -> Look at https://github.com/react-component/switch/blob/master/src/Switch.jsx
import { transparentize } from 'polished'
import * as React from 'react'

import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

import styled from 'styled-components'
import { Circle } from '../primitives/Circle'

type Props = {
  on: boolean
  size?: number
  semiActive?: boolean
  inactiveColor?: string
  activeColor?: string
  onMouseDown?: React.MouseEventHandler
  onMouseUp?: React.MouseEventHandler
  onClick?: React.MouseEventHandler
  style?: any
} & BoxProps


export const Switch: React.SFC<Props> = (props: Props) => {
  const { on, size = 20, semiActive, ...rest } = props

  return (
    <Wrapper vCenter as="button" active={on} aic w={size * 2} minw={size * 2} h={size+2} {...rest}>
      <StyledCircle className='circle' size={size-4} bg="green" active={on} semiActive={semiActive} />
    </Wrapper>
  )
}

export const RefSwitch = React.forwardRef((props: any, ref) => <Switch innerRef={ref} {...props} />)

const Wrapper = styled(Row) <{ active?: boolean, activeColor?: string }>`
  border-radius: 100px;
  transition: 200ms;
  cursor: pointer;
  background: ${p => p.theme.ink15 || c.black15};
  &:hover {
    background: ${p => p.theme.ink20 || c.black20};
  }
  ${p => p.active && `
    background:${p.activeColor || c.brand};
    &:hover{ background:${transparentize(0.2, c.brand)}; }
  `}
  &:focus {
    box-shadow: 0 0 0 4px ${p => transparentize(0.8, c.brand)};
  }
  ${p => !p.active && `
    &:focus{ background:${p.theme.ink15 || c.black15}; }
    &:hover{
      .circle{ background: ${p.theme.ink || c.black} !important; }
    }
  `}
`
const StyledCircle = styled(Circle) <{ active: boolean; semiActive: boolean }>`
  transition: 200ms;
  background: ${p => p.theme.ink70 || c.black70};
  transform: translateX(3px); transition:100ms;
  ${p => p.semiActive && `
      transform: translateX(8px); transition:100ms;
      background:${c.white};
    `}
  ${p => p.active && !p.semiActive && `
      transform: translateX(${p.size+5}px); transition:200ms;
      background:${c.white};
    `}
`