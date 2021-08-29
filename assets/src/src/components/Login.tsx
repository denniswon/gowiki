import React, { useState } from 'react'
import { useStore } from '../store/store'
import { Link, Redirect } from 'react-router-dom'
import { ICON_LOGO } from '../styles/icons'
import styled, { css } from 'styled-components'
import { Box } from 'styles'

const LoginPage = () => {
 const { state, actions } = useStore()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const Login = (e) => {
    e.preventDefault()
    if (username.length && password.length) {
      const values = {
        username,
        password,
      }
      actions.login(values)
    }
  }

  return (
    <LoginWrapper>
      {state.loggedin && <Redirect to="/home" />}
      <ICON_LOGO />
      <LoginHeader>Log in to Twitter</LoginHeader>
      {state.msg === 'Incorrect email or password' && (
        <LoginError>
          {' '}
          The username/email or password you entered is incorrect.{' '}
        </LoginError>
      )}
      <LoginForm id="loginForm" onSubmit={(e) => Login(e)}>
        <LoginInputWrap>
          <LoginInputContent>
            <label>Email or username</label>
            <LoginInput
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
            />
          </LoginInputContent>
        </LoginInputWrap>
        <LoginInputWrap>
          <LoginInputContent>
            <label>Password</label>
            <LoginInput
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
            />
          </LoginInputContent>
        </LoginInputWrap>
        <LoginBtnWrap active={username.length && password.length > 0}
          type="submit" form="loginForm">
          Log in
        </LoginBtnWrap>
      </LoginForm>
      <SignupOption>
        <Link to="/signup">Sign up for Twitter</Link>
      </SignupOption>
    </LoginWrapper>
  )
}

export default LoginPage

const LoginWrapper = styled(Box)`
  max-width: 600px;
  padding: 0 15px;
  margin: 20px auto 0 auto;
  svg{
    height: 39px;
    margin: 0 auto;
    display: block;
  }
`

const LoginHeader = styled.h1`
  margin-top: 30px;
  font-size: 23px;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: center;
`

const LoginForm = styled.form`
  width: 100%;
`

const LoginInput = styled.input`
  background-color: inherit;
  border: inherit;
  &:focus{
    background-color: inherit;
    border: inherit;
  }
`

const LoginInputWrap = styled(Box)`
  padding: 10px 15px;
`

const LoginInputContent = styled(Box)`
  border-bottom: 2px solid rgb(64, 67, 70);
  background-color: #e3e3e4;
  label{
    display: block;
    padding: 5px 10px 0 10px;
  }
  input{
    width: 100%;
    outline: none;
    font-size: 19px;
    padding: 2px 10px 5px 10px;
  }
`

const LoginBtnWrap = styled.button<{ active?: boolean }>`
  width: calc(100% - 20px);
  min-height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in-out;
  margin: 10px;
  padding: 0 30px;
  border-radius: 9999px;
  background-color: rgb(29, 161, 242);
  opacity: 0.5;
  color: #fff;
  font-weight: bold;
  outline: none;
  border: 1px solid rgba(0,0,0,0);
  ${p => p.active && css`
    opacity: 1;
    cursor: pointer;
  `}
`

const SignupOption = styled(Box)`
  margin-top: 20px;
  font-size: 15px;
  color: rgb(29, 161, 242);
  text-align: center;
  &:hover{
    text-decoration: underline;
    cursor: pointer;
  }
`

const LoginError = styled.p`
  text-align: center;
  color: red;
`
