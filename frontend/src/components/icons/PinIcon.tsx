import * as React from 'react'

import { ToggleIconProps } from 'components/icons/ToggleIcon'

import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

{
  /* tslint:disable:max-line-length */
}
const PinIcon = (props: ToggleIconProps) => {
  const { on, color, size, hovering, ...rest } = props

  return (
    <m.Svg className='icon' sz={size} viewBox='0 0 18 18' {...rest}>
      <path d='M12 9V3H12.75V1.5H5.25V3H6V9L4.5 10.5V12H8.4V16.5H9.6V12H13.5V10.5L12 9Z' fill={color} />
    </m.Svg>
  )
}

export default PinIcon
