import * as React from 'react'
import Helmet from 'react-helmet'

import { config } from '@gowiki/core'

import { mainTitle } from 'components/core/HeadMeta'

type Props = {
  title: string
}

const ScreenMeta: React.SFC<Props> = ({ title }: Props) => {
  const composedTitle = (config.dev ? '[D] ' : '') + (title ? `${title}` : mainTitle)

  return <Helmet title={composedTitle} />
}

export default ScreenMeta
