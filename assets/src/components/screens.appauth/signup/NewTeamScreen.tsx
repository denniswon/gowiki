import { Formik, FormikActions, FormikProps } from 'formik'
import { navigate } from 'hookrouter'
import React, { useEffect, useState } from 'react'
import { tracker } from 'services'
import * as Yup from 'yup'

import { API, trackerAuth, useAuthStore } from '@gowiki/api'
import { logger, paths, Team, toTitleCase, unwrapError } from '@gowiki/core'
import { ErrorMessage, SecondaryButton } from '@gowiki/web'

import OrLine from 'components/core/OrLine'
import Checkbox from 'components/forms/Checkbox'
import FormikInput from 'components/global/forms/FormikInput'
import SubmitButton from 'components/global/forms/SubmitButton'
import SubmitFeedback from 'components/global/forms/SubmitFeedback'
import AppAuthLayout from 'components/screens.appauth/AppAuthLayout'
import { useAuthWebStore } from 'stores/authWebStore'
import { usePageView } from 'utils/usePageView'

import { c, Column, m, Row } from 'styles'
import * as styles from '../styles'

enum Mode {
  JOIN_TEAM,
  CREATE_TEAM
}

type JoinTeamProps = {
  domain: string
  onClickCreateTeam: () => void
  signUpTeam: (team: Partial<Team>, source?: string) => Promise<Team>
}

export default function NewTeamScreen() {
  usePageView('newTeamScreen')
  const [user, { createOrJoinTeam }] = useAuthStore(state => [state.user, state.actions])

  let screenMode = Mode.CREATE_TEAM
  const [mode, setMode] = useState<Mode>(screenMode)
  const [domain, setDomain] = useState<string>(undefined)
  const onClickCreateTeam = () => setMode(Mode.CREATE_TEAM)

  useEffect(() => {
    if (user) {
      setDomain(user.email.split("@")[1])
    }
  }, [user])

  if (!user) {
    return (
      <AppAuthLayout title='New Team'>
        <Column w='100%' hCenter vCenter pb={20}>
          <m.T18>
            Sorry, we don't have information about the team you're creating.
            <br />
            <br />
            <m.Anchor href={paths.ROOT}>Go home</m.Anchor>
          </m.T18>
        </Column>
      </AppAuthLayout>
    )
  } else {
    return (
      <AppAuthLayout title='New Team'>
        <Column w='100%' hCenter vCenter pb={20}>
          <m.T14>Loading...</m.T14>
        </Column>
      </AppAuthLayout>
    )
  }
}

function JoinTeam({ domain, onClickCreateTeam, signUpTeam }: JoinTeamProps) {
  usePageView('joinTeamByDomainScreen')

  const [submittingJoinTeam, setSubmittingJoinTeam] = useState<string>(null)
  const [errorJoinTeam, setErrorJoinTeam] = useState<string>(null)
  const [webActions] = useAuthWebStore(s => [s.actions])

  const joinDomainTeam = async (teamId: string) => {
    setSubmittingJoinTeam(teamId)
    const team = { id: teamId }
    try {
      // intercom.trackEvent('google-join-team', { domain, teamId })
      await signUpTeam(team, 'join-team')
      setErrorJoinTeam(null)

      if (!webActions.handlePostAuthRedirect()) {
        navigate(paths.APP_HOME)
      }
    } catch (e) {
      trackerAuth.createTeamError(e.message)
      logger.error('Error joinDomainTeam: ', e)
      setErrorJoinTeam(unwrapError(e, 'Error joining team'))
    } finally {
      setSubmittingJoinTeam(null)
    }
  }

  return (
    <>
      <m.T24 center mt={100} color={c.black60}>
        Welcome to the virtual office
      </m.T24>
      <m.T24 center mb={30} mt={8} color={c.black}>
        Join or create a team
      </m.T24>
      <Column mb={-12} w={600}>
        {[].map((dt, i) => <Row key={i} pv={10} vCenter flex1
            style={{ borderTop: `1px solid ${c.black10}` }}>

          <m.T18 semi mr={10}>{dt.name}</m.T18>
          <m.T14 op={0.5} flex1>{`${dt.membercount} member${dt.membercount != 1 ? 's' : ''}`}</m.T14>
          <SubmitButton
            key={dt.id}
            isSubmitting={submittingJoinTeam == dt.id}
            bg={dt.private ? c.black50 : c.brand}
            color={c.white}
            onSubmit={() => joinDomainTeam(dt.id)}
            shadowColor={c.black10}
            defaultShadow
            title={dt.private ? 'See info about this team' : 'Join this team'}
            p='16px 18px'
          >{dt.private ? 'Private' : 'Join'}</SubmitButton>
        </Row>)}
      </Column>
      {errorJoinTeam && <ErrorMessage error={errorJoinTeam} mt={16} />}

      <OrLine w='100%' maxw={200} mv={40} />

      <SecondaryButton
        iconName='add'
        onClick={onClickCreateTeam}
        mb={12}
        w={300}
      >
        <m.T16 bold>Create New Team</m.T16>
      </SecondaryButton>

      <AskForAnInvite />
    </>
  )
}

