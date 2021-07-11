import * as React from 'react'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  imageUrl: string
  size?: number | string
  useSkrim?: boolean
  rounded?: boolean
} & BoxProps

export default function ProfileImage(props: Props) {
  const { imageUrl, size = 16, useSkrim, rounded, ...rest } = props

  return (
    <Wrapper className='profile-image' sz={size} minw={size} minh={size} br={rounded ? size : m.units.avatarRounding} prel {...rest}>
      {useSkrim && <m.RadialSkrim />}
      <Image bg={c.black10} style={{ backgroundImage: `url(${imageUrl})` }} w="100%" h="100%" />
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  overflow: hidden;
`
const Image = styled(Box)<BoxProps>`
  ${s.boxProps} background-size:cover;
`
