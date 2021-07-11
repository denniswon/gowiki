import React, { useEffect, useState } from 'react'
import { tracker } from 'services'

import { config, draggingClass, isMac } from '@gowiki/core'
import { Button, Loader } from '@gowiki/web'

import WindowsTopBar from 'components/app.header/WindowsTopBar'
import LogoTandem from 'components/core/LogoTandem'
import EmailLogInForm from 'components/forms/EmailLogInForm'
import FormButton from 'components/global/forms/FormButton'
import HelpButtonPopover from 'components/popovers/HelpButtonPopover'
import AppLayout from 'components/screens.app/AppLayout'
import appService from 'services/appService'
import { useAuthWebStore } from 'stores/authWebStore'

import { Box, c, Column, m } from 'styles'

const signInUrl = 'https://tandem.chat/auth/signin'

export default function AppSignIn() {
  const [waitingForSignin, setWaitingForSignin] = useState(false)

  const onClickSignIn = () => {
    tracker.amplitudeLogEvent('clickSignIn')
    location.href = '/auth'
    setWaitingForSignin(true)
  }

  const havingTroubleClick = () => {
    tracker.amplitudeLogEvent('havingTroubleClick')
    appService.openUrl(signInUrl)
  }

  useEffect(() => {
    tracker.amplitudeLogEvent('signIn')

    const search = new URLSearchParams(location.search)
    const existingCode = search.get('lc')
  }, [])

  return (
    <AppLayout className={draggingClass}>
      {!isMac && <WindowsTopBar bg={c.black50} className={'app-dragging'} hideMax />}
      <Column hCenter jcsa h={"100%"} ph={20} overflow="auto">
        <Column hCenter flxWrap pt={30} jcfe flex1>
          <LogoTandem height={40} />
        </Column>

        {config.dev && !waitingForSignin && <Box maxw={400}>
          <EmailLogInForm showForm={true} signUp={false} />
        </Box>}

        <Column mb={20} hCenter flex1 jcc>
          <FormButton w={180} onClick={onClickSignIn} iconName="arrow_forward" useRightIcon mv={20}
            isSubmitting={waitingForSignin}
          >
            {waitingForSignin ? 'Signing in' : 'Sign In'}
          </FormButton>

          {waitingForSignin && <>
            <m.T13 row medium center mt={20} className='app-non-dragging' style={{ userSelect: 'text' }}>
              <m.Text op={0.7} mr={6}>Having trouble? Visit <m.Anchor href="#" onClick={havingTroubleClick}>
                  {signInUrl}
                </m.Anchor>
              </m.Text>
            </m.T13>
          </>}
        </Column>

      </Column>
      <HelpButtonPopover />
    </AppLayout>
  )
}