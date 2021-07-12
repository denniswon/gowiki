import React, { useRef, useState } from 'react'

import { Icon, PressableProps } from '@gowiki/web'

import styled, { keyframes } from 'styled-components'
import { Box, c, Column, m } from 'styles'

type Props = {
  size: number
  startCollapsed?: boolean
  onToggle: (collapsed: boolean) => Promise<any>
  className?: string
} & PressableProps

export function ExpandCollapseButton(props: Props) {
  const { size, startCollapsed, ...rest } = props

  const [collapsed, setCollapsed] = useState(startCollapsed)

  const divRef = useRef<HTMLElement>()

  const onToggle = async (e: MouseEvent) => {
    await rest.onToggle(!collapsed)
    setCollapsed(!collapsed)
  }

  const icon = collapsed ? 'expand_less' : 'expand_more'

  return <Wrapper ml={4} p={4} row center ref={divRef} onClick={onToggle} {...rest}>
    <Icon name={icon} size={size} />
  </Wrapper>
}

const rotate = keyframes` to{ transform: rotate(360deg) } `

const Wrapper = styled(m.Pressable) <Props>`
  &.animate i {
    animation: ${rotate} 0.5s linear infinite;
  }
`