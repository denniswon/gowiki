import React from 'react'

import { Button } from '@gowiki/web'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

type Props = {
  onClick: () => void
}

export default function LightboxVideoButton(props: Props) {
  const { onClick} = props

  return (
    <Button iconName='play_arrow' pabs zi={20} onClick={onClick}
      bg={c.white} borderColor={c.brand} color={c.brand}
    >
      Watch Tandem in action <m.Text ml={8} op={0.5}>1:55</m.Text>
    </Button>
  )
}