import * as React from 'react'

import styled, { keyframes } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

export type SoundWaveMode = "on" | "unanswered" | "off"

type Props = {
  mode: SoundWaveMode
  color?: string
  size?: number
} & BoxProps

const baseHeight = 2

const SoundWaveIcon: React.FunctionComponent<Props> = (props: Props) => {
  const { mode, color, size = 12, ...rest } = props

  return (
    <Wrapper sz={size} center color={color || c.white} {...rest} className={mode}>
      <Wave />
      <Wave />
      <Wave />
    </Wrapper>
  )
}

export default SoundWaveIcon

const scaleAnimation = keyframes` 0%, 100% { transform: scale(1, 2); } 50% { transform: scale(1, 7); }`
const fadeAnimation = keyframes` 0% { opacity: 0; } 10% { opacity: 1; } 100% { opacity: 0; }`

const Wrapper = styled(Row)`
  &.on div {
    animation: ${scaleAnimation} 0.5s linear infinite;
    &:nth-child(2) {
      animation-delay: 0.25s;
    }
  }

  &.unanswered div {
    opacity: 0;
    animation: ${fadeAnimation} 1.8s linear infinite;
    &:nth-child(2) {
      animation-delay: 0.3s;
    }
    &:nth-child(3) {
      animation-delay: 0.6s;
    }
  }
`
const Wave = styled.div`
  width: 2px;
  height: ${baseHeight}px;
  background: currentColor;
  margin-right: 2px;
  &:last-child {
    margin-right: 0;
  }
`
