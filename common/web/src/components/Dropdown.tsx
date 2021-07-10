import * as React from 'react'

import styled from 'styled-components'

import { Svg } from '../primitives'
import { IconProps } from './Icon'

type DropdownIconProps = Pick<IconProps, Exclude<keyof IconProps, 'name'>>

type Props = {
  isActive: boolean
  color?: string
} & DropdownIconProps

export const Dropdown: React.SFC<Props> = (props: Props) => {
  const { isActive, color, ...rest } = props

  return (
    <DropdownIcon sz={10} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M0.937906 3.5241C0.527894 2.85783 1.00724 2 1.78956 2H14.2104C14.9928 2 15.4721 2.85783 15.0621 3.5241L8.85166 13.6161C8.46117 14.2506 7.53883 14.2506 7.14834 13.6161L0.937906 3.5241Z"
        fill="black"
      />
    </DropdownIcon>
  )
}

Dropdown.defaultProps = {
  size: 16
}

export const DropdownIcon = styled(Svg)<{ isActive: boolean }>`
  ${p => p.isActive && `transform: rotate(180deg); opacity:1 !important;`}
`
