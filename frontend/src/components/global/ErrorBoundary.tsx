import * as React from 'react'

import { tracker } from '@gowiki/api'
import { logger } from '@gowiki/core'

import { Column, m } from 'styles'

type Props = {
  children: any
  silent?: boolean
  onError?: () => void
}

type State = {
  errorMessage: string
}

const getErrorMessage = (error: Error) => error.message || "Unknown React error"

let recentError = 0

export default class ErrorBoundary extends React.Component<Props, State> {
  state = {
    errorMessage: ""
  }

  componentDidCatch(error: Error, info: Object) {
    logger.error(getErrorMessage(error), error.stack)
    tracker.handledError(error)

    if (this.props.onError && recentError + 1000 < Date.now()) {
      this.props.onError()
      recentError = Date.now()
    }
  }

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: getErrorMessage(error) }
  }

  render() {
    if (this.state.errorMessage) {
      if (this.props.silent) return null

      return <Column h="100%" w="100%" center prel>
        <m.T18 mb={30} center>Uh oh! Tandem Crashed</m.T18>
        <m.Anchor href="#" onClick={() => location.reload()}>
          <m.T18 p={10}>Reload</m.T18>
        </m.Anchor>
        <m.T13>{this.state.errorMessage}</m.T13>
      </Column>
    } else {
      return this.props.children
    }
  }
}
