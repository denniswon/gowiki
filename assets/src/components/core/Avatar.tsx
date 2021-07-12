import { string } from 'prop-types'
import * as React from 'react'

import AlphatarAutoColored from 'components/core/AlphatarAutoColored'
import ProfileImage from 'components/core/ProfileImage'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  id?: string
  imageUrl?: string
  name: string
  size?: number | string
  useSkrim?: boolean
  textSize?: number
  rounded?: boolean
} & BoxProps

const Avatar: React.SFC<Props> = (props: Props) => {
  const { id, imageUrl, name, size, useSkrim, ...rest } = props

  if (imageUrl) return <ProfileImage size={size} imageUrl={imageUrl} {...rest} useSkrim={useSkrim} />
  else return <AlphatarAutoColored id={id} size={size} characters={name} {...rest} useSkrim={false} />
}

Avatar.defaultProps = {
  size: 20,
  useSkrim: true
}

export default Avatar
