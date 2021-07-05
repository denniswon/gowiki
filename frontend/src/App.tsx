import React from 'react'
import logo from './logo.svg'
import './App.css'

import { connect, sendMsg } from './api'

type Props = {
}

const App: React.FunctionComponent<Props> = (props: Props) => {
  connect()

  const send = () => {
    console.log('hello')
    sendMsg('hello')
  }

  return (
    <div className='App'>
      <button onClick={send}>Hit</button>
    </div>
  )
}

export default App
