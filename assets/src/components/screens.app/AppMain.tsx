import React, { useEffect } from 'react'
import { tracker } from 'services'

import { useAuthStore } from '@gowiki/api'
import { config, minAppVersion } from '@gowiki/core'
import { Box } from '@gowiki/styles-global'
import { Loader } from '@gowiki/web'

import AppHomeScreen from 'components/screens.app/AppHomeScreen'
import { hot } from 'react-hot-loader/root'

import { c } from 'styles'

import AppSignIn from './AppSignIn'

export function AppMain() {
  const [initialized, user, team, saveToken, init] = useAuthStore(state => [
    state.initialized,
    state.user,
    state.team,
    state.actions.saveToken,
    state.actions.init
  ])
  const loggedIn = !!user

  useEffect(() => {
    if (initialized) return
    
    const url = new URLSearchParams(window.location.search)
    const token = url.get('token')
    if (token) {
      saveToken(token)
      location.href = location.pathname // clear token from path
    }
    init()
    // tracker.initialize(config.amplitude.desktop)
  }, [initialized])

  useEffect(() => {
    if (!initialized) return
    if (user) {
      // intercom.updateIntercomUserData(user, team)
    }
  }, [initialized, user && user.id, team && team.id])

  if (!initialized) {
    return <Box bg={c.white} h='100%' w='100%' center>
      <Loader color={c.black50} />
    </Box>
  }

  return <>{loggedIn ? <AppHomeScreen /> : <AppSignIn />}</>
}

export default hot(AppMain)
