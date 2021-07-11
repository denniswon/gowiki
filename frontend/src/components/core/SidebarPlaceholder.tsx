import * as React from 'react'

import { Box, BoxProps, c, Column, m, Row, s } from 'styles'
import styled from 'styled-components'

class SidebarPlaceholder extends React.PureComponent<BoxProps> {
  render() {
    return (
      <Box {...this.props}>
        <svg width="262" height="287" viewBox="0 0 262 287" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect opacity="0.2" x="16" width="88" height="16" rx="4" fill="#282D36" />
          <rect opacity="0.1" x="18" y="75" width="46" height="16" rx="4" fill="#282D36" />
          <rect opacity="0.1" x="18" y="51" width="57" height="16" rx="4" fill="#282D36" />
          <rect opacity="0.1" x="18" y="99" width="57" height="16" rx="4" fill="#282D36" />
          <rect opacity="0.1" x="18" y="222" width="196" height="16" rx="4" fill="#282D36" />
          <rect opacity="0.1" x="18" y="198" width="57" height="16" rx="4" fill="#282D36" />
          <rect opacity="0.1" x="18" y="246" width="166" height="16" rx="4" fill="#282D36" />
          <rect opacity="0.1" x="18" y="271" width="166" height="16" rx="4" fill="#282D36" />
          <line opacity="0.1" y1="155.5" x2="262" y2="155.5" stroke="black" />
        </svg>
      </Box>
    )
  }
}

export default SidebarPlaceholder
