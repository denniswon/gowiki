import { navigate } from 'hookrouter'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { useAuthStore } from '@gowiki/api'
import { paths } from '@gowiki/core'

import { useAuthWebStore } from 'stores/authWebStore'
import { usePageView } from 'utils/usePageView'

import { Column } from 'styles'
import { PageTitle } from '../styles'

import AppAuthLayout from '../AppAuthLayout'
import SignInForm from './SignInForm'

const search = new URLSearchParams(location.search)
const loginCode = search.get('lc')

type Props = {
  signUp?: boolean
}

export default function AppSignInScreen(props: Props) {
  const { signUp: initialSignup } = props
  const [signUp, setSignUp] = useState(initialSignup)

  usePageView(signUp ? 'appSignUpScreen' : 'appSignInScreen')

  const [token] = useAuthStore(state => [state.token])
  const [storeLoginCode] = useAuthWebStore(state => [state.actions.storeLoginCode])

  const title = signUp ? "Sign Up" : "Sign In"
  useLayoutEffect(() => {
    if (loginCode) storeLoginCode(loginCode)
    if (token) {
      if (signUp) {
        navigate(paths.WELCOME_NEW_USER)
      } else {
        navigate(paths.AUTH_SUCCESS)
      }
    }
  }, [token])

  return (
    <AppAuthLayout title={title} vCenter>
      <Column w="100%" h="100%" mt="-5vh" hCenter vCenter>
        <PageTitle>{title}</PageTitle>

        <SignInForm signUp={signUp} setSignUp={setSignUp} />
      </Column>
    </AppAuthLayout>
  )
}
