import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { renderToString } from 'react-dom/server'
import { Route, StaticRouter } from 'react-router'
import { config } from './config'

import App from './App'

if (!config.dev && location.protocol == 'http:') {
  location.href = location.href.replace('http:', 'https:')
}

if (!navigator.userAgent.includes('jsdom')) {
  ReactDOM.render(<App />, document.getElementById('react-app'))
}

export default params => {
  const { __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS, ServerStyleSheet } = require('styled-components')
  /* Styled Components detects the existence of `document` and will stop trying to server-side render
     and throw an error. It expects to run within a node.js environment using something like Gatsby.
     In order to work with prerender-loader's JSDOM implementation we do the following hack:
     https://github.com/styled-components/styled-components/issues/1692 */
  const { StyleSheet } = __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS
  StyleSheet.reset(true)

  const sheet = new ServerStyleSheet()
  try {
    const html = renderToString(
      sheet.collectStyles(
        <StaticRouter location={params.url} context={{}}>
          <Route path="/" component={App} />
        </StaticRouter>
      )
    )
    const styleTags = sheet.getStyleTags()
    return styleTags + html
  } catch (error) {
    // handle error
    console.error(error)
  } finally {
    ;(sheet as any).seal()
  }
}
