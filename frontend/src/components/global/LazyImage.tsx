import * as React from 'react'

import { Box, BoxProps, c, Column, m, Row, s } from 'styles'
import styled from 'styled-components'

type Props = {
  src: string
  placeholder?: string
  width: number
  height: number
  alt: string
} & BoxProps

type State = {
  loaded: boolean
}

export default class LazyImage extends React.Component<Props, State> {
  state: State = {
    loaded: false
  }

  onLoad = e => {
    this.setState({ loaded: true })
  }

  render() {
    const { src, placeholder, alt, width, height, ...rest } = this.props
    const { loaded } = this.state

    const imgSrc = loaded ? src : placeholder ? placeholder : this.placeholderSrc(width, height)

    return <m.Img src={imgSrc} alt={alt} onLoad={this.onLoad} {...rest} />
  }

  placeholderSrc(width, height) {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`
  }
}
