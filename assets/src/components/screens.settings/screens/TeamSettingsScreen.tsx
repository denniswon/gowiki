import { navigate } from 'hookrouter'
import React, { useState } from 'react'

import { useAuthStore } from '@gowiki/api'
import { Role, SETTINGS_ROUTES, Team } from '@gowiki/core'

import Alphatar from 'components/core/Alphatar'
import Input from 'components/global/forms/Input'
import SaveButton from 'components/global/forms/SaveButton'
import InviteLinkCopierInline from 'components/screens.appauth/InviteLinkCopierInline'
import TeamMembersList from 'components/screens.settings/components/TeamMembersList'
import { useAuthWebStore } from 'stores/authWebStore'
import SettingsLayout from '../components/SettingsLayout'

import { c, Column, m, Row } from 'styles'
import * as st from '../styles'

type Props = {
  teamId: string
}

const TeamSettingsScreen: React.FunctionComponent<Props> = (props: Props) => {
  const { teamId } = props
  const teams = useAuthStore(state => state.teams)
  const team = teams.find(t => t.id == teamId)

  return (
    <SettingsLayout key={teamId}>
      <Row vCenter mb={60}>
        <Alphatar mr={12} size={36} textSize={16} characters={team.name} bg={c.black10} color={c.black60} />
        <st.ScreenTitle mb={0}>{team.name}</st.ScreenTitle>
      </Row>

      <TeamMembersList teamId={team.id} />

      <Column vCenter mb={60}>
        <st.SettingsTitle mb={24} flex1>Invite More Teammates</st.SettingsTitle>
        <InviteLinkCopierInline team={team} source={'TeamSettingsScreen'} />
      </Column>

      {team.role == Role.ADMIN && <AdminSettings team={team} />}

      <LeaveTeamSettings team={team} />
    </SettingsLayout>
  )
}

export default TeamSettingsScreen

type TeamProps = {
  team: Team
}

const AdminSettings = ({ team }: TeamProps) => {
  const [updateTeam] = useAuthStore(state => [state.actions.updateTeam])
  const [name, setName] = useState<string>(team.name)

  return (
    <st.SettingsGroup>
      <st.SettingsHeader iconName="build">Team Admin Settings</st.SettingsHeader>

      <st.SettingsItem row vCenter jcsb>
        <m.SettingsTitle mr={40} flex1>Team Name</m.SettingsTitle>
        <Input maxw={400} h={39} value={name} onChange={e => setName(e.target.value)} mb={0} mr={8} maxLength={30} flex1 />
        <SaveButton onSave={() => updateTeam(team, { name })} buttonText="Update" disabled={!name} />
      </st.SettingsItem>

    </st.SettingsGroup>
  )
}

const LeaveTeamSettings = (props: TeamProps) => {
  const leaveTeam = useAuthWebStore(state => state.actions.leaveTeam)

  const onClick = () => {
    leaveTeam(props.team, true)
    navigate(SETTINGS_ROUTES.PROFILE)
  }

  return <st.SettingsItem row aifs>
    <m.Pressable asfs color={c.red} hoverBg={c.getRed(15)} hoverColor={c.red} p={8} mh={-8}
      onClick={onClick}>
      <m.T15 semi>Leave team</m.T15>
    </m.Pressable>
  </st.SettingsItem>
}
