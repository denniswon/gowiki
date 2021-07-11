import * as React from 'react'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = BoxProps
const OrLine = (p: Props) => (
  <Row vCenter mv={20} {...p}>
    <m.Divider flex1 />
    <m.T14 w={20} mh={12} semi color={c.black50}>
      OR
    </m.T14>
    <m.Divider flex1 />
  </Row>
)

export default OrLine
