import React, { useCallback, useEffect, useState } from 'react'

import { trackerAuth } from '@gowiki/api'
import { logger, unwrapError } from '@gowiki/core'
import { ErrorMessage } from '@gowiki/web'

import FormButton from 'components/global/forms/FormButton'
import GoogleIcon from 'components/global/icons/GoogleIcon'

import styled from 'styled-components'
import { BoxProps, c, Column, m, s } from 'styles'

const SCOPE_PREFIX = "https://www.googleapis.com/auth/"
export const CALENDAR_SCOPES = ["calendar.readonly", "calendar.events.readonly"]
export const PROFILE_SCOPES = ["userinfo.email", "userinfo.profile"]

type Props = {
  button?: React.ReactNode
  scope?: string
  desc: string
  whiteButton?: boolean
  skipToken?: boolean

  // if set, the built-in error text won't display
  onTandemAuthError?: (error: string) => void
  onGoogleAuthError?: (error: string) => void

  onSuccess: (response: GoogleResponse) => Promise<void>
  email?: string
} & BoxProps

export type GoogleResponse = {
  access_token: string,
  expires_in: number,
  scope: string,
  token_type: string

  id_token?: string,
  refresh_token?: string,
  code?: string,
}

let popup

export default function GoogleServerOAuth(props: Props) {
  const { button, desc, onSuccess, whiteButton, onGoogleAuthError, onTandemAuthError, scope, skipToken, email, ...rest } = props
  const [isRequesting, setIsRequesting] = useState(false)
  const [error, setError] = useState<string>(null)

  const LoginButton = (p: { onClick: () => void }) => {
    if (button) {
      return <div {...p}>{button}</div>
    }

    const bg = whiteButton ? c.white : c.brand
    const color = whiteButton ? c.black : c.white

    return (
      <FormButton data-testid="google" isSubmitting={isRequesting} bg={bg} color={color} shadowColor={c.black10} defaultShadow
        pv={16} ph={18}
        {...p} {...rest}>
        <GoogleIcon />
        <m.T14 semi ml={12}>
          {desc}
        </m.T14>
      </FormButton>
    )
  }

  const RenderError = () => {
    if (!error) return null
    return (
      <>
        <ErrorMessage error={error} mt={12} mb={24} />
        {error.includes('third-party') && (
          <m.T16 mt={20}>
            In Google Chrome, go to Settings, search for "Cookies", click on "Site Settings" &gt; Cookies and either
            uncheck "Block third-party cookies" or add tandem.chat under the "Allow" section.
          </m.T16>
        )}
      </>
    )
  }

  const displayError = (error: string, tandemError: boolean) => {
    setIsRequesting(false)
    if (tandemError && onTandemAuthError) {
      onTandemAuthError(error)
    } else if (onGoogleAuthError) {
      onGoogleAuthError(error)
    } else {
      setError(error)
    }
  }

  const onLoginFail = response => {
    if (!response) return
    trackerAuth.googOAuthError(response.error)
    displayError(`Login failed. ${response.error}`, false)
  }

  const onLoginSuccess = useCallback(async (response: GoogleResponse) => {
    logger.info(response)
    let type = []
    if (response.scope) {
      if (scopesInclude(PROFILE_SCOPES, response.scope)) {
        type.push("login")
      }
      if (scopesInclude(CALENDAR_SCOPES, response.scope)) {
        type.push("calendar")
      }
    } else {
      type = ["nil"]
    }
    trackerAuth.googOAuthSuccess(type.join('-'))
    try {
      await onSuccess(response)
    } catch (e) {
      logger.warn("catch", e)
      displayError(unwrapError(e), true)
    } finally {
      setIsRequesting(false)
    }
  }, [onSuccess])

  const onClick = useCallback(() => {
    setError(null)
    popup = makeGoogleOauthPopup(scope, skipToken, email)
    setIsRequesting(true)
  }, [])

  useEffect(() => {
    popup = null
  }, [])

  useEffect(() => {
    let interval = null
    if (isRequesting) {
      interval = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(interval)
          setIsRequesting(false)
        }
      }, 5000)
      return () => clearInterval(interval)
    } else if (interval) {
      clearInterval(interval)
    }
  }, [isRequesting])

  useEffect(() => {
    const messageListener = (message) => {
      const data = message.data
      if (!data || data.type != 'oauth') return
      logger.info(data)

      setIsRequesting(false)
      if (data.event == 'closed') return

      if (data.error) onLoginFail(data)
      else if (data.result) onLoginSuccess(data.result)
    }

    window.addEventListener('message', messageListener)
    return () => window.removeEventListener('message', messageListener)
  }, [onLoginSuccess])

  return <Column>
    <LoginButton onClick={onClick} />
    <RenderError />
  </Column>
}

export function makeScopeString(scopes: string[]): string {
  return scopes.map((s) => `${SCOPE_PREFIX}${s}`).join(' ')
}

export function scopesInclude(expected: string[], returned: string): boolean {
  return expected.map((s) => { return returned.includes(SCOPE_PREFIX + s) }).reduce((prev, curr) => { return prev && curr })
}

export function makeGoogleOauthPopup(scope: string, skipToken: boolean = false, email: string = null) {

  let type = []
  if (scope.includes("profile")) {
    type.push("login")
  }
  if (scope.includes("calendar")) {
    type.push("calendar")
  }
  trackerAuth.googOAuthStart(type.join('-'))

  logger.debug("making oauth popup for scope", scope)
  const w = 600
  const h = 850
  const left = window.screenLeft + (window.innerWidth / 2) - (w / 2)
  const top = window.screenTop + (window.innerHeight / 2) - (h / 2)
  const features = `toolbar=no, menubar=no, width=${w}, height=${h}, left=${left}, top=${top}`
  const url = '/oauth/google?' + (scope ? `scope=${scope}&` : '')
    + (skipToken ? `skip_token=true&` : '')
    + (email ? `email=${encodeURIComponent(email)}` : '')
  const popup = window.open(url, 'google', features)
  return popup
}

