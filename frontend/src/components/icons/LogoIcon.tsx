import * as React from 'react'

import styled, { withTheme } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  color: string,
  leftColor?: string,
  rightColor?: string,
  size: number
  theme: any
} & BoxProps

const LogoIcon: React.FunctionComponent<Props> = (props: Props) => {
  const { size, color, leftColor = c.brand, rightColor = c.brand2, theme, ...rest } = props

  return (
    <m.Svg width={size} height="100%" {...rest} viewBox="0 0 64 59" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M24.4759 42.4296L0 58.4052V15.9755L24.4759 0V42.4296Z" fill={color || leftColor}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M64 42.4296L39.5241 58.4052V15.9755L64 0V42.4296Z" fill={color || rightColor}/>
    </m.Svg>
  )
}

export default withTheme(LogoIcon)