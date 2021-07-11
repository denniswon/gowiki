import React, { PropsWithChildren } from 'react'

import Scrollbars from 'components/global/Scrollbars'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

type Props = PropsWithChildren<{}>

const SettingsLayout: React.FunctionComponent<Props> = (props: Props) => {
  const { children } = props

  return (
    <StyledScrollbars style={{ flex: 1 }}>
      <Column style={{ overflowX: 'hidden' }} p={48}>
        <Wrapper w={"100%"} maxw={680} prel>
          {children}
        </Wrapper>
      </Column>
    </StyledScrollbars>
  )
}

export default SettingsLayout

export const StyledScrollbars = styled(Scrollbars)`
  height: 100%;
  display: block;
  .ps-container > .ps-scrollbar-x-rail,
  .ps-container > .ps-scrollbar-y-rail {
    opacity: 0.6;
  }
`

export const Wrapper = styled(Column)`
  margin: 0 auto; 
`
