import { size } from 'lodash'
import React, { useState } from 'react'

import { API, useAuthStore } from '@gowiki/api'
import { emailToName, logger, PubSubAction, Team } from '@gowiki/core'
import { Icon } from '@gowiki/web'

import Input from 'components/global/forms/Input'
import SaveButton from 'components/global/forms/SaveButton'
import SettingsLayout from 'components/screens.settings/components/SettingsLayout'
import { useUIStore } from 'stores/uiStore'
import ProfileImageUploader from '../components/ProfileImageUploader'

import { Box, c, Column, m, Row, s } from 'styles'
import * as st from '../styles'

type Props = {}

const search = new URLSearchParams(location.search)
const uploadError = search.get('upload_error')

const MyAccount: React.FunctionComponent<Props> = (props: Props) => {
  const { } = props
  const [user, team, token, updateUser] = useAuthStore(state => [state.user, state.team, state.token, state.actions.updateUser])
  const [name, setName] = useState<string>(user.name)
  const [nickname, setNickname] = useState<string>(user.nickname)
  const [error, setError] = useState<string>(uploadError && 'Error uploading profile image')

  const onUpdate = async () => {
    setError(null)

    const updates = {}

    logger.info("Names", name, nickname, user.name, user.nickname)
    if (nickname != user.nickname) {
      if (nickname == null || nickname.trim().length == 0) {
        updates['nickname'] = null // So that UI will display the real name
      } else {
        updates['nickname'] = nickname.trim()
      }
    }

    if (name == null || name.trim().length == 0) {
      setError("Full Name may not be blank")
      return
    } else if (name.trim() != user.name) {
      updates['name'] = name
    }

    if (size(updates) > 0) {
      return updateUser({ name, nickname })
    }
  }

  return (
    <SettingsLayout>
      <st.ScreenTitle>Profile</st.ScreenTitle>

      <st.SettingsGroup>
        <m.SettingsTitle mb={12}>Profile Image</m.SettingsTitle>

        <Row vCenter mb={16}>
          <ProfileImageUploader user={user} team={team} token={token} />
        </Row>


        <m.SettingsTitle mt={24} mb={12}>Full Name</m.SettingsTitle>
        <Input maxw={400} value={name} onChange={e => setName(e.target.value)} mb={0} maxLength={100} flex1 />

        <m.SettingsTitle mt={24} mb={12}>Display Name</m.SettingsTitle>
        <Input maxw={400} value={nickname || ""} placeholder={name} onChange={e => setNickname(e.target.value)} mb={0} maxLength={50} flex1 />

      </st.SettingsGroup>

      <SaveButton buttonText="Update" errorText={error} onSave={onUpdate} successText="Profile Updated" />
    </SettingsLayout>
  )
}

export default MyAccount
