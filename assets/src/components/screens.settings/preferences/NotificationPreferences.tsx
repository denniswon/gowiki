import moment from 'moment-timezone'
import React from 'react'

import { DND_START_FORMAT, useSettingsStore } from '@gowiki/app'

import SettingsLayout from 'components/screens.settings/components/SettingsLayout'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'
import * as st from '../styles'

type Props = {
}

export default function NotificationPreferences(props: Props) {
  const {} = props
  const [settings, actions] = useSettingsStore(state => [state, state.actions])

  return (
    <SettingsLayout>
      <st.ScreenTitle>Notifications</st.ScreenTitle>

      <st.SettingsGroup >

        <st.SettingsItem row vCenter>
          <Column flex1 mr={10}>
            <st.SettingsTitle flex1 mr={10}>
              Notification
            </st.SettingsTitle>
            {settings.soundsDisabled && <m.SettingsDesc>All Tandem sounds are disabled.</m.SettingsDesc>}
          </Column>
          <st.SettingsSwitch on={!settings.soundsDisabled} onClick={() => actions.toggleSoundsDisabled()} />
        </st.SettingsItem>

        <st.SettingsItem column vCenter>
          <Row>
            <st.SettingsTitle flex1 mr={10}>Notify me when a teammate joins a room</st.SettingsTitle>
            <st.SettingsSwitch on={settings.notification} onClick={() => actions.toggleRoomNotification()} />
          </Row>
        </st.SettingsItem>
      </st.SettingsGroup>

    </SettingsLayout>
  )
}

let hours = (startTime?: string) => {
  let t: moment.Moment

  if (startTime) {
    t = moment(startTime, DND_START_FORMAT, true)
  } else {
    t = moment().set({
      minute: 0,
      hour: 0,
    })
  }
  t.set({
    millisecond: 0,
    second: 0,
    date: 1,
    month: 0,
    year: 2000,
  })

  const hourList: {str: string, value: string}[] = []
  do {
    hourList.push({str: t.format('LT'), value: t.format(DND_START_FORMAT)})
    t.add(30, 'minutes')
  } while (t.dayOfYear() < 2)

  return hourList
}

let timezones = moment.tz.names()