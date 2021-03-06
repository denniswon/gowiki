import * as React from 'react'

import styled from 'styled-components'
import { Box, BoxProps, Column, m, Row, s } from 'styles'

export type Props = {
  name: string
  size?: number
  color?: string
  op?: number
  className?: string
  v_mid?: boolean
  style?: React.CSSProperties
  onClick?: (e?: MouseEvent) => void
  title?: string
} & BoxProps

export default class Icon extends React.Component<Props> {
  static defaultProps = {
    size: 20
  }

  render() {
    const { name, color, className, style, opacity, op, onClick, size, ...rest } = this.props

    const nameCompat = name.replace(/-/g, '_')
    const iconProps = {
      style: {
        maxWidth: size,
        maxHeight: size,
        boxSizing: 'content-box' as any,
        color,
        opacity: op,
        fontSize: size,
        ...style
      },
      onClick: onClick as any,
      ...rest
    }

    return (
      <StyledMaterialIcon className={`icon material-icons ${className}`} {...iconProps}>
        {nameCompat}
      </StyledMaterialIcon>
    )
  }
}

interface IconProps {
  tag: any
  op?: number
  opacity?: number
}

const IconTagComponent = ({ tag, children, ...props }) => React.createElement(tag, props, children)

export const IconWithStyles = styled(IconTagComponent).attrs<IconProps>({})` ${s.boxProps}
  ${p => (p.op ? `opacity:${p.op}` : '')}
  ${p => (p.opacity ? `opacity:${p.opacity}` : '')}
`

const StyledMaterialIcon = styled.i`
  ${s.boxProps} text-align: center;
`
