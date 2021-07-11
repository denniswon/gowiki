import React, { useState } from 'react'
import { appService } from 'services'

import { useAuthStore } from '@gowiki/api'
import { logger, Team, unwrapError } from '@gowiki/core'
import { ErrorMessage } from '@gowiki/web'

import Input, { StyledInputField } from 'components/global/forms/Input'
import SubmitButton from 'components/global/forms/SubmitButton'
import SettingsLayout from 'components/screens.settings/components/SettingsLayout'

import styled, { css } from 'styled-components'
import { Box, c, m, Row, s } from 'styles'
import * as st from '../styles'

enum SubmitState {
  UNSUBMITTED = 0,
  SUBMITTING,
  SUBMITTED,
}

const CreateNewTeam = () => {
  const [createTeam] = useAuthStore(state => [state.actions.createTeam])

  const [team, setTeam] = useState<Team>(Team.fromJSON({}))

  const [submitState, setSubmitState] = useState<SubmitState>(SubmitState.UNSUBMITTED)
  const [error, setError] = useState<string>(null)

  const onSubmit = async () => {
    setSubmitState(SubmitState.SUBMITTING)
    try {
      const newTeam = await createTeam(team, 'second')

      const blankTeam = Object.assign({}, team, { name: "" })
      setTeam(blankTeam)
    } catch (e) {
      logger.error('[AppCreateTeam]', e)
      setError(unwrapError(e))
    } finally {
      setSubmitState(SubmitState.SUBMITTED)
    }
  }

  const updateTeam = (update: Partial<Team>) => {
    if (update.meta) update.meta = Object.assign(team.meta || {}, update.meta)
    setTeam(Object.assign({}, team, update))
    return Promise.resolve()
  }

  return (
    <SettingsLayout>
      <st.SettingsGroup>
        <st.SettingsTitle>What's the name of your team?</st.SettingsTitle>
        <Input>
          {({ InputBox, isFocused, onFocus, onBlur }) => (
            <InputBox h={40} aic ph={m.units.sidebar.padding} isFocused={isFocused} mt={12} mb={32}>
              <InputField
                defaultValue=""
                placeholder="My team name"
                autoFocus
                autoComplete="off"
                onChange={e => updateTeam({ name: e.currentTarget.value })}
                onFocus={e => {
                  e.target.select()
                  onFocus()
                }}
                onBlur={onBlur}
                disabled={submitState === SubmitState.SUBMITTING}
              />
            </InputBox>
          )}
        </Input>
      </st.SettingsGroup>

      <Row mt={0}>
        <SubmitButton
          text={submitState === SubmitState.SUBMITTED ? 'Team Created' : "Create New Team"}
          isSubmitting={submitState === SubmitState.SUBMITTING}
          isSubmitted={submitState === SubmitState.SUBMITTED}
          disabled={!team.name}
          onSubmit={onSubmit}
          w="100%"
          bg={
            submitState === SubmitState.SUBMITTED ? c.darkGreen :
            !team.name ? c.black60 : c.brand
          }
        />
      </Row>

      {error && <ErrorMessage error={'Sorry, there was an error.'} mt={12} />}

      <Box mt={40} />
    </SettingsLayout>
  )
}

export default CreateNewTeam

const teamNameStyle = css`
  ${m.t15} ${m.tMedium} font-weight:550;
`

const InputField = styled(StyledInputField)`
  ${teamNameStyle} margin:0;
  ${s.prel} top:-1px;
  &::placeholder {
    ${m.tRegular}
  }
`
