import * as React from 'react'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  color?: string
} & BoxProps

{
  /* tslint:disable:max-line-length */
}
const LeaveIcon: React.FunctionComponent<Props> = (props: Props) => {
  const { color = c.red, ...rest } = props

  return (
    <m.Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        opacity="0.7"
        d="M2.5 1C2.10156 1 1.76172 1.15234 1.45703 1.45703C1.15234 1.76172 1 2.10156 1 2.5V13C1 13.3984 1.15234 13.7383 1.45703 14.043C1.76172 14.3477 2.10156 14.5 2.5 14.5H7.5C7.92188 14.5 8.27344 14.3594 8.57812 14.0781C8.85938 13.7734 9 13.4219 9 13V10.5H7.5V13H2.5V2.5H7.5V5H9V2.5C9 2.07812 8.85938 1.73828 8.57812 1.45703C8.27344 1.15234 7.92188 1 7.5 1H2.5Z"
        fill={color}
      />
      <path
        d="M11.0586 10.457L12.9922 8.48828H4.75V7.01172H12.9922L11.0586 5.04297L12.1133 3.98828L15.875 7.75L12.1133 11.5117L11.0586 10.457Z"
        fill={color}
      />
    </m.Svg>
  )
}

export default LeaveIcon
