import React from 'react'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  size?: number
} & BoxProps

const LinkedinIcon: React.FunctionComponent<Props> = (props: Props) => {
  const { size = 20, ...rest } = props

  return (
    <m.Svg width={size} height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.754333 2.50823C0.754333 1.53935 1.53923 0.753906 2.50866 0.753906H20C20.9689 0.753906 21.7543 1.5388 21.7543 2.50823V19.9996C21.7543 20.9685 20.9694 21.7539 20 21.7539H2.50866C1.53977 21.7539 0.754333 20.969 0.754333 19.9996V2.50823Z"
        fill="#0077B5"
      />
      <path
        d="M11.9106 8.76016H9.06683V18.8227H12.1293V13.9485C12.1293 12.3148 12.7309 11.2758 14.1768 11.2758C15.2194 11.2758 15.6293 12.2396 15.6293 13.9485V18.8227H18.6918V13.2651C18.6918 10.2643 17.9739 8.62891 14.949 8.62891C13.371 8.62891 12.3205 9.36741 11.9106 10.189V8.76016Z"
        fill="white"
      />
      <path d="M6.87933 18.6914H3.81683V8.62891H6.87933V18.6914Z" fill="white" />
      <path
        d="M5.34808 7.31641C6.43527 7.31641 7.31683 6.43484 7.31683 5.34766C7.31683 4.26047 6.43527 3.37891 5.34808 3.37891C4.2609 3.37891 3.37933 4.26047 3.37933 5.34766C3.37933 6.43484 4.2609 7.31641 5.34808 7.31641Z"
        fill="white"
      />
    </m.Svg>
  )
}

export default LinkedinIcon
