import React from 'react'
import styled from 'styled-components'

import { connect, sendMsg } from './api'
import { Button } from './components'

type Props = {
}

const App: React.FunctionComponent<Props> = (props: Props) => {
  connect()

  const send = () => {
    console.log('hello')
    sendMsg('hello')
  }

  return (
    <Container className='App'>
      <Button onClick={send}>Hit</Button>
    </Container>
  )
}

export default App

export const Container = styled.div`
  text-align: center;
`
