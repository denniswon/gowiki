import * as React from 'react'

import { toTitleCase } from '@gowiki/core'
import { Button, ButtonProps } from '@gowiki/web'

import DownloadAppLink from 'components/core/DownloadAppLink'
import OsIcon from 'components/core/OsIcon'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  os: 'windows' | 'mac'
  text?: string
  version?: string
} & ButtonProps

const OSButtonWithLink: React.SFC<Props> = (props: Props) => {
  const { os, version, text, onClick, ...rest } = props

  return (
    <DownloadAppLink os={os} onClick={onClick}>
      <Button {...rest} hoverBg={c.brand}>
        <OsIcon os={os} />
        <Column aifs ml={12}>
          <m.Text bold mb={2}>
            {text || `Download Tandem for ${toTitleCase(os)}`}
          </m.Text>
          {version && <m.T14 op={0.6}>Version: {version}</m.T14>}
        </Column>
      </Button>
    </DownloadAppLink>
  )
}

export default OSButtonWithLink
