import * as React from 'react'

import { paths } from '@gowiki/core'

import { tracker } from 'services'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

type Props = {
  os: string
  children: any
  onClick: React.MouseEventHandler<any>
}

class DownloadAppLink extends React.PureComponent<Props> {
  render() {
    const { os, children } = this.props

    return (
      <a href={`${paths.APP_HOME}/${os}`} target="_blank" onClick={this.downloadClick}>
        {children}
      </a>
    )
  }

  downloadClick = (e: React.MouseEvent) => {
    const { os, onClick } = this.props
    // tracker.download(os)
    if (onClick) onClick(e)
  }
}

export default DownloadAppLink
