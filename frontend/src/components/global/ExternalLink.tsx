import React, { PropsWithChildren } from 'react'

import appService from 'services/appService'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = PropsWithChildren<{
  href: string
}> &
  BoxProps

const ExternalLink: React.FunctionComponent<Props> = (props: Props) => {
  const { href, children, ...rest } = props

  return (
    <Box onClick={() => appService.openUrl(href)} {...rest}>
      {children}
    </Box>
  )
}

export default styled(ExternalLink)`
  cursor: pointer;
`
