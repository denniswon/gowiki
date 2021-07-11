import { navigate } from 'hookrouter'
import React, { useEffect, useState } from 'react'
import { tracker } from 'services'

import { useAuthStore } from '@gowiki/api'
import { paths } from '@gowiki/core'

import AppAuthLayout from 'components/screens.appauth/AppAuthLayout'
import { usePageView } from 'utils/usePageView'

import { Box, c, Column, m, Row, s } from 'styles'
import * as styles from '../styles'

import InviteLinkCopierInline from '../InviteLinkCopierInline'
import EmailInvitesForm from './EmailInvitesForm'

type Props = {}

enum Result {
  SENT_EMAILS = 'sent_emails',
  SKIPPED = 'skipped'
}

const EmailInvitesScreen: React.FunctionComponent<Props> = (props: Props) => {
  const [initialized, team] = useAuthStore(state => [state.initialized, state.team])
  usePageView('emailInvitesScreen')

  if (!initialized) return null

  if (!team) {
    navigate(paths.ROOT)
    return null
  }


  const title = 'Who else is on your team?'

  const onDone = (result: Result) => {
    tracker.emailInvitesScreenResult(team.name, result)
    navigate(paths.APP_HOME)
  }

  return (
    <AppAuthLayout title={title}>
      <Column w="100%" maxw={340}>
        <styles.Title>{title}</styles.Title>
        <EmailInvitesForm team={team} onSent={() => onDone(Result.SENT_EMAILS)} forceInvite source='EmailInvitesScreen' />

        <styles.Heading mt={48}>Or, get an invite link to share:</styles.Heading>

        <InviteLinkCopierInline source={'EmailInviteScreen'} />

        <styles.Skip row center mt={40}>
          <m.Text op={0.5}>Or,</m.Text>
          <m.Pressable color={c.black} op={0.5} p={6} hoverOp={1} onClick={() => onDone(Result.SKIPPED)}>
            skip for now
          </m.Pressable>
        </styles.Skip>
      </Column>
    </AppAuthLayout>
  )
}

export default EmailInvitesScreen
