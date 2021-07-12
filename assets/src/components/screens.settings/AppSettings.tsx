import { setBasepath, useRoutes } from 'hookrouter'
import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import { tracker } from 'services'

import { useAuthStore } from '@gowiki/api'
import { useSettingsStore } from '@gowiki/app'
import { config, paths, SETTINGS_ROUTES } from '@gowiki/core'
import { Loader } from '@gowiki/web'

import PlainWindowHeader from 'components/app.header/PlainWindowHeader'
import Theme from 'components/global/Theme'
import PopoverModal from 'components/modals/PopoverModal'
import { HTTPRedirect } from 'components/screens.appauth/AppAuthRoutes'
import SettingsSidebar from 'components/screens.settings/components/SettingsSidebar'
import NotificationPreferences from 'components/screens.settings/preferences/NotificationPreferences'
import Preferences from 'components/screens.settings/preferences/Preferences'
import CreateNewTeam from 'components/screens.settings/screens/CreateNewTeam'
import ProfileScreen from 'components/screens.settings/screens/ProfileScreen'
import TeamSettingsScreen from 'components/screens.settings/screens/TeamSettingsScreen'
import { hot } from 'react-hot-loader/root'
import initializationService from 'services/initializationService'

import styled from 'styled-components'
import { Box, c, Column, m, Row } from 'styles'

setBasepath(paths.APP_SETTINGS)

export function AppSettings() {
  const [initialized, user, team, init] = useAuthStore(state => [state.initialized, state.user, state.team, state.actions.init])

  useEffect(() => {
    if (!initialized) init()
    else if (user) {
      initializationService.initSettingsScreen()
      document.body.addEventListener('keyup', (e) => {
        if (e.key === "Escape") {
          window.close()
        }
      })
    }
  }, [user?.id])

  if (!initialized) return <Box h='100%' center>
    <Loader color={c.black80} size={40} />
  </Box>

  if (!user) {
    window.close()
    return null
  }

  return <Theme theme={m.themes.whiteBackground} h="100%" col>
    <Helmet title="Tandem Settings" />
    <Column h="100%" w="100%">
      <PlainWindowHeader />
      <Wrapper flex1 style={{ overflow: 'hidden' }}>
        <SettingsSidebar />
        <SettingsRouter hasATeam={!!team} />

        <PopoverModal />
      </Wrapper>
    </Column>
  </Theme>
}

function SettingsRouter(props: { hasATeam: boolean }) {
  const [source, setSource] = useState<string>(null)
  useEffect(() => {
    setSource(new URL(location.href).searchParams.get('source'))
  }, [])

  const routeComponents: ({[route: string]: (props: any) => JSX.Element }) = {
    [SETTINGS_ROUTES.PROFILE]: () => <ProfileScreen />,
    [SETTINGS_ROUTES.NEW_TEAM]: () => <CreateNewTeam />
  }

  if (props.hasATeam) {
    routeComponents[SETTINGS_ROUTES.PREFERENCES] = () => <Preferences />
    routeComponents[SETTINGS_ROUTES.NOTIFICATIONS] = () => <NotificationPreferences />
    routeComponents[SETTINGS_ROUTES.TEAM + ':id'] = ({ id }) => <TeamSettingsScreen teamId={id} />
  }

  const routeResult = useRoutes(routeComponents)

  return routeResult || <HTTPRedirect href={`${paths.APP_SETTINGS}${SETTINGS_ROUTES.PROFILE}`} />
}

export default hot(AppSettings)

const Wrapper = styled(Row)`
  background: ${p => p.theme.background}; -webkit-user-select: none;
`

tracker.initialize()
