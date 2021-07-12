import * as React from 'react'

import { ErrorMessage, Icon } from '@gowiki/web'

import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  success?: string
  error?: string
} & BoxProps

export default class SubmitFeedback extends React.Component<Props> {
  static defaultProps = {
    mt: 12
  }

  render() {
    const { success, error, ...rest } = this.props

    return (
      <Row vCenter {...rest}>
        {success && (
          <>
            <Icon name="check-circle" color={c.green} size={20} mr={4} />
            <m.Text bold color={c.green}>
              {success}
            </m.Text>
          </>
        )}

        {error && <ErrorMessage error={error} />}
      </Row>
    )
  }
}
