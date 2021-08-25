import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { config } from '@gowiki/core'

import AppMain from './components/screens.app/AppMain'

if (!config.dev && location.protocol == 'http:') {
  location.href = location.href.replace('http:', 'https:')
}

ReactDOM.render(<AppMain />, document.getElementById('react-app'))
