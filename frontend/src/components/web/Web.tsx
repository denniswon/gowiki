import React, { PropsWithChildren } from 'react'

import { Loader, Props as LoaderProps } from '@gowiki/web'

import { CornerHelpButton } from 'components/core/HelpButton'
import ScreenMeta from 'components/core/ScreenMeta'

import styled, { ThemeProvider } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

function Container(p: PropsWithChildren<BoxProps>) {
  return <Box ph={[16, 24]} {...p} />
}

function Inner(p: PropsWithChildren<BoxProps>) {
  return <Box w="100%" maxw={m.units.auth.width} {...p} />
}

function WebLoader(p: PropsWithChildren<LoaderProps>) {
  return <Loader color={c.black50} {...p} />
}

type Props = PropsWithChildren<{
  title?: string
  isLoading?: boolean
}>

function Layout(props: Props) {
  const { title = 'Tandem', children, isLoading } = props

  return (
    <ThemeProvider theme={m.themes.whiteBackground}>
      <>
        <ScreenMeta title={title} />
        {isLoading ? <Box h="100%" center><WebLoader /></Box> : children}
        <CornerHelpButton />
      </>
    </ThemeProvider>
  )
}

export const Web = {
  Container,
  Layout,
  Inner,
  Loader: WebLoader,
}