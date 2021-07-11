import React, { useState } from 'react'
import { animated, useSpring, useTransition } from 'react-spring'

import styled from 'styled-components'
import { Box, BoxProps, s } from 'styles'

type Props = {
  children: any
  on?: boolean
  start?: React.CSSProperties
  end?: React.CSSProperties
  fadeIn?: boolean
  heightIn?: boolean
  moveIn?: boolean | number | string
  scaleIn?: boolean
  className?: string
  style?: React.CSSProperties
} & BoxProps

const Appear: React.SFC<Props> = (props: Props) => {
  const { on, children, heightIn, fadeIn, moveIn, scaleIn, className, style, ...rest } = props

  const start = {
    ...props.start,
    ...(fadeIn ? { opacity: 0 } : {}),
    ...(scaleIn ? { transform: `scale(0.9)` } : {}),
    ...(moveIn ? { transform: `translateY(${getMoveInValue(moveIn)})` } : {}),
    ...(heightIn ? { height: 0 } : {}),
  }

  const end = {
    ...props.end,
    ...(fadeIn ? { opacity: 1 } : {}),
    ...(scaleIn ? { transform: `scale(1)` } : {}),
    ...(moveIn ? { transform: `translateY(0)` } : {}),
    ...(heightIn ? { height: 0 } : {}),
  }

  const transitions: any = useTransition(on, null, {
    from: start,
    enter: end,
    leave: start,
  } as any)

  return transitions.map(({ item, key, props: transitionProps }) =>
    item && <Animated key={key} {...rest} style={{...transitionProps, ...style}}>{children}</Animated>
  )

}

const getMoveInValue = (value: boolean | number | string) => {
  if (typeof value == 'boolean') return '50%'
  else if (typeof value == 'number') return value + 'px'
  else return value
}

export default Appear

const Animated = styled(animated.div)` ${s.boxProps}  `