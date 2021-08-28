import React from 'react'
import styled from 'styled-components'
import { Box } from 'styles'
import { useStore } from '../store/store'

const Alerts = (props) => {
  const { state, actions } = useStore()

  if (!state.error) return null

  return (
    <AlertWrapper top={state.top}>
      <AlertContent>{state.msg}</AlertContent>
    </AlertWrapper>
  )
}

export default Alerts

const AlertWrapper = styled(Box)`
  position: fixed;
  top: 100px;
  width: 150px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  z-index: 1000;
  transition: top 0.4s ease-in;
`

const AlertContent = styled(Box)`
  background-color: #1da1f2;
  color: #fff;
  font-weight: 600;
  border: 1px solid #e6ecf0;
  -webkit-box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  display: inline-block;
  padding: 8px 14px;
  border-radius: 200px;
`
