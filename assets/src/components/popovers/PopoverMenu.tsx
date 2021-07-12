import React, { PropsWithChildren } from 'react'

import { Theme as ThemeType } from '@gowiki/styles'

import Theme from 'components/global/Theme'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = PropsWithChildren<{
  large?: boolean
  theme?: ThemeType
} & BoxProps>

export default function PopoverMenu(props: Props) {
  const { children, large, p, theme, ...rest } = props

  const padding = p || (large ? m.units.popover.padding.large : m.units.popover.padding.default)

  return (
    <Theme theme={theme || m.themes.whiteBackground}>
      <Wrapper p={padding} {...rest}>
        {children}
      </Wrapper>
    </Theme>
  )
}

const Wrapper = styled(Box)`
  border-radius: 6px;
  background: ${p => p.theme.popoverBackground};
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow:0 10px 15px -3px rgba(0,0,0,.15), 0 4px 6px -2px rgba(0,0,0,.10), 0 4px 80px -8px rgba(0,0,0,.18);

  --popoverPadding: ${p => -p.p}px;
`

export const PopoverDivider = styled(Box).attrs((p: BoxProps) => ({
  minh: 1,
  mt: p.mv || 8,
  mb: p.mv || 8,
  bg: c.ink10,
  mh: 'var(--popoverPadding)',
  ...p
}))<BoxProps>`
&:last-child{ display:none; }
`

PopoverMenu.Divider = PopoverDivider