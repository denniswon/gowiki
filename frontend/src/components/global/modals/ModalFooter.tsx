import * as React from 'react'

import { Icon } from '@gowiki/web'

import styled from 'styled-components'
import { BoxProps, c, Column, m, Row, s } from 'styles'

interface Props extends BoxProps {
  onClick?: (e?) => void
  footerComponent?: React.ReactNode
  withBorder?: boolean
  variant?: FooterVariant
  text?: string
  textSize?: number
  iconName?: string
  sticky?: boolean
  style?: { [key: string]: any }
}

export enum FooterVariant {
  HELPER,
  DEFAULT
}

export default function ModalFooter(props: Props) {
  const { variant = FooterVariant.DEFAULT, center = true, onClick, footerComponent,
    text, textSize, iconName, sticky, style, ...rest } = props
  let footerContent

  switch (variant) {
    case FooterVariant.DEFAULT:
      footerContent = (<Row mh={m.units.modal.padding} mv={4} style={style}>
        <m.Pressable row p={6} mh={-6} color={c.black60}>
          <Icon size={14} name={iconName} mr={6} />
          <m.T13 medium fs={textSize} >{text}</m.T13>
          {footerComponent}
        </m.Pressable>
      </Row>)
      break;
    case FooterVariant.HELPER:
    default:
      footerContent = (
        <Row mh={m.units.modal.padding} mv={4} style={style}>
          <m.Pressable row vCenter p={6} mh={-6} color={c.black60} onClick={onClick}>
            <Icon size={14} name={iconName ? iconName : 'info-outlined'} mr={6} />
            <m.T13 medium>{text}</m.T13>
          </m.Pressable>
        </Row>
      )
  }

  return (
    <Wrapper sticky={sticky} {...rest}>
      <Column prel>
        <m.Divider mh={0} mv={0} />
        <Row>{footerContent}</Row>
      </Column>
    </Wrapper>
  )
}

const Wrapper = styled(Column)<{ withBorder?: boolean, sticky?: boolean }>`
  ${({sticky})=> sticky && `position: sticky; bottom: 0;`}
  color: ${c.black};
  background-color: ${c.white};
  width: 100%;
`
