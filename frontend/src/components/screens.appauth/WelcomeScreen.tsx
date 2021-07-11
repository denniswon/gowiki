import React, { useState } from 'react'

import { usePageView } from 'utils/usePageView'

import { createGlobalStyle } from 'styled-components'

import LandingScreen from 'components/screens.landing/LandingScreen'

export default function WelcomeScreen() {
  usePageView('welcomeScreen', location.pathname)

  return (
    <>
      <LandingStyles />
      <LandingScreen />
    </>
  )
}

export const LandingStyles = createGlobalStyle<{ isLanding?: boolean }>`
  html, boyd, #react-app{ height:unset; min-height:unset ; }
`
