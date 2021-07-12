import React, { useEffect, useState } from 'react'

import { NameDisplayOption, useSettingsStore } from '@gowiki/app'
import { isMac, minAppVersion, Themes } from '@gowiki/core'

import SettingsLayout from '../components/SettingsLayout'

import { Box, Column, m, Row } from 'styles'
import * as st from '../styles'

type Props = {}

const Preferences: React.FunctionComponent<Props> = () => {
  const [settings, actions] = useSettingsStore(state => [state, state.actions])
  const [] = useState(false)

  useEffect(() => { actions.computeDisplayNameSetting() })

  const showAppPreferences = isMac && minAppVersion('1.5.917')
  const AppPreferences = () => (
    <>
      <st.SettingsItem row vCenter>
        <Column flex1 mr={10}>
          <st.SettingsTitle>Hide app from dock</st.SettingsTitle>
          <m.SettingsDesc>Tandem Icon will not show in the dock or {isMac ? 'CMD' : 'Alt'} + Tab list.</m.SettingsDesc>
        </Column>
        <st.SettingsSwitch on={false} onClick={() => {}} />
      </st.SettingsItem>
    </>
  )

  const DisplayPreferences = () => (
    <>
      <st.SettingsItem row vCenter>
        <Column flex1 mr={16}>
          <st.SettingsTitle>Names</st.SettingsTitle>
          <st.SettingsDesc>How your and teammates' account names are displayed on Tandem.</st.SettingsDesc>
        </Column>
        <st.Select value={settings.nameDisplayOption} onChange={e => actions.setNameDisplayOption(e.target.value as NameDisplayOption)}>
          <option value={NameDisplayOption.SHOW_DISPLAY_NAME_ONLY}>Show display name only</option>
          <option value={NameDisplayOption.SHOW_FULL_NAME}>Show full name</option>
        </st.Select>
      </st.SettingsItem>

      <st.SettingsItem row vCenter>
        <Column flex1 mr={16}>
          <st.SettingsTitle>Dark Mode</st.SettingsTitle>
        </Column>
        <st.SettingsSwitch on={settings.theme == Themes.DARK} onClick={() => actions.toggleDarkMode()} />
      </st.SettingsItem>
    </>
  )

  return (
    <SettingsLayout>
      <st.ScreenTitle>Preferences</st.ScreenTitle>

      <st.SettingsGroup>
        <st.SettingsHeader iconName="palette">Display</st.SettingsHeader>
        <DisplayPreferences />
      </st.SettingsGroup>

      {showAppPreferences && (
        <st.SettingsGroup>
          <st.SettingsHeader iconName="laptop_mac">App Behavior</st.SettingsHeader>
          <AppPreferences />
        </st.SettingsGroup>
      )}
    </SettingsLayout>
  )
}

export default Preferences
