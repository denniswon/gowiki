import React, { PropsWithChildren } from 'react'

import { Icon, PressableProps } from '@gowiki/web'

import useTheme from 'utils/useTheme'

import { BoxProps, c, m } from 'styles'

type Props = PropsWithChildren<{
  onClick: (e: any | null) => void
  icon?: string | React.ReactNode
  img?: string
  iconColor?: string
  iconSize?: number
  checkbox?: boolean
  iconOp?: number
  checked?: boolean
  text?: string
  selected?: boolean
}> & BoxProps & PressableProps

const styleVariants = {
  default: { color: c.ink90, hoverColor: c.ink, hoverBg: c.bgHover, iconOp: 0.8 },
  selected: { bg: c.highlight, color: c.white, hoverColor: c.white,
    hoverBg: c.highlight, activeBg: c.highlight, activeColor: c.white
  }
}

function PopoverOption(props: Props) {
  const { icon, img, iconSize, checkbox, checked, iconColor, text, children, selected, ...rest } = props
  const theme = useTheme()

  const styles: Partial<Props> = selected ? styleVariants.selected : styleVariants.default

  if (checkbox && checked) {
    styles.iconOp = 1
  }

  return (
    <m.PopoverPressable  {...styles} {...rest}>
      {checkbox && <>
        <Icon name={checked ? 'check_box' : 'check_box_outline_blank'} size={iconSize || 18}
          color={iconColor || checked ? theme.highlight : null} mr={m.units.popover.iconPadding}
        />
      </>}
      {icon && typeof icon == 'string' ? (
        <Icon name={icon} size={iconSize || 18} color={iconColor} mr={m.units.popover.iconPadding} />
      ) : icon }
      {img && <m.Img src={img} sz={iconSize || 18} mr={m.units.popover.iconPadding} />}
      {text && <m.T14 medium>{text}</m.T14>}
      {typeof children == 'string' ? (
        <m.Text medium>
          {children}
        </m.Text>
      ) : children }
    </m.PopoverPressable>
  )
}

const PopoverText = p => <m.T14 medium {...p} />
const PopoverIcon = p => <Icon size={18} mr={m.units.popover.iconPadding} {...p}/>

PopoverOption.Text = PopoverText
PopoverOption.Icon = PopoverIcon

export default PopoverOption