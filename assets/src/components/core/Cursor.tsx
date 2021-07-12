import { stripUnit } from 'polished'
import * as React from 'react'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  color: string
  bg?: string
} & BoxProps

// tslint:disable:max-line-length

const Cursor: React.SFC<Props> = (props: Props) => {
  const { color, bg = 'none' } = props

  return (
    <svg width="18" height="20" viewBox="0 0 18 20" fill={bg} xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.2691 10.9403L5.01616 19.5199L0.656433 0.254211L17.2691 10.9403ZM6.30931 16.1729L13.6817 11.0107L3.68616 4.58111L6.30931 16.1729Z"
        fill={color}
      />
    </svg>
  )
}

export default Cursor
