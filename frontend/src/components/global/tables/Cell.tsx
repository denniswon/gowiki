import * as React from 'react'

import { Box, BoxProps, c, Column, m, Row, s } from 'styles'
import styled from 'styled-components'

type Props = {
  left?: boolean
  center?: boolean
  right?: boolean
  children?: any
  onClick?: () => void
} & BoxProps

const Cell = (props: Props) => {
  const { left, right, center, children, ...rest } = props

  return (
    <Row jcfs={left} hCenter={center} jcfe={right} flex={1} {...rest}>
      {children}
    </Row>
  )
}

export default Cell
