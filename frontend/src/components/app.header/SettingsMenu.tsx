import React from 'react'

import { useAuthStore } from '@gowiki/api'
import { useSettingsStore } from '@gowiki/app'
import { config, paths, SETTINGS_ROUTES, SettingsSource, Themes, User } from '@gowiki/core'
import { Icon, Switch } from '@gowiki/web'

import PopoverMenu from 'components/popovers/PopoverMenu'
import PopoverOption from 'components/popovers/PopoverOption'
import appService from 'services/appService'
import { authWebApi } from 'stores/authWebStore'
import { useUIStore } from 'stores/uiStore'

import { Box, BoxProps, c, Column, m, Row } from 'styles'

type Props = {
}

export default function SettingsMenu(props: Props) {
  const { } = props
  const [user, team, logout] = useAuthStore(state => [
    state.user,
    state.team,
    state.actions.logout,
  ])
 
  const [hasDarkMode, toggleDarkMode] = useSettingsStore(state => [
    state.theme == Themes.DARK,
    state.actions.toggleDarkMode
  ])

  if (!team || !user) {
    return null
  }
  const [toggleInviteTeammatesModal] = useUIStore(state => [state.actions.toggleInviteTeammatesModal])

  const logoutApp = () => {
    const signoutPath = authWebApi.getState().actions.signOutUrl()
    appService.openUrl(signoutPath)
    logout(false)
    location.href = location.pathname + '?lc=' + authWebApi.getState().actions.loginCode
  }

  const settingsClick = (settingsPath: string) => (e: MouseEvent) => {
    appService.showSettings(settingsPath, SettingsSource.SETTINGS_MENU)
  }

  return (
    <PopoverMenu w={232} maxw={260} maxh='85vh'>

      <PopoverOption icon='person' text='Profile' onClick={settingsClick(SETTINGS_ROUTES.PROFILE)} />

      <PopoverOption icon='tune' text='Preferences' onClick={settingsClick(SETTINGS_ROUTES.PREFERENCES)} />

      <PopoverOption text='Dark Mode'
        icon={<PopoverOption.Icon name='brightness_2' style={{transform: 'rotate(180deg)'}} />}
        onClick={toggleDarkMode}
      >
        <Box flex1 />
        <Switch on={hasDarkMode} />
      </PopoverOption>

      <PopoverMenu.Divider />

      <PopoverOption icon='people' text='Team Settings'
        onClick={settingsClick(`${SETTINGS_ROUTES.TEAM}${team.id}`)}
      />

      <PopoverOption icon='add' text='Invite teammates'
        onClick={() => toggleInviteTeammatesModal(true)}
      />

      <PopoverMenu.Divider />

      <PopoverOption onClick={logoutApp}>
        <PopoverOption.Text flex1>Log Out</PopoverOption.Text>
        <m.T12 flex={2} style={{ display: 'block' }} ellipsize medium op={0.5}>
          {user.email}
        </m.T12>
      </PopoverOption>

    </PopoverMenu>
  )
}