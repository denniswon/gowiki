import React from 'react'

import { BoxProps, c, m, TextComponentProps } from 'styles'
import { unwrapError } from 'utils'

type Props = {
  error: any
} & TextComponentProps & BoxProps

export const ErrorMessage: React.FunctionComponent<Props> = (props: Props) => {
  const { error, unselectable, ...rest } = props
  if (!error) return null
  return (
    <m.Text bold size={14} lh={1.3} color={c.red} {...rest}>
      {unwrapError(error)}
    </m.Text>
  )
}
