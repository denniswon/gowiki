import React from 'react'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  size?: number,
  color?: string
} & BoxProps

export default function LayoutIcon(props: Props) {
  const { size = 20, color, ...rest } = props

  return (
    <m.Svg width={size} height={size} viewBox="0 0 24 24" fill={color || c.ink} xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path fillRule="evenodd" clipRule="evenodd" d="M6 5C5.44772 5 5 5.44772 5 6V10C5 10.5523 5.44772 11 6 11H10C10.5523 11 11 10.5523 11 10V6C11 5.44772 10.5523 5 10 5H6ZM14 5C13.4477 5 13 5.44772 13 6V10C13 10.5523 13.4477 11 14 11H18C18.5523 11 19 10.5523 19 10V6C19 5.44772 18.5523 5 18 5H14ZM13 14C13 13.4477 13.4477 13 14 13H18C18.5523 13 19 13.4477 19 14V18C19 18.5523 18.5523 19 18 19H14C13.4477 19 13 18.5523 13 18V14ZM6 13C5.44772 13 5 13.4477 5 14V18C5 18.5523 5.44772 19 6 19H10C10.5523 19 11 18.5523 11 18V14C11 13.4477 10.5523 13 10 13H6Z" />
    </m.Svg>
  )
}
