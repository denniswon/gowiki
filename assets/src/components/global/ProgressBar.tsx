import { shade, tint } from 'polished'
import * as React from 'react'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  percent: number
  color: string
  borderRadius: number
} & BoxProps

export default function ProgressBar(props: Props) {
  const { percent, color, borderRadius, ...rest } = props

  return (
    <Bar {...rest}>
      <FullPath borderRadius={borderRadius} />
      <Progressed w={`${percent * 100}%`} borderRadius={borderRadius}>
        <Fill color={color} borderRadius={borderRadius} />
      </Progressed>
    </Bar>
  )
}

ProgressBar.defaultProps = {
  percent: 1,
  color: c.brand,
  borderRadius: 4
}

const Bar = styled(Box)`
  width: auto;
  position: relative;
  ${s.jcc} pointer-events:none;
`

const FullPath = styled.div<{ borderRadius?: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: ${p => p.borderRadius}px;
  background: ${p => p.theme.ink10};
`

const Progressed = styled(Box)`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0px;
  transition: 100ms cubic-bezier(0.19, 1, 0.22, 1);
`
const Fill = styled(Box)` position.absolute; width: 100%; height:100%; border-radius:${p =>
  p.borderRadius}px; z-index:2;
      background-color: ${p => p.color};
    `
