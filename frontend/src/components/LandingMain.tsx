import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter, Route } from 'react-router-dom'

import 'url-search-params-polyfill'
import 'styles/index.css'

import { GlobalStyles } from 'styles'
import Routes from './LandingRoutes'
import HeadMeta from './HeadMeta'

export const Landing = () => {
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

export default hot(LandingMain)
