import * as React from 'react'

import styled, { ThemeProvider } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

import Appear from 'components/animation/Appear'

type Props = {
  children: any
  id?: string
  appear?: boolean
  position?: 'left' | 'center' | 'right'
  bottom?: number
} & BoxProps

const BottomFloatingModal: React.SFC<Props> = (props: Props) => {
  const { children, id, appear, position, bottom, ...rest } = props

  const content = (
    <ThemeProvider theme={m.themes.darkBackground}>
      <Inner id={id} hCenter vCenter p={8} bg={c.black} br={12} {...rest}>
        {children}
      </Inner>
    </ThemeProvider>
  )
  const alignItems = position == 'left' ? 'flex-start' : position == 'right' ? 'flex-end' : position
  return (
    <Wrapper asc pabs style={{ alignItems, bottom: bottom }}>
      {appear !== undefined && appear !== null ? (
        <Appear on={appear} fadeIn moveIn pabs>
          {content}
        </Appear>
      ) : (
        content
      )}
    </Wrapper>
  )
}

BottomFloatingModal.defaultProps = {
  position: 'center',
  bottom: 40
}

export default BottomFloatingModal

const Wrapper = styled(Column)`
  width: 100%;
  padding: 0 ${m.units.sidebar.padding}px;
  left: 0;
  right: 0;
  z-index: ${m.zIndex.bottomModal};
  pointer-events: none;
  > * {
    pointer-events: all;
  }
`
const Inner = styled(Box)`
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
`
