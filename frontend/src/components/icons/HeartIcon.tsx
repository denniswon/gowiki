import React from 'react'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  size?: number
} & BoxProps

const HeartIcon: React.FunctionComponent<Props> = (props: Props) => {
  const { size = 18, ...rest } = props

  return (
    <m.Svg width={size} height="100%" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g filter="url(#filter0_ii)">
        <path
          d="M9 15.7734L7.78906 14.6797C6.40885 13.4297 5.40625 12.5052 4.78125 11.9062C4.15625 11.3073 3.45312 10.5651 2.67188 9.67969C1.91667 8.79427 1.39583 8 1.10938 7.29688C0.822917 6.56771 0.679688 5.82552 0.679688 5.07031C0.679688 3.79427 1.10938 2.71354 1.96875 1.82812C2.85417 0.942708 3.94792 0.5 5.25 0.5C6.76042 0.5 8.01042 1.08594 9 2.25781C9.98958 1.08594 11.2396 0.5 12.75 0.5C14.0521 0.5 15.1328 0.942708 15.9922 1.82812C16.8776 2.71354 17.3203 3.79427 17.3203 5.07031C17.3203 6.08594 16.9818 7.14062 16.3047 8.23438C15.6276 9.32812 14.8854 10.2786 14.0781 11.0859C13.2969 11.8932 12.0078 13.1042 10.2109 14.7188L9 15.7734Z"
          fill="url(#paint0_linear)"
        />
      </g>
      <defs>
        <filter
          id="filter0_ii"
          x="-0.320312"
          y="-0.5"
          width="18.6406"
          height="17.2734"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-1" dy="-2" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.895087 0 0 0 0 0.85 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow" />
        </filter>
        <linearGradient id="paint0_linear" x1="9" y1="-2" x2="9" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF8652" />
          <stop offset="1" stopColor="#FF4C3B" />
        </linearGradient>
      </defs>
    </m.Svg>
  )
}

export default HeartIcon
