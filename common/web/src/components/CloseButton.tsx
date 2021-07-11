import * as React from 'react'

import { BoxProps, c, m, s } from '@gowiki/styles'

import { Pressable, PressableProps } from '../primitives'
import { Icon } from './Icon'

type Props = {
  onClick: () => void
  color?: string
  size?: number
} & BoxProps & PressableProps

export const CloseButton: React.SFC<Props> = (props: Props) => {
  const { onClick, color, size = 24, ...rest } = props

  return (
    <Pressable center pabs p={6} id="Close" onClick={onClick} tabIndex={0} className='app-non-dragging'
      hoverColor={c.ink} iconOp={0.5} hoverBg={c.ink15} hoverIconOp={1} {...rest}
    >
      <Icon name="close" size={size} color={color} />
    </Pressable>
  )
}

CloseButton.defaultProps = {
  top: 8,
  right: 8,
}

