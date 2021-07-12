import { navigate } from 'hookrouter'
import React, { useEffect, useState } from 'react'

import { API, useAuthStore } from '@gowiki/api'
import { getPlatform, isMobile, paths } from '@gowiki/core'
import { Button, Icon, Loader } from '@gowiki/web'

import AppAuthLayout from 'components/screens.appauth/AppAuthLayout'
import { HTTPRedirect } from 'components/screens.appauth/AppAuthRoutes'
import { useAuthWebStore } from 'stores/authWebStore'
import { usePageView } from 'utils/usePageView'

import { c, Column, m } from 'styles'
import { PageTitle } from '../styles'

import { openTandem } from '../openTandem'

export default function SignInSuccess() {
  usePageView('appSignInSuccess')

  const [done, setDone] = useState(false)
  const [user, token, teams] = useAuthStore(state => [state.user, state.token, state.teams])
  const [getLoginCode] = useAuthWebStore(state => [state.actions.getLoginCode])

  useEffect(() => {
    if (!token) return navigate(paths.AUTH_SIGNIN)
    if (teams.length == 0) return

    const loginCode = getLoginCode()
    if (loginCode) {
      API.loginSuccess(loginCode).then(() => setDone(true))
    } else {
      openTandem({ token })
      const handle = setTimeout(() => setDone(true), 2000)
      return () => clearTimeout(handle)
    }
  }, [token])

  if (teams && teams.length == 0) {
    return <HTTPRedirect href={paths.WELCOME_NEW_TEAM} />
  }

  return (
    <AppAuthLayout title="Success" vCenter>
      {!done && (
        <>
          <Loader color={c.black} size={52} mb={60} />

          <PageTitle>
            Authenticating Tandem
          </PageTitle>
        </>
      )}

      {done && (
        <>
          <PageTitle>Success!</PageTitle>
          {(true) ? <>
            <m.T16>(Loading Tandem...)</m.T16>
          </> : getPlatform() === 'andr-web' ? <>
            <m.T16 op={0.8}>
              Tandem mobile app is available for iOS (alpha) smartphones/tablets.
              <br/><br />
              Android version is coming soon! Until then, you can try the mobile web version.
            </m.T16>
            <Button mt={20} onClick={() => location.href = '/app/main'}>
              Try the mobile website (beta)
            </Button>
          </> : <>
            <m.T16>(you can close this tab now)</m.T16>

            <m.T16 mt={50}>
              If nothing's happening, {' '}

              <m.Anchor onClick={() => openTandem({ token })}>click here to launch</m.Anchor>
              , or {' '}
              {getPlatform() === 'ios-web' &&
                <m.Anchor href={paths.APP_HOME}>click here to download Tandem</m.Anchor>}.
            </m.T16>
          </>}

          <m.T16 mt={30}>
            If you need to sign in as a different user than {user.email},{' '}
            <m.HookLink href={paths.AUTH_SIGNOUT}>click here to sign out</m.HookLink>.
          </m.T16>

        </>
      )}
    </AppAuthLayout>
  )
}
