import * as React from 'react'

import { Icon } from '@gowiki/web'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

type Props = {
  iconName?: string
  iconComponent?: React.ReactNode
  text: string
  onClick?: () => void
  shortcut?: string
  color?: string
  disabled: boolean
}

const padding = m.units.popover.padding.large

const PopoverPressable: React.SFC<Props> = (props: Props) => {
  const { iconComponent, iconName, text, onClick, shortcut, color, disabled } = props

  return (
    <m.Pressable onClick={onClick} row vCenter pv={8} ph={padding} mh={-padding} br={0}
      color={c.white} hoverBg={c.brand} hoverColor={c.white} disabled={disabled}
    >
      {iconName && <Icon size={18} name={iconName} color={color} mr={8} />}
      {iconComponent && iconComponent}
      <m.T14 medium mr={8}>
        {text}
      </m.T14>
      {shortcut && (
        <m.T12 op={0.6} mt={1}>
          {shortcut}
        </m.T12>
      )}
    </m.Pressable>
  )
}

export default PopoverPressable
