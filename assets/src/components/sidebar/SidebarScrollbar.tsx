import React from 'react'

import styled, { css } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  mb?: number
  children: any
  className?: string
} & BoxProps

const scrollbarWidth = 7

const SidebarScrollbar = (props: Props) => {
  const { children, ...rest } = props

  return (
    <StyledScrollbars column flex1 pb={32} mr={-scrollbarWidth} {...rest}>
      {children}
    </StyledScrollbars>
  )
}
export default SidebarScrollbar

const lightScroll = 'rgba(255, 255, 255, .5)'
const darkScroll = 'rgba(0, 0, 0, .5)'

// Fading scrollbar adapted from https://stackoverflow.com/a/57483486
const StyledScrollbars = styled(Box)`
  overflow-y: scroll !important;
  overflow-anchor: visible !important;


  border-color: transparent;
  /* fade out animation */
  transition: border-color 250ms ease-out;
  transition-delay: 1000ms;

  body:hover & {
    /* fade in animation */
    transition: border-color 25ms linear;
    /* disable flicker when electron is unfocused and we mouse-in */
    transition-delay: 20ms;
    border-color: ${p => p.theme.isDark ? lightScroll : darkScroll};
  }

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-corner {
    /* add border to act as background-color */
    border-right-style: inset;
    /* sum viewport dimensions to guarantee border will fill scrollbar */
    border-right-width: calc(100vw + 100vh);
    /* inherit border-color to inherit transitions */
    border-color: inherit;

    width: ${scrollbarWidth}px;
    height: ${scrollbarWidth}px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-corner {
    border-color: transparent;
  }
`