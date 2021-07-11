import { Formik, FormikActions, FormikProps } from 'formik'
import { navigate } from 'hookrouter'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

import {  useAuthStore } from '@gowiki/api'
import { logger, paths, Team, toTitleCase, unwrapError, User } from '@gowiki/core'
import { ErrorMessage } from '@gowiki/web'

import OrLine from 'components/core/OrLine'
import Checkbox from 'components/forms/Checkbox'
import FormikInput from 'components/global/forms/FormikInput'
import SubmitButton from 'components/global/forms/SubmitButton'
import SubmitFeedback from 'components/global/forms/SubmitFeedback'
import AppAuthLayout from 'components/screens.appauth/AppAuthLayout'
import ProfileImageUploader from 'components/screens.settings/components/ProfileImageUploader'
import { useAuthWebStore } from 'stores/authWebStore'
import { usePageView } from 'utils/usePageView'

import { Box, c, Column, m } from 'styles'
import * as styles from '../styles'

export default function NewUserScreen() {
  usePageView('createUserScreen')
  const [token, user, team, actions] = useAuthStore(s => [s.token, s.user, s.team, s.actions])
  const [webActions] = useAuthWebStore(s => [s.actions])

  useEffect(() => {
    if (!user) actions.init()
  }, [user])

  const onSubmit = async (values: Values, { setSubmitting, setStatus, setErrors }) => {
    actions.updateUser({ name: values.name, nickname: values.nickname })
    if (!team?.id) navigate(paths.WELCOME_NEW_TEAM)
    else if (!webActions.handlePostAuthRedirect()) {
      navigate(paths.APP_HOME)
    }
  }

  if (!user) return <AppAuthLayout isLoading />

  return <AppAuthLayout title='Welcome to Tandem!'>
    <Column w='100%' hCenter vCenter pb={20}>
      <Column hCenter maxw={340}>

        <styles.Title center={false} left bold mb={8}>
          Welcome to Tandem!
        </styles.Title>

        <Box center mv={30}>
          <ProfileImageUploader user={user} token={token} />
        </Box>

        <NewUserForm user={user} onSubmit={onSubmit} />
      </Column>
    </Column>
  </AppAuthLayout>
}

type Values = {
  name: string,
  nickname: string,
}

function NewUserForm(props: {
  user: User,
  onSubmit: (values: Values, actions: FormikActions<Values>) => void
}) {

  const initialValues: Values = {
    name: props.user.name,
    nickname: props.user.nickname || props.user.name,
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required('Name is invalid')
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

  const updateName = (name) => {
    fp.setFieldValue('name', name)
    const nameSpace = name?.indexOf(' ')
    if (nameSpace > 0) {
      const newNickname = name.substr(0, nameSpace)
      fp.setFieldValue('nickname', newNickname)
    } else {
      fp.setFieldValue('nickname', name)
    }
  }

  return (
    <m.Form w={440} onSubmit={handleSubmit}>

      <styles.InputLabel htmlFor='team'>Full Name</styles.InputLabel>

      <FormikInput type='name' autoFocus name='name' value={values.name} onChange={(e) => updateName(e.target['value'])} />

      <styles.InputLabel htmlFor='org' mt={36}>
        Display Name
      </styles.InputLabel>

      <FormikInput type='name' name='nickname' value={values.nickname} />

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


