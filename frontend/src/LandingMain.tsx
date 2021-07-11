import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter, Route } from 'react-router-dom'

import 'url-search-params-polyfill'
import 'styles/landing.css'

import { useAuthStore } from '@gowiki/api'
import { config } from '@gowiki/core'

import { tracker } from 'services'

import { GlobalStyles } from 'styles'

import HeadMeta from 'components/core/HeadMeta'
import Routes from 'components/routes/LandingRoutes'

export const Landing = () => {
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

  return <>
    <HeadMeta />
    <GlobalStyles isLanding />
    <Routes />
  </>
}

export const LandingMain = () => (
  <BrowserRouter>
    <Route path="/" component={Landing} />
  </BrowserRouter>
)

if (!navigator.userAgent.includes('jsdom')) {
  // non-prerendered logic
  const url = new URLSearchParams(location.search)
  const isDesktop = window.navigator.userAgent.indexOf('Tandem') > -1
  if (location.pathname == '/app' && !isDesktop) {
    const path = url.get('path')
    location.href = 'tandem:/' + path + location.search
    setTimeout(() => (location.href = path), 400)
  }

  tracker.initialize()
  tracker.trackRef(url.get('ref'), document.referrer, url.get('utm_source'))
}

export default hot(LandingMain)
