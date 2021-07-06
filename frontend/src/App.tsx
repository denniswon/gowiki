import React from 'react'

import { connect, sendMsg } from './api'
import { Button, Container } from './components'

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
      <Button onClick={send} primary>Hit</Button>
    </Container>
  )
}

export default App
