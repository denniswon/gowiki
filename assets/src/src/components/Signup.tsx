import React, { useState } from 'react'
import { useStore } from '../store/store'
import { Link, withRouter } from 'react-router-dom'
import { ICON_LOGO } from '../Icons'

import styled, { css } from 'styled-components'
import { Box, s } from 'styles'

const SignUpPage = (props) => {
  const { actions } = useStore()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const SignUp = (e) => {
    e.preventDefault()
    if (username.length && password.length && email.length && name.length) {
      const values = {
        name,
        username,
        email,
        password,
        func: Redirect,
      }
      actions.signup(values)
    }
  }

  const Redirect = () => {
    props.history.push('/login')
  }

  return (
    <SignupWrapper>
      <ICON_LOGO />
      <SignupHeader>Sign up to Twitter</SignupHeader>
      <SignupForm id="signupForm" onSubmit={(e) => SignUp(e)}>
        <SignupInputWrap>
          <SignupInputContent>
            <label>Name</label>
            <SignupInput
              onChange={(e) => setName(e.target.value)}
              name="name"
              type="text"
            />
          </SignupInputContent>
        </SignupInputWrap>
        <SignupInputWrap>
          <SignupInputContent>
            <label>Username</label>
            <SignupInput
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              type="text"
            />
          </SignupInputContent>
        </SignupInputWrap>
        <SignupInputWrap>
          <SignupInputContent>
            <label>Email</label>
            <SignupInput
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
            />
          </SignupInputContent>
        </SignupInputWrap>
        <SignupInputWrap>
          <SignupInputContent>
            <label>Password</label>
            <SignupInput
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
            />
          </SignupInputContent>
        </SignupInputWrap>
        <SignupBtnWrap
          type="submit"
          form="signupForm"
          active={Boolean(username.length && password.length && name.length && email.length)}
        >
          Sign up
        </SignupBtnWrap>
      </SignupForm>
      <SignupOption>
        <Link to="/login">Log in to Twitter</Link>
      </SignupOption>
    </SignupWrapper>
  )
}

export default withRouter(SignUpPage)

const SignupWrapper = styled(Box)`
  max-width: 600px;
  padding: 0 15px;
  margin: 20px auto 0 auto;
  svg{
    height: 39px;
    margin: 0 auto;
    display: block;
  }
`

const SignupHeader = styled.h1`
  margin-top: 30px;
  font-size: 23px;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: center;
`

const SignupForm = styled.form`
  width: 100%;
`

const SignupInput = styled.input`
  background-color: inherit;
  border: inherit;

  &:focus{
    background-color: inherit;
    border: inherit;
  }
`

const SignupInputWrap = styled(Box)`
  padding: 10px 15px;
`

const SignupInputContent = styled(Box)`
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

const SignupBtnWrap = styled.button<{ active?: boolean }>`
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
  font-size: 16px;
  ${p => p.active && css`
    opacity: 1;
    cursor: pointer;
  `}
`

const SignupOption = styled.p`
  margin-top: 20px;
  font-size: 15px;
  color: rgb(29, 161, 242);
  text-align: center;
  &:hover{
    text-decoration: underline;
    cursor: pointer;
  }
`
