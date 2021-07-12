import React from 'react'

import { useAuthStore } from '@gowiki/api'
import {
  SETTINGS_ROUTES, SettingsSource,
} from '@gowiki/core'
import { Icon, PressableProps } from '@gowiki/web'

import Alphatar from 'components/core/Alphatar'
import PopoverMenu from 'components/popovers/PopoverMenu'
import appService from 'services/appService'

import styled, { ThemeProvider } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row } from 'styles'

export default function TeamSwitcher({ ...rest }: BoxProps) {
  const [team, teams, switchTeam] = useAuthStore(state => [state.team, state.teams, state.actions.switchTeam])

  const onClickCreateTeam = () => {
    appService.showSettings(SETTINGS_ROUTES.NEW_TEAM, SettingsSource.SETTINGS_MENU)
  }

  if (!team || !teams) {
    return null
  }

  const onClickTeam = (teamId: string) => {
    if (team.id == teamId) return
    switchTeam(teamId, false)
  }

  const onClickSettings = (teamId: string) => {
    appService.showSettings(`/team/${teamId}`, SettingsSource.SETTINGS_MENU)
  }

  return (
    <PopoverMenu maxw={260} maxh='80vh' large {...rest}>
      <m.SideBarHeading mb={4}>YOUR TEAMS</m.SideBarHeading>

      <Column mb={-4}>
        {teams.map(t => {
          const isSameTeam = team.id == t.id
          return (
            <Row vCenter key={t.id}>
              <Pressable row vCenter prel onClick={() => onClickTeam(t.id)} flex1>
                {isSameTeam && <Box w={6} h="60%" bg={c.brand} pabs left={-4} borderRadius="0 4px 4px 0" />}
                <Alphatar size={36} textSize={14} characters={t.name} bg={c.black10} color={c.black70} mr={12} />
                <Column flex1>
                  <m.T16 semi={isSameTeam} multiLineEllipsis={2} medium={!isSameTeam}>
                    {t.name}
                  </m.T16>
                </Column>
              </Pressable>
              <m.Pressable row center p={8} mr={-16} onClick={() => onClickSettings(t.id)} title={'Team Settings'}>
                <Icon name="more_vert" />
              </m.Pressable>
            </Row>
          )
        })}

        <Pressable row vCenter prel onClick={onClickCreateTeam} iconOp={1} hoverColor={c.brand} mb={-8}>
          <Box row center sz={36} mr={12} bg={c.lightPurple} br={m.units.rounding}>
            <Icon name="add" color={c.brand} />
          </Box>
          <Column>
            <m.T16 medium>Create new team</m.T16>
          </Column>
        </Pressable>
      </Column>
    </PopoverMenu>
  )
}

type ListItem = {
  children: any
  onClick: () => void
} & PressableProps &
  BoxProps

const Pressable = ({ children, onClick, ...rest }: ListItem) => (
  <m.Pressable row vCenter p={12} pv={10} ml={-12} color={c.black} hoverBg={c.lightPurple} onClick={onClick} {...rest}>
    {children}
  </m.Pressable>
)
