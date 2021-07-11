import { Box, BoxProps, Column, Row, s } from '@gowiki/styles-global'

import styled, { css } from 'styled-components'

import c from './colors'

export const Img = styled.img<BoxProps & { withShadow?: boolean; withStroke?: boolean }>` ${s.boxProps}
  ${p => p.withShadow && ` box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); `}
  ${p => p.withStroke && ` border: 1px solid ${c.black20}; `}
`
export const ImgFrame = styled(Box)`
  background: black;
`
ImgFrame.defaultProps = { p: 20, br: 12, center: true }

export const Video = styled.video<BoxProps>`
  ${s.boxProps}
`
export const Divider = styled(Box).attrs((p: BoxProps & { theme }) => ({
  minh: 1,
  mt: p.mv || 8,
  mb: p.mv || 8,
  mh: -4,
  bg: p.bg || p.theme.ink10,
  ...p
}))<BoxProps>``