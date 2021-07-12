import React, { useEffect, useState } from 'react'

import { API, trackerAuth, useAuthStore } from '@gowiki/api'
import { Member, Role, Team } from '@gowiki/core'
import { Loader } from '@gowiki/web'

import { uiApi } from 'stores/uiStore'

import styled from 'styled-components'
import { Box, c, Column, m, Row } from 'styles'
import * as st from '../styles'

import apiErrorPopover from '../apiErrorPopover'
import TeamMemberOptionsPopover from './TeamMemberOptionsPopover'

type Props = {
  teamId: string
}

const TeamMembersList: React.FunctionComponent<Props> = ({ teamId }) => {
  const user = useAuthStore(state => state.user)
  const [team, setTeam] = useState<Team>()
  const [isAdmin, setIsAdmin] = useState(false)

  const loadTeam = () => {
    let cancelled = false
    API.getTeam({ id: teamId }).then(response => {
      if (cancelled) return
      const team = Team.fromJSON(response.team)
      team.members = team.members.sort((a, b) => {
        if (a.id == user.id) return -1
        if (b.id == user.id) return 1
        return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
      })
      const userMember = team.members.find(m => m.id === user.id)
      if (userMember?.role === Role.ADMIN) {
        setIsAdmin(true)
      }
      setTeam(team)
    })
    return () => cancelled = true
  }
  useEffect(() => { setTeam(undefined); loadTeam() }, [teamId])

  const onClickRemove = (member: Member) => {
    const { showPopover, clearPopover } = uiApi.getState().actions
    showPopover(`Are you sure you want to remove ${member.name}?`, null, async (okPressed: boolean) => {
      clearPopover()
      if (!okPressed) return
      await apiErrorPopover(
        () => API.removeMember(team, member),
        "There was a problem removing that team member."
      )
      loadTeam()
      trackerAuth.teamMemberRemove(team, member)
    })
  }

  const onClickSetRole = (member: Member, role: Role) => {
    const { showPopover, clearPopover } = uiApi.getState().actions
    const article = role === Role.ADMIN ? "an" : "a"
    showPopover(`Are you sure you want to make ${member.name} ${article} ${role}?`, null, async (okPressed: boolean) => {
      clearPopover()
      if (!okPressed) return
      await apiErrorPopover(
        () => API.updateMember(team, member, { role }),
        "There was a problem changing that team member's role."
      )
      loadTeam()
      trackerAuth.teamMemberAssignRole(team, member, role)
    })
  }

  return (
    <st.SettingsGroup>
      <st.SettingsHeader iconName="people">Team Members</st.SettingsHeader>

      {!team
        ? <Box mt={20}><Loader color={c.black80} /></Box>
        : team.members.map(member => {
          const nextRole = member.role === Role.ADMIN ? Role.MEMBER : Role.ADMIN
          return (
            <Row vCenter h={60} key={member.id}>

              <Column flex1>
                <Row vCenter mb={2}>
                  <m.T15 medium mr={4}>{member.name}</m.T15>
                  {isAdmin && <m.T15 medium color={c.black40} mr={8}>({member.email})</m.T15>}
                  {member.role == Role.ADMIN && (
                    <m.T11 bold bg={c.brand} color={c.white} br={4} pt={2} pb={1} ph={4}>
                      admin
                    </m.T11>
                  )}
                </Row>
              </Column>

              {team.role === Role.ADMIN && user.id !== member.id &&
                <TeamMemberOptionsPopover
                  onClickRemove={() => onClickRemove(member)}
                  onClickSetRole={() => onClickSetRole(member, nextRole)}
                  nextRole={nextRole}
                />
              }
            </Row>
          )
        })
      }
    </st.SettingsGroup>
  )
}

export default TeamMembersList
