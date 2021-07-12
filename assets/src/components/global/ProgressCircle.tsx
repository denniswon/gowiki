import { shade, tint } from 'polished'
import * as React from 'react'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  size: number
  strokeWidth: number

  animate: boolean // used for reset
  reverse: boolean
  duration: number
  repeat: boolean

  color: string
}

export default function ProgressCircle(props: Props) {
  const trueRadius = Math.round(props.size / 2)
  const radius = trueRadius - props.strokeWidth
  const circumference = Math.round(2 * 3.14 * radius)
  return (
    <svg style={{flexShrink: 0}} height={props.size} width={props.size}>
      <Circle cx={trueRadius} cy={trueRadius} r={radius} circumference={circumference} {...props} />
    </svg>
  )
}

ProgressCircle.defaultProps = {
  size: 20,
  strokeWidth: 2,

  animate: true,
  duration: 1000,
  reverse: false,
  repeat: true,

  color: c.brand,
}

const Circle = styled("circle")<{
    circumference?: number, reverse?: boolean, animate?: boolean, duration?: number, repeat?: boolean
  }>`
  fill: transparent;
  stroke: ${c => c.color};
  stroke-width: ${c => c.strokeWidth};
  stroke-dasharray: ${c => c.circumference};
  stroke-dashoffset: ${c => c.reverse ? 0 : c.circumference};
  animation: ${c => c.animate ? `rotate ${c.duration}ms linear ${c.repeat ? 'infinite' : ''}` : 'none'};
  animation-fill-mode: forwards;

  @keyframes rotate {
    to {
      stroke-dashoffset: ${c => c.reverse ? c.circumference : 0};
    }
  }
`
