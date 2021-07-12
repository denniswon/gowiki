import React from 'react'

import { getOS } from '@gowiki/core'
import { Icon } from '@gowiki/web'

import styled from 'styled-components'
import { BoxProps, c, m, Row } from 'styles'

export default function WindowsLinuxIcon({
  icon,
  hint,
  color,
  click,
  ...rest
}: { icon: string; hint: string; color: string; click?: () => void } & BoxProps) {
  if (getOS() == 'mac') return null

  return (
    <Wrapper {...rest}>
      <m.Pressable br={0} onClick={click} title={hint} color={color} hoverColor={c.red}>
        <StyledIcon name={icon} size={18} bold />
      </m.Pressable>
    </Wrapper>
  )
}

const Wrapper = styled(Row)`
  user-select: none;
`

const StyledIcon = styled(Icon)`
  -webkit-app-region: no-drag;
  cursor: pointer;
`
