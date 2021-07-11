import React, { useEffect, useState } from 'react'

import { tracker, trackerAuth, useAuthStore } from '@gowiki/api'
import { logger, OAuthProvider, paths, unwrapError } from '@gowiki/core'
import { Button2 as Button, ErrorMessage, Loader, SecondaryRedButton } from '@gowiki/web'

import EmailLogInForm from 'components/forms/EmailLogInForm'
import Link from 'components/global/Link'
import GoogleServerOAuth, {
    CALENDAR_SCOPES, GoogleResponse, makeGoogleOauthPopup, makeScopeString, PROFILE_SCOPES,
    scopesInclude
} from 'components/screens.appauth/GoogleServerOAuth'
import { Web } from 'components/web/Web'
import { useAuthWebStore } from 'stores/authWebStore'

import { Box, c, Column, m } from 'styles'

type Props = {
  invite?: string
  signUp: boolean
  setSignUp?: (signUp: boolean) => void

  outsideError?: string
  teamId?: string
  skipCalendar?: boolean // skip calendar oauth
  redirectHere?: boolean // whether to redirect back to this page after authentication
}

export default function SignInForm({ invite, signUp, setSignUp, outsideError, redirectHere, skipCalendar }: Props) {
  const [initialized, actions] = useAuthStore(state => [state.initialized, state.actions])
  const webActions = useAuthWebStore(state => state.actions)

  const [error, setError] = useState<any>(outsideError)
  const [savedGoogleResponse, setSavedGoogleResponse] = useState<GoogleResponse>(undefined)
  const [googleLoginFailed, setGoogleLoginFailed] = useState<boolean>(undefined)
  const [tandemAccountMissing, setTandemAccountMissing] = useState<boolean>(undefined)
  const [missingGoogleScopes, setMissingGoogleScopes] = useState<boolean>(undefined)
  const [googleEmail, setGoogleEmail] = useState<string>(undefined)
  const [nonOauthEmail, setNonOauthEmail] = useState<string>(undefined)

  // if we do the sign-in -> sign-up flow, just let them continue without calendar permissions, and we can have them add them later as if they ignored them
  const [defaultScopes, _] = useState(signUp && !skipCalendar ? PROFILE_SCOPES.concat(CALENDAR_SCOPES) : PROFILE_SCOPES)

  const [expectedScopes, setExpectedScopes] = useState<string[]>(defaultScopes)

  useEffect(() => {
    if (redirectHere) webActions.storePostAuthRedirect(location.href)
    else webActions.clearPostAuthRedirect()
  }, [initialized, redirectHere])

  const scope = (scopes?: string[]) => { return makeScopeString(scopes || expectedScopes) }

  const loginGoogle = async (response: GoogleResponse, customScopes: string[] = null, overrideSignup?: boolean) => {
    setSavedGoogleResponse(response)
    if (scopesInclude(customScopes || expectedScopes, response.scope)) {
      const result = await actions.logInElseSignUpOAuth(OAuthProvider.GOOGLE, response.id_token, invite, overrideSignup ?? signUp)
      return webActions.postAuthRedirect(result, redirectHere)
    } else {
      setMissingGoogleScopes(true)
    }
  }

  const createAccountWithSavedResponse = () => {
    setSignUp?.(true)
    setExpectedScopes(defaultScopes)
    loginGoogle(savedGoogleResponse, defaultScopes, true)
  }

  const unconditionalLoginHandler = async () => {
    if (savedGoogleResponse) {
      trackerAuth.googOAuthForce('login')
      await loginGoogle(savedGoogleResponse, PROFILE_SCOPES)
    }
  }

  const googleAuthError = (error: any) => {
    logger.info("googleAuthError", error)
    setSavedGoogleResponse(null)
    setGoogleLoginFailed(true)
  }

  const tandemAuthError = (error: any) => {
    logger.info("tandemAuthError", error)
    if (typeof error === 'string' && error?.includes("access_denied")) {
      setMissingGoogleScopes(true)
    } else if (typeof error === 'object' && error.msg?.includes('no account')) {
      setGoogleEmail(error.email)
      setTandemAccountMissing(true)
    } else {
      if (error?.message?.email) {
        setError(error.message)
      } else {
        setError(error)
      }
    }
  }

  const fallbackLoginHandler = async () => {
    if (googleLoginFailed) {
      setExpectedScopes(PROFILE_SCOPES)
      return makeGoogleOauthPopup(scope(PROFILE_SCOPES))
    }
  }

  const probablyMeantToSignUp = tandemAccountMissing && ((savedGoogleResponse && googleEmail) || nonOauthEmail)

  useEffect(() => {
    if (probablyMeantToSignUp) {
      setSignUp?.(true)
    }
  }, [probablyMeantToSignUp])

  const signInReset = () => {
    window.location.reload()
  }

  const emailStatusChange = (props: { error: any, email: string }) => {
    const { email, error } = props
    setNonOauthEmail(email)
    if (error?.request?.status === 404) {
      setTandemAccountMissing(true)
    }
  }

  if (!initialized) {
    return <Web.Loader asc />
  }

  const googleDesc = (savedGoogleResponse || googleLoginFailed) ? "Try another Google account" : ( signUp ? "Continue with Google" : "Sign in with Google" )

  const oauthPopup = (email: string): Window => {
    return makeGoogleOauthPopup(scope(), false, email)
  }

  if (savedGoogleResponse || googleLoginFailed) {
    tracker.pageView('signinCalendarExplanation')
  }

  return (
    <>
      {missingGoogleScopes &&
        <Box hCenter maxw={520} w={'100%'} ph={0}>
          <m.T20 bold mb={8} tCenter>Why connect your calendar?</m.T20>
          <m.T15 mb={8} medium paragraph tCenter op={0.7}>
            Connecting your calendar helps your teammates know when you're busy, and also makes it easy to find and join meetings.
            <Link target="_blank" href="https://intercom.help/tandem_help/en/articles/4038887-meeting-rooms" display="inline">
              Learn More
            </Link>
          </m.T15>
          <m.T14 mb={8} op={0.5} tCenter paragraph>(We won’t invite or email anyone without your explicit permission.)</m.T14>
        </Box>
      }

      {probablyMeantToSignUp ? <>
        <m.T18 medium mb={32}>Looks like {googleEmail || nonOauthEmail} doesn’t have an account yet.</m.T18>

        <Box column center w={300}>
          {googleEmail && <Button p={12} column color={c.white} w='100%' onClick={createAccountWithSavedResponse}>
            <m.T15 semi mb={4}>Create a new account</m.T15>
            <m.T13 medium op={0.7}>with {googleEmail}</m.T13>
          </Button>}
          {nonOauthEmail && <>
            <EmailLogInForm {...{ oauthPopup, signUp: true, invite, redirectHere }} />
          </>}

          <m.HookLink href={paths.AUTH_SIGNIN} onClick={signInReset}>
            <SubtleText mt={24}>
              Or, Sign in with different account
            </SubtleText>
          </m.HookLink>
        </Box>
      </> :
        <Box column center w={300}>
          <Box w={'100%'}>
            <GoogleServerOAuth w='100%' scope={scope()} onGoogleAuthError={googleAuthError} onTandemAuthError={tandemAuthError} onSuccess={loginGoogle} desc={googleDesc}/>
          </Box>
          {!savedGoogleResponse && !googleLoginFailed && <Box mt={12} w='100%'>
            <EmailLogInForm {...{ oauthPopup, signUp, invite, redirectHere }} setOutsideStatus={emailStatusChange} />
          </Box>}
        </Box>
      }

      {missingGoogleScopes &&
        <m.Anchor mt={24} center onClick={unconditionalLoginHandler} color={c.black50}>
          <m.Text medium>Or, continue without calendar permissions</m.Text>
        </m.Anchor>
      }

      {googleLoginFailed && <>
        <m.Anchor mt={24} center onClick={fallbackLoginHandler} color={c.black50}>
          <m.Text medium>Or, continue without calendar permissions</m.Text>
        </m.Anchor>
      </>}

      {error || probablyMeantToSignUp && <Column mt={150} center>
        {error && <ErrorMessage tCenter mb={25} error={error?.msg || error} />}
        {error && !probablyMeantToSignUp && !signUp && <Box mb={30}>
          <m.HookLink href={paths.AUTH_SIGNUP} onClick={() => setError(null)}>
            <SubtleText>
              New user? Create an account instead &rarr;
            </SubtleText>
          </m.HookLink>
        </Box>}
      </Column>}

    </>
  )
}

const SubtleText = (props: any) => <m.T14 medium op={0.6} color={c.ink} {...props} />