import React, { useEffect, useState } from 'react'

import { userDisplayName } from '@gowiki/app'
import { config, logger, paths, setCopyToggle, unwrapError } from '@gowiki/core'
import { ErrorMessage, Icon } from '@gowiki/web'

import Avatar from 'components/core/Avatar'
import Checkbox from 'components/forms/Checkbox'
import SubmitButton from 'components/global/forms/SubmitButton'
import AppAuthLayout from 'components/screens.appauth/AppAuthLayout'
import { usePageView } from 'utils/usePageView'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row } from 'styles'

import EmailInvitesScreen from './EmailInvitesScreen'

// intermediate data structures to abstract away slack vs google
export type InvitableTeam = {
  creatorId: string
  icon: string
  name: string
}
export type InvitableUser = {
  id: string
  name: string
  nickname: string
  avatar: string
}

export default function InviteScreen({ type }: { type: string }) {
  usePageView('inviteTeamScreen', type)
  if (type == 'email') return <EmailInvitesScreen />
  else
    return (
      <AppAuthLayout title="Error">
        <ErrorMessage error={`Invalid type '${type}'`} />

        <Box mt={20}>
          <m.Anchor href={paths.ROOT}>Back home</m.Anchor>
        </Box>
      </AppAuthLayout>
    )
}

type Props = {
  team: InvitableTeam
  members: InvitableUser[]
  initChecked: Set<string>
  initError: boolean
  submitFn: (name: string, users: string[]) => Promise<any>
}

export function InviteScreenCore({ initChecked, members, team, initError, submitFn }: Props) {
  const [checked, setChecked] = useState<Set<string>>(undefined)

  useEffect(() => {
    setChecked(initChecked)
  }, [initChecked])

  if (initError)
    return (
      <AppAuthLayout title="Error">
        <ErrorMessage error="Error loading team information" />

        <Box mt={20}>
          <m.Anchor href={paths.ROOT}>Back home</m.Anchor>
        </Box>
      </AppAuthLayout>
    )

  if (team === undefined || members === undefined || checked === undefined) return <AppAuthLayout isLoading />

  const toggleAll = () => {
    if (checked.size >= members.length - 1) setChecked(new Set())
    else setChecked(new Set(members.map(u => u.id)))
  }

  const me = members ? members.find(m => m.id == team.creatorId) : null
  const name = me ? userDisplayName(me) : null

  return (
    <AppAuthLayout title="Invite Your Team">
      <m.ResponsiveRow center>
        <Avatar id={team.name} imageUrl={team.icon} name={team.name} size={48} textSize={20} br={8} />
        <m.T20 center mv={8} ml={[0, 20]} style={{ display: 'block' }}>
          You've created&nbsp;<b>{team.name}</b>
        </m.T20>
      </m.ResponsiveRow>

      <m.T28 bold center mt={48} mb={30}>
        Let's add your teammates
      </m.T28>

      <Column>
        {members.map(member => {
          const isYou = member.id == team.creatorId
          const isChecked = isYou || checked.has(member.id)
          return (
            <UserRow
              key={member.id}
              vCenter
              p={8}
              onClick={() => !isYou && setChecked(setCopyToggle(checked, member.id))}
            >
              {!isYou && <Checkbox name={member.id} checked={isChecked} />}
              {isYou && <Icon color={c.green} name="check" size={24} mr={12} />}

              <Avatar id={member.id} imageUrl={member.avatar} name={member.name} ml={4} size={32} minw={32} />
              <m.T16 ml={8}>
                <m.Text as="span" bold={isChecked}>
                  {member.name}
                </m.Text>
                &nbsp;
                {isYou && (
                  <m.Text display="inline" op={0.5}>
                    (you)
                  </m.Text>
                )}
              </m.T16>
            </UserRow>
          )
        })}

        <m.Pressable onClick={toggleAll} mv={16} ml={8}>
          <m.T14 color={c.black50}>Check / Uncheck All</m.T14>
        </m.Pressable>

        {/* TODO uncomment when domain logic is ready */}
        {/* <m.Pressable maxw={340} p={0} bg={c.black05} hoverBg={c.lightPurple} color={c.black} br={6}>
          <Checkbox name='domainSignUp' checked={allowDomainSignup} onChange={checked => setDomainSignUp(checked)} p={16} style={{cursor: 'pointer'}}>
            <m.T14>Let other people sign up with their verified <strong>@{teamDomain}</strong> email address</m.T14>
          </Checkbox>
        </m.Pressable> */}
      </Column>

      <SubmitInviteButton
        name={name}
        team={team}
        invite={checked}
        mt={45}
        maxw={250}
        emptyTeam={members.length <= 1}
        submitFn={submitFn}
        mb={40}
      />
    </AppAuthLayout>
  )
}

function SubmitInviteButton({
  submitFn,
  team,
  name,
  invite,
  emptyTeam,
  ...rest
}: {
  submitFn: (name: string, users: string[]) => Promise<any>
  name: string
  emptyTeam: boolean
  team: InvitableTeam
  invite: Set<string>
} & BoxProps) {
  const [isSubmitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>(null)

  const handleSubmit = () => {
    const inviteArray = Array.from(invite).filter(i => i != team.creatorId)
    if (inviteArray.length == 0) {
      if (!config.dev && !emptyTeam) {
        setError('You need to invite at least one person')
        return
      }
    }

    setSubmitting(true)
    setError(null)
    submitFn(name, inviteArray).catch(e => {
      logger.error(e)
      setError(unwrapError(e))
      setSubmitting(false)
    })
  }

  return (
    <>
      <SubmitButton
        text="Continue"
        iconName="arrow_forward"
        useRightIcon
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        w="100%"
        bg={c.brand}
        {...rest}
      />
      <ErrorMessage error={error} mt={20} />
    </>
  )
}

const UserRow = styled(Row).attrs({ ph: 12 })`
  cursor: pointer;
  border-radius: 6px;
  &:hover {
    background: ${c.getBrand(10)};
    .checkbox-box {
      border-color: ${c.brand};
    }
  }
  > * {
    user-select: none;
  }
`
