import * as React from 'react'

import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

import { ToggleIconProps } from 'components/icons/ToggleIcon'

{
  /* tslint:disable:max-line-length */
}
const CollapseIcon = (props: ToggleIconProps) => {
  const { on, color = 'white', size, hovering, ...rest } = props

  return on ? (
    <m.Svg sz={size} className='icon' viewBox="0 0 24 24" {...rest}>
      <path opacity='0.4' fillRule="evenodd" clipRule="evenodd" d="M19 6.5H5C4.72386 6.5 4.5 6.72386 4.5 7V17C4.5 17.2761 4.72386 17.5 5 17.5H19C19.2761 17.5 19.5 17.2761 19.5 17V7C19.5 6.72386 19.2761 6.5 19 6.5ZM5 5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5Z" fill={color}/>
      <rect x="7" y="9" width="10" height="6" fill={color}/>
    </m.Svg>
  ) : (
    <m.Svg sz={size} className='icon' viewBox="0 0 24 24" {...rest}>
      <path fillRule="evenodd" clipRule="evenodd" d="M6 6.5H5C4.72386 6.5 4.5 6.72386 4.5 7V8H3V7C3 5.89543 3.89543 5 5 5H6V6.5ZM3 10V14H4.5V10H3ZM3 17V16H4.5V17C4.5 17.2761 4.72386 17.5 5 17.5H6V19H5C3.89543 19 3 18.1046 3 17ZM8 19V17.5H11V19H8ZM13 6.5H16V5H13V6.5ZM19 6.5H18V5H19C20.1046 5 21 5.89543 21 7V8H19.5V7C19.5 6.72386 19.2761 6.5 19 6.5ZM19.5 10V12H21V10H19.5ZM11 6.5V5H8V6.5H11Z" fill="white"/>
      <rect x="12" y="13" width="9" height="6" rx="1" fill={color}/>
    </m.Svg>
  )
}

export default CollapseIcon