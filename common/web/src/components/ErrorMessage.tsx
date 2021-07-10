import React from 'react'

import { unwrapError } from '@gowiki/core'
import { Box, BoxProps, c, Column, m, Row, s, TextComponentProps } from '@gowiki/styles'

import styled from 'styled-components'

type Props = {
  error: any
} & TextComponentProps & BoxProps

export const ErrorMessage: React.FunctionComponent<Props> = (props: Props) => {
  const { error, ...rest } = props
  if (!error) return null
  return (
    <m.Text bold size={14} lh={1.3} color={c.red} {...rest}>
      {unwrapError(error)}
    </m.Text>
  )
}
