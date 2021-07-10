import React from 'react'

import { BoxProps, s } from '@gowiki/styles'

import styled from 'styled-components'

type Props = {
  src: string
  fallbackSrc?: string
  type?: string
} & BoxProps


/**
 You can pass multiple images files to be more optimal. eg. webp
 Make sure to set the type to the correct file format
 */
export function ImageWithFallback(props: Props) {
  const { src, fallbackSrc = props.src, type = 'image/webp', ...rest} = props

  return (
    <Picture {...rest}>
      <source srcSet={src} type={type} />
      <img height='100%' width='100%' src={fallbackSrc} />
    </Picture>
  )
}

const Picture = styled.picture` ${s.boxProps}
  img{ object-fit: cover; }
`