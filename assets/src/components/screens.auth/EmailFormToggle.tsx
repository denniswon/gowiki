import * as React from 'react'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

type Props = {
  children: any
}

type State = {
  isFormVisible: boolean
}

export default class EmailFormToggle extends React.Component<Props, State> {
  state: State = {
    isFormVisible: false
  }

  render() {
    const { children } = this.props
    const { isFormVisible } = this.state

    return (
      <>
        {!isFormVisible && (
          <m.Pressable asc mt={12} p={8} style={{ display: 'inline' }} onClick={this.onShowForm}>
            You can also <strong>continue with email</strong>
          </m.Pressable>
        )}
        {isFormVisible && children}
      </>
    )
  }

  onShowForm = () => this.setState({ isFormVisible: true })

  hide = () => this.setState({ isFormVisible: false })
}
