import React, { PropsWithChildren } from 'react'

import { getPropColor } from '@gowiki/styles'

import useTheme from 'utils/useTheme'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = PropsWithChildren<{
  hideMenu?: boolean
  hideMin?: boolean
  hideClose?: boolean
  hideMax?: boolean
  color?: string
  className?: string
  onClose?: () => void
}> &
  BoxProps

const WindowsTopBar: React.FunctionComponent<Props> = (props: Props) => {
  const { hideMenu, hideMin, hideMax, hideClose, children, color: colorProp, onClose, ...rest } = props

  const theme = useTheme()
  const color = colorProp || theme.ink50

  return (
    <Wrapper minh={32} h={32} vCenter {...rest}>
      {!hideMenu && <MenuButton onClick={menuClick} color={color} />}
      {children ? children : <Box flex1 />}
      {!hideMin && <MinimizeButton onClick={minClick} color={color} />}
      {!hideMax && <MaximizeButton onClick={maxClick} color={color} />}
      {!hideClose && <CloseButton onClick={onClose ? onClose : closeClick} color={color} />}
    </Wrapper>
  )
}

const Wrapper = styled(Row)`
  & > {
    opacity: 0.6;
  }
`

const menuClick = (e: MouseEvent) => {}
const minClick = (e: MouseEvent) => {}
const maxClick = (e: MouseEvent) => {}
const closeClick = (e: MouseEvent) => {}

export default WindowsTopBar

type ButtonProps = {
  onClick: (e: MouseEvent) => void
  color: string
}
const MenuButton: React.FunctionComponent<ButtonProps> = ({ onClick, color }: ButtonProps) => {
  return (
    <Button
      prel
      width="48"
      height="32"
      viewBox="0 0 48 32"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      fill={color}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 11H32V12H16V11ZM16 15H32V16H16V15ZM32 19H16V20H32V19Z"
      />
    </Button>
  )
}

const MinimizeButton: React.FunctionComponent<ButtonProps> = ({ onClick, color }: ButtonProps) => {
  return (
    <Button width="40" height="32" viewBox="0 0 40 32" fill={color} xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
      <rect x="15" y="15" width="10" height="1"  />
    </Button>
  )
}

const MaximizeButton: React.FunctionComponent<ButtonProps> = ({ onClick, color }: ButtonProps) => {
  return (
    <Button width="40" height="32" viewBox="0 0 40 32" stroke={color} xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
      <rect x="15.5" y="11.5" width="9" height="9"  />
    </Button>
  )
}

const CloseButton: React.FunctionComponent<ButtonProps> = ({ onClick, color }: ButtonProps) => {
  return (
    <Button width="40" height="32" viewBox="0 0 40 32" stroke={color} xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
      <path d="M15.5 20.5L24.5 11.5M15.5 11.5L24.5 20.5" />
    </Button>
  )
}

const Button = styled(m.Svg)`
  cursor: pointer; -webkit-app-region: no-drag;
  &:hover {
    background: ${p => p.theme.ink50};
    opacity: 1;
  }
  ${p => p.stroke && `stroke: ${getPropColor('stroke', p)};`}
  ${p => p.fill && `fill: ${getPropColor('fill', p)};`}
`
