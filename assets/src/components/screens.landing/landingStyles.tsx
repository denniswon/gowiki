import React from 'react'

import { css } from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

export const landingMargins = css`
  padding: 0 60px;
  ${s.media.md` padding:0 40px; `}
  ${s.media.sm` padding:0 20px; `}
`


export const Heading = p => <m.T13 bold upcase color={c.brand} mb={14} letterSpacing='0.06em' {...p} />