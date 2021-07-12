import React from 'react'

import { isMac } from '@gowiki/core'

import WindowsTopBar from 'components/app.header/WindowsTopBar'
import MacWindowControls from 'components/core/MacWindowControls'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

type Props = {
  bg?: string
}

const PlainWindowHeader: React.FunctionComponent<Props> = (props: Props) => {
  const { bg } = props

  if (isMac)
    return (
      <>
        <MacWindowControls colored zi={200} ml={8} top={0} />
        <Box bg={bg} left={0} top={0} right={0} h={32} className="app-dragging" style={{ position: 'fixed' }} />
      </>
    )

  return (
    <WindowsTopBar
      hideMenu
      color={c.black}
      zi={200}
      bg={bg || c.black10}
      borderBottom={`1px solid ${c.black10}`}
      className="app-dragging"
    />
  )
}

export default PlainWindowHeader