type Values = {
  org: string,
  team: string,
  domain: string,
  orgId: string,
  autoDomain: boolean,
  originalOrgName: string,
  error: string
}

type CreateTeamProps = {
  domain: string
  org?: { id: string, name: string }
  signUpTeam: (team: Partial<Team>, source: string) => void
}

function CreateTeam({ domain, signUpTeam, org }: CreateTeamProps) {
  usePageView('createTeamScreen')
  const [webActions] = useAuthWebStore(s => [s.actions])

  const defaultName = domain ? toTitleCase(domain.replace('.com', '')) : ''

  const onSubmitNewTeam = async (values: Values, { setSubmitting, setStatus, setErrors }) => {
    const referrer = tracker.getReferrer()
    const team = {
      name: values.team,
      domain: values.autoDomain ? domain : null,
      referrer
    }
    const newOrg = {
      id: values.autoDomain ? values.orgId : null,
      name: values.org,
      domain: values.autoDomain ? domain : null,
    }
    try {
      // intercom.trackEvent('create-team', { domain, name: values.team })
      trackerAuth.createTeam(team.name, team.domain)
      await signUpTeam(team, 'sign-up')
      setSubmitting(false)
      setStatus({ success: 'Team Created!' })
    } catch (e) {
      trackerAuth.createTeamError(e.message)
      setSubmitting(false)
      setStatus({ error: unwrapError(e) })
    }
  }

  return (
    <>
      <Column hCenter maxw={340}>

        <NewTeamForm defaultName={org ? org.name : defaultName} orgId={org?.id} onSubmit={onSubmitNewTeam} domain={domain} />

        {/* TODO: put 'By continuing, you're agreeing to our Customer Terms of Service, Privacy Policy, and Cookie Policy. */}

        <AskForAnInvite />
      </Column>
    </>
  )
}


export const AskForAnInvite = () => (
  <m.T14 lh={24} center op={0.5} mt={40}>
    Are you looking to join an existing team?
    <br />
    Ask your teammates for an invite link
  </m.T14>
)


function NewTeamForm(props: {
  domain: string,
  defaultName: string,
  orgId: string,
  onSubmit: (values: Values, actions: FormikActions<Values>) => void
}) {
  const initialValues: Values = {
    org: props.defaultName,
    team: '',
    domain: props.domain,
    autoDomain: true,
    orgId: props.orgId,
    originalOrgName: props.defaultName,
    error: null
  }

  const validationSchema = Yup.object().shape({
    org: Yup.string().trim().required('Organization is invalid'),
    team: Yup.string().trim().required('Team is invalid'),
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      render={renderForm}
      onSubmit={props.onSubmit}
    />
  )
}

function renderForm(fp: FormikProps<Values>) {
  const { values, isSubmitting, status, handleSubmit } = fp

  return (
    <m.Form w={440} onSubmit={handleSubmit}>

      <styles.Title center={false} left bold mb={8}>
        Let's create your team
      </styles.Title>

      <styles.PageDescription mb={36}>
        A team is a group of people that collaborate and talk together.
      </styles.PageDescription>

      <styles.InputLabel htmlFor='team'>Team Name</styles.InputLabel>

      <FormikInput type='name' autoFocus placeholder='e.g. Product Team, Design, Marketing' name='team'
        value={values.team} />

      {(!values.autoDomain || !values.orgId) && <>
        <styles.InputLabel htmlFor='org' mt={36}>
          Organization Name
        </styles.InputLabel>

        <FormikInput type='name' placeholder='My Organization' name='org'
          value={values.org} />
      </>}

      {values.domain && (
        <Checkbox
          name='domainSignUp'
          checked={values.autoDomain}
          onChange={checked => fp.setValues({ ...values, autoDomain: checked })}
          p={0}
          style={{ cursor: 'pointer' }}
        >
          <m.T14 op={0.6}>
            {values.orgId ? `Make this team part of the ${values.originalOrgName} organization` :
              <>Let other people sign up with their verified <strong>@{values.domain}</strong> email address</>}
          </m.T14>
        </Checkbox>
      )}

      <SubmitButton
        text='Next'
        iconName='arrow_forward'
        useRightIcon
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        w='100%'
        bg={c.brand}
        mt={36}
      />

      <SubmitFeedback error={status && status.error} success={status && status.success} />
    </m.Form>
  )
}

