import React from 'react'

import { config } from '@gowiki/core'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

import VideoPreview from 'components/screens.landing/video/VideoPreview'

type Props = {
  horizontal?: boolean
} & BoxProps

export default function TandemInfoSection(props: Props) {
  const { horizontal, ...rest } = props

  return (
    <Column maxw={440} hCenter {...rest}>
      <Divider w='100%' mv={40} horizontal={horizontal} />
      <m.T16 semi tCenter paragraph mb={4} op={0.8}>
        {'landingStrings.title'}
      </m.T16>
      <m.T16 tCenter paragraph mb={24} op={0.5}>
        {'landingStrings.description'}
      </m.T16>
      <VideoPreview w='100%' maxw={400} smallButton />
    </Column>
  )
}

const Divider = styled(m.Divider)`
  ${p => p.horizontal && ` display:none;`}
  ${s.media.sm` display:block;`}
`