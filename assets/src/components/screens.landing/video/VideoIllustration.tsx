import React from 'react'

import videoImage from 'images/video_image.png'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

import LightboxVideo from './LightboxVideo'
import LightboxVideoButton from './LightboxVideoButton'

type Props = {
}

export default function VideoIllustration(props: Props) {
  const {} = props

  const w = 600

  return (
    <Box center w={600} h={w*0.5625}>
      <m.Img src={videoImage} w='100%' h='auto' br={6} />
      <LightboxVideo>
        {({ open }) => <LightboxVideoButton onClick={open} /> }
      </LightboxVideo>
    </Box>
  )
}
