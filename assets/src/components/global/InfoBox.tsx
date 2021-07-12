import { darken, shade, transparentize } from 'polished'
import * as React from 'react'

import { Icon } from '@gowiki/web'

import styled, { css } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type InfoBoxType = 'info' | 'error' | 'warning' | 'security'
type Props = {
  type: InfoBoxType
  iconName?: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
} & BoxProps

const InfoBox = (props: Props) => {
  const { type, iconName, ...rest } = props

  const children = typeof props.children == 'string' ? <m.Text medium>{props.children}</m.Text> : props.children

  return (
    <InfoBoxContainer row type={type} {...rest}>
      <Icon size={16} name={iconName || type} mr={8} />
      <Content>{children}</Content>
    </InfoBoxContainer>
  )
}


type ContianerProps = React.PropsWithChildren<{ type: InfoBoxType}> & BoxProps
export const InfoBoxContainer = ({ type, ...rest }: ContianerProps)  =>
  <Wrapper vCenter type={type} {...rest} />


export default InfoBox

const warning = css`
  background: ${c.orange20};
  color: ${c.darkOrangeOnOrange20};
`
const info = css`
  background: ${c.info};
  color: ${c.ink90};
  > .icon {
    color: ${c.ink90};
  }
`
const error = css`
  background: ${transparentize(0.9, c.error)};
`

const Wrapper = styled(Box)<{ type: string }>`
  width:100%; ${s.prel} padding:12px 12px; border-radius:6px; background:white;
  ${s.media.sm` padding:8px; `}
  ${m.t14} line-height:19px;
  ${p => (p.type == 'warning' ? warning : '')}
  ${p => (p.type == 'security' ? warning : '')}
  ${p => (p.type == 'info' ? info : '')}
  ${p => (p.type == 'error' ? error : '')}

`
const Content = styled.div`
  display: inline;
`
