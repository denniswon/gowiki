import { Formik, FormikActions, FormikProps } from 'formik'

import React from 'react'
import * as Yup from 'yup'

import { authApi, trackerAuth } from '@gowiki/api'
import { config, logger } from '@gowiki/core'

import Appear from 'components/animation/Appear'
import FormikInput from 'components/global/forms/FormikInput'
import SubmitButton from 'components/global/forms/SubmitButton'
import SubmitFeedback from 'components/global/forms/SubmitFeedback'
import InfoBox from 'components/global/InfoBox'
import { authWebApi } from 'stores/authWebStore'

import styled from 'styled-components'
import { c, m } from 'styles'

type Props = {
  signUp: boolean
  invite?: string
  oauthPopup?: (email: string) => Window
  teamId?: string
  showForm?: boolean
  redirectHere?: boolean

  setOutsideStatus?: (status: { error: any, email: string }) => void
}

type Values = {
  email: string
  code: string
  redirectHere: boolean
}

type State = {
  email: string
  code: string
  submittedEmail?: boolean
  demoMode?: boolean
  triedGoogle?: boolean
  isInputVisible?: boolean
}

class EmailLogInForm extends React.Component<Props, State> {
  formik: Formik = null

  state: State = {
    email: '',
    code: '',
    isInputVisible: false,
  }

  interval: number

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval)
      this.interval = null
    }
  }

  componentDidMount() {
    if (this.props.showForm && !this.state.isInputVisible) {
      this.setState({ isInputVisible: true })
    }
  }

  render() {
    const { email, code } = this.state

    const initialValues: Values = {
      email,
      code,
      redirectHere: this.props.redirectHere
    }

    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is invalid')
    })

    return (
      <Formik
        ref={ref => (this.formik = ref)}
        initialValues={initialValues}
        validationSchema={validationSchema}
        render={this.renderForm}
        onSubmit={this.onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      />
    )
  }


  renderForm = (fp: FormikProps<Values>) => {
    const { values, isSubmitting, status, handleSubmit, handleChange } = fp
    const { submittedEmail, demoMode, isInputVisible } = this.state

    const submitLabel = submittedEmail ? 'Log In' : 'Continue with work email'

    const params = new URLSearchParams(location.search)
    this.state.triedGoogle = params.get('doNotTryGoogle') == 'true'

    const onClickSubmit = () => {
      if (isInputVisible) handleSubmit()
      else this.setState({ isInputVisible: true})
    }

    return (
      <m.Form w="100%" onSubmit={e => e.preventDefault() }>
        <Appear on={isInputVisible} fadeIn>
          <m.Divider mv={28} />
          <FormikInput
            type="email"
            autoFocus
            label="Work Email Address"
            placeholder="Your work email address..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            name="email"
            onChange={ev => {
              handleChange(ev)
              if (submittedEmail) this.setState({ submittedEmail: false })
            }}
            mb={16}
          />
        </Appear>


        {submittedEmail && (
          <>
            <InfoBox type="info" mb={4}>
              <b>Please, check your email</b><br/>
              We've sent a temporary authorization code to {values.email}. It may take a few minutes
              to arrive.
            </InfoBox>
            <FormikInput
              name="code"
              type="text"
              value={config.dev && values.code}
              autoFocus
              label="Authorization code"
              placeholder="Please paste authorization code"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
            />
          </>
        )}

        {demoMode && (
          <>
            <InfoBox type="info" mb={8}>
              Please input your demo password.
            </InfoBox>
            <FormikInput
              name="code"
              type="text"
              autoFocus
              label="Demo password"
              placeholder="Demo password"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
            />
          </>
        )}

        <StyledSubmitButton
          text={submitLabel}
          isSubmitting={isSubmitting}
          onClick={onClickSubmit}
          onSubmit={handleSubmit}
          w="100%"
          bg={c.white}
          color={c.black80}
          hoverColor={c.black}
          borderColor={c.black20}
          borderHoverColor={c.black50}
        >
          <m.T14 semi>
            {submitLabel}
          </m.T14>
        </StyledSubmitButton>

        <SubmitFeedback error={status && (status.error?.message?.msg || status.error?.message || status.error)} success={status && status.success} />

      </m.Form>
    )
  }

  onSubmit = (values, { setSubmitting, setStatus: setFormikStatus }: FormikActions<Values>) => {
    const { email, code, redirectHere } = values
    const { demoMode } = this.state
    const { setOutsideStatus } = this.props

    const { } = authApi.getState().actions
    const { postAuthRedirect, getStoredInvite } = authWebApi.getState().actions

    const invite = this.props.invite || getStoredInvite()

    const setStatus = (status: any) => {
      setFormikStatus(status)
      setOutsideStatus?.({...status, email})
    }

    setSubmitting(true)
    setStatus({ error: null })
  }
}

export default EmailLogInForm

const StyledSubmitButton = styled(SubmitButton)`
  &:hover{ transform:none; }
`