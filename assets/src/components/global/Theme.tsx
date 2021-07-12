import React from 'react'

import styled, { ThemeProvider, ThemeProviderProps } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  theme?: any
  children: any
  light?: boolean
  dark?: boolean
  size?: number
  style?: React.CSSProperties
  innerRef?: any
} & BoxProps

const Theme: React.SFC<Props> = (props: Props) => {
  const { light, dark, children, innerRef, ...rest } = props
  const theme = props.theme ? props.theme : light ? m.themes.whiteBackground : m.themes.darkBackground

  return (
    <ThemeProvider theme={theme}>
      <Box color={theme.ink} {...rest} ref={innerRef}>
        {children}
      </Box>
    </ThemeProvider>
  )
}

export default Theme
