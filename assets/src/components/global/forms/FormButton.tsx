import { readableColor } from 'polished'
import * as React from 'react'

import { Button, ButtonProps, Icon, Loader } from '@gowiki/web'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

export type Props = ButtonProps & {
  text?: string
  children?: any
  name?: string
  type?: string
  onSubmit?: (e?: any) => void
  isSubmitting: boolean
  isSubmitted?: boolean
  iconName?: string
  disabled?: boolean
  bg?: string
  useRightIcon?: boolean
  color?: string
  style?: React.CSSProperties
  className?: string
  green?: boolean
  red?: boolean
}

const FormButton = (props: Props) => {
  const { children, onSubmit, isSubmitting, isSubmitted, useRightIcon, iconName, iconOp, bg = c.black, color = c.white, text, ...rest } = props

  const shouldShowIcon = iconName && (useRightIcon || !(isSubmitting || isSubmitted))
  return (
    <Button onClick={onSubmit} bg={bg} color={color} row vCenter {...rest}>
      {isSubmitted && <Icon name="check" mr={10} size={15} color={color} /> }
      {shouldShowIcon && (
        <StyledIcon name={iconName} color={color} size={20} op={iconOp || 0.6} useRightIcon={useRightIcon} />
      )}
      {children || (
        <m.T14 semi color={color}>
          {text}
        </m.T14>
      )}
      {isSubmitting && <Loader ml={10} size={15} color={color} />}
    </Button>
  )
}
export default FormButton

const StyledIcon = styled(Icon)<{ useRightIcon: boolean }>`
  margin-right: 8px;
  ${p => p.useRightIcon && ` order:9999; margin-right:0px; margin-left:8px; `}
`
