import * as React from 'react'

import ScreenMeta from 'components/core/ScreenMeta'
import Theme from 'components/global/Theme'

import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

export type LayoutProps = {
  title?: string
  children: any
} & BoxProps

type State = {
  isLoaded?: boolean
}

export default class Layout extends React.Component<LayoutProps, State> {
  mounted = false

  state: State = {
    isLoaded: false
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const { title, children } = this.props
    const { isLoaded } = this.state
    return (
      <Theme theme={m.themes.whiteBackground}>
        <>
          <LayoutLoadedStyle isLoaded={isLoaded} />
          <ScreenMeta title={title} />
          {children}
        </>
      </Theme>
    )
  }

  componentDidMount() {
    this.mounted = true
    // This timeout wait for a render cycle in order to update load state which change the website opacity
    setTimeout(() => {
      if (this.mounted) this.setState({ isLoaded: true })
    }, 0)
  }
}

const LayoutLoadedStyle = createGlobalStyle<{ isLoaded: boolean }>`
  ${p =>
    p.isLoaded &&
    `
    #react-app{ opacity: 1; transition:opacity 600ms ease-out; }
  `}
`
