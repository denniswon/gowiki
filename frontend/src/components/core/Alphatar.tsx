import * as React from 'react'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

export type AlphatarProps = {
  characters: string
  size?: number | string
  textSize?: number
  useSkrim?: boolean
  bg?: string
  color?: string
  rounded?: boolean
} & BoxProps

type Props = AlphatarProps

const Alphatar: React.SFC<Props> = (props: Props) => {
  const { characters, size = 20, textSize, useSkrim, bg, color, rounded, ...rest } = props
  if (!characters || characters.length == 0) return null

  const firstChar = String.fromCodePoint(characters.codePointAt(0)).toLocaleUpperCase()

  return (
    <Wrapper w={size} h={size} minh={size} minw={size} bg={bg} br={rounded ? size : m.units.avatarRounding} center {...rest} prel>
      {useSkrim && <m.RadialSkrim />}
      <m.Text size={textSize || 12} color={color} bold>
        {firstChar}
      </m.Text>
    </Wrapper>
  )
}

Alphatar.defaultProps = {
  characters: 'a',
  bg: c.black70,
  color: c.white90
}

export default Alphatar

const Wrapper = styled(m.Text)`
  overflow: hidden;
`
