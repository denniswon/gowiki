import * as React from 'react'
import PerfectScrollbar, { ScrollBarProps } from 'react-perfect-scrollbar'

import 'react-perfect-scrollbar/dist/css/styles.css'

import { isMobile } from '@gowiki/core'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  children: any
  className?: string
  style?: React.CSSProperties
  innerRef?: any
} & BoxProps &
  ScrollBarProps

const Scrollbars: React.SFC<Props> = (props: Props) => {
  const { onScrollY, mb, innerRef, ...rest } = props
  const refProps = innerRef ? { containerRef: innerRef } : {}

  return <StyledPerfectScrollbar {...refProps} {...props} />
}

export default React.forwardRef((props: Props, ref) => <Scrollbars innerRef={ref} {...props} />)

const StyledPerfectScrollbar = styled(PerfectScrollbar)`
  -webkit-overflow-scrolling: touch;
  ${s.boxProps} ${s.flxCol} overflow: hidden;
  .ps__rail-y, ps__rail-x {
    -webkit-app-region: no-drag;
    background: none !important;
  }

  .ps__thumb-x, .ps__thumb-y {
    background-color: ${p => p.theme.ink30} !important;
  }

  .ps__rail-x:hover > .ps__thumb-x,
  .ps__rail-y:hover > .ps__thumb-y,
  .ps__rail-x:focus > .ps__thumb-x,
  .ps__rail-y:focus > .ps__thumb-y,
  .ps__rail-x.ps--clicking .ps__thumb-x,
  .ps__rail-y.ps--clicking .ps__thumb-y {
    background-color: ${p => p.theme.ink45} !important;
  }

`
const StyledMobileScroll = styled(Box)`
  ${s.flxCol}
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`
