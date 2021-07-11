import { navigate, useRedirect, useRoutes } from 'hookrouter'
import React, { useEffect } from 'react'

import { useAuthStore } from '@gowiki/api'
import { paths } from '@gowiki/core'

import AppSignInScreen from 'components/screens.appauth/signin/AppSignInScreen'
import SignInSuccess from 'components/screens.appauth/signin/SignInSuccess'
import NewTeamScreen from 'components/screens.appauth/signup/NewTeamScreen'
import NewUserScreen from 'components/screens.appauth/signup/NewUserScreen'
import { hot } from 'react-hot-loader/root'
import { useAuthWebStore } from 'stores/authWebStore'

function NotFoundPage() {
  return <h1>Not Found</h1>
}

function SignOut() {
  const logout = useAuthStore(state => state.actions.logout)
  const [storeLoginCode] = useAuthWebStore(state => [state.actions.storeLoginCode])

  useEffect(() => {
    const search = new URLSearchParams(location.search)
    const loginCode = search.get('lc')
    if (loginCode) storeLoginCode(loginCode)
    logout()
    navigate(paths.AUTH_SIGNUP)
  }, [])

  return null
}

export const Redirect = (props: { href: string }) => {
  navigate(props.href, true)
  return <></>
}

export const HTTPRedirect = (props: { href: string }) => {
  location.href = props.href
  return <></>
}

const routes = {
  [paths.WELCOME_NEW_USER]: () => <NewUserScreen />,
  [paths.WELCOME_NEW_TEAM]: () => <NewTeamScreen />,
 
  [paths.AUTH_SIGNIN]: () => <AppSignInScreen signUp={false}/>,
  [paths.AUTH_SIGNUP]: () => <AppSignInScreen signUp={true}/>,
  
  [paths.AUTH_SUCCESS]: () => <SignInSuccess />,
  [paths.AUTH_SIGNOUT]: () => <SignOut />
}

function AppAuthRoutes() {
  const [initialized, user, team, init] = useAuthStore(state => [
    state.initialized,
    state.user,
    state.team,
    state.actions.init
  ])

  useEffect(() => {
    if (!initialized) return
    // intercom.updateIntercomUserData(user, team)
  }, [initialized, user && user.id, team && team.id])

  useEffect(() => init(), [])

  const routeResult = useRoutes(routes)
  return routeResult || <HTTPRedirect href={paths.ROOT} />
}

export default hot(AppAuthRoutes)
