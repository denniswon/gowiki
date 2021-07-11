import * as React from 'react'

import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

// tslint:disable:max-line-length

type Props = {
  color?: string
  size?: number
} & BoxProps

const TwitterIcon: React.SFC<Props> = ({ color, size = 20, ...rest }: Props) => (
  <m.Svg width={size} height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path
      d="M15.095 43.4185C33.2083 43.4185 43.1155 28.4118 43.1155 15.398C43.1155 14.9718 43.1155 14.5475 43.0867 14.1251C45.0141 12.731 46.6778 11.0048 48 9.02746C46.2026 9.82388 44.296 10.3462 42.3437 10.5769C44.3995 9.34614 45.9382 7.41038 46.6733 5.12986C44.7401 6.27697 42.6252 7.0854 40.4198 7.52026C38.935 5.94141 36.9712 4.89594 34.8324 4.54563C32.6935 4.19531 30.4988 4.55969 28.5879 5.58236C26.677 6.60504 25.1564 8.229 24.2615 10.203C23.3665 12.1769 23.1471 14.3908 23.6371 16.502C19.7218 16.3057 15.8914 15.2883 12.3948 13.5156C8.89821 11.743 5.81345 9.25487 3.3408 6.21274C2.08146 8.38073 1.69574 10.9472 2.2622 13.3896C2.82865 15.832 4.30468 17.9666 6.38976 19.359C4.82254 19.3125 3.2895 18.8898 1.92 18.1263C1.92 18.1667 1.92 18.2089 1.92 18.2511C1.92062 20.5248 2.7077 22.7283 4.14774 24.4879C5.58778 26.2474 7.59212 27.4547 9.8208 27.9049C8.37095 28.3003 6.84975 28.3581 5.37408 28.0739C6.00338 30.0307 7.22854 31.7418 8.87822 32.9681C10.5279 34.1943 12.5196 34.8743 14.5747 34.9129C11.0875 37.6536 6.77963 39.1414 2.34432 39.1369C1.56077 39.1354 0.777992 39.0879 0 38.9948C4.50362 41.8849 9.74383 43.4179 15.095 43.4108"
      fill={color || '#2AA3EF'}
    />
  </m.Svg>
)

export default TwitterIcon
