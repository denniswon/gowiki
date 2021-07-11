import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type SharedProps = {
  title?: string
  children?: React.ReactNode
  useOnClick?: boolean
  onClick?: (event: React.MouseEvent) => void
} & BoxProps

type AnchorProps = {
  href?: string
  target?: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

type RouterLinkProps = {
  to?: string
  id?: string
}

const AnchorLinkBox = (props: AnchorProps & SharedProps) => {
  const { children, ...otherAnchorProps } = props

  return <A {...otherAnchorProps}>{children}</A>
}

const RouterLinkBox = (props: RouterLinkProps & SharedProps & RouteComponentProps) => {
  const { push } = props.history
  const { to, id, title, useOnClick, onClick, children, ...rest } = props

  const action = (e: React.MouseEvent) => {
    if (onClick) onClick(e)
    if (!e.defaultPrevented) push(to)
  }
  const actionProps = useOnClick ? { onClick: action } : { onMouseDown: action }
  return (
    <Box title={title} {...rest} {...actionProps}>
      {children}
    </Box>
  )
}

const RouterLinkWithRouter = withRouter(RouterLinkBox)

export type Props = (AnchorProps | RouterLinkProps) & SharedProps

const Link = (props: Props) => {
  if ((props as AnchorProps).href) return <AnchorLinkBox {...props} />
  else return <RouterLinkWithRouter {...props} />
}

export default Link

const A = styled.a`
  ${s.boxProps} text-decoration:none !important;
`
