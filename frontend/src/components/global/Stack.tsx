import React, { PropsWithChildren } from 'react'

import styled from 'styled-components'
import { Box, BoxProps } from 'styles'

type Props = PropsWithChildren<{
  gap?: number
}> & BoxProps

/**
 * Wrap any number of components with <Stack> to add a gap between them
 */
export default function Stack(props: Props) {
  let { children, gap = 12, ...rest } = props

  return (
    <Wrapper gap={gap} {...rest}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled(Box)<{ gap: number }>`
  & > * + *{
    ${p => p.row
      ? `margin-left:${p.gap}px;`
      : `margin-top:${p.gap}px;`
    }
  }
`