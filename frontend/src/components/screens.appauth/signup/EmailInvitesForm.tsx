import React, { useState } from 'react'
import { tracker } from 'services'

import { API } from '@gowiki/api'
import { logger, Team, unwrapError } from '@gowiki/core'
import { ErrorMessage, Icon } from '@gowiki/web'

import FormButton from 'components/global/forms/FormButton'
import Input from 'components/global/forms/Input'

import styled from 'styled-components'
import { c, m, Row } from 'styles'

type Props = {
  team: Team
  defaultInputCount?: number
  forceInvite?: boolean
  onSent: () => void
  source: string
}

const EMAIL_RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const EmailInvitesForm: React.FunctionComponent<Props> = (props: Props) => {
  const { team, onSent, forceInvite = false, defaultInputCount = 3, source } = props
  const [error, setError] = useState<string>(null)
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const [inputs, setInputs] = useState<string[]>([... new Array(defaultInputCount).map(() => '')])
  const nonBlankInputs = inputs.filter(i => i && i.length > 0)
  const canContinue = !forceInvite || nonBlankInputs.length > 0

  const setInput = (index, value) => {
    const newInputs = [...inputs]
    newInputs[index] = value
    setInputs(newInputs)
  }

  const onChangeEmailInput = (index, value) => {
    setInput(index, value)
  }

  const addExtraInput = e => {
    setInputs([...inputs, ''])
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const emails = nonBlankInputs.map(i => i.replace(/ /g, ''))
      if (emails.length == 0) {
        setError(`Please enter a teammate's email address`)
        return
      }
      if (emails.some(e => !EMAIL_RE.test(e))) {
        setError(`Please enter valid email addresses`)
        return
      }

      setSubmitting(true)
      // await API.sendInvites(team, emails.map(email => ({ email })))
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        tracker.emailInvitesSend(team.name, emails.length, source)
        onSent()
      }, 1000)
    } catch (e) {
      logger.error('[EmailInvitesForm]', e)
      const message = unwrapError(e)
      setError(`Error sending invitations: ${message}`)
      tracker.emailInvitesError(message)
    } finally {
      setSubmitting(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.which == 13) {
      const el: any = document.querySelector(`#input${index + 1}`)
      if (el != null && el.focus) el.focus()
      else onSubmit(e)
    }
  }

  const tooltipContent = canContinue ? (
    ''
  ) : (
    <Row vCenter>
      <m.T24 mr={12}>🤝</m.T24>
      <m.T14 medium op={0.9}>
        Tandem requires a team! Please invite at least one teammate.
      </m.T14>
    </Row>
  )

  return (
    <m.Form w="100%" autoComplete="false" onSubmit={onSubmit}>
      {inputs.map((i, index) => (
        <EmailInputContainer prel key={index}>
          <EmailInput
            id={`input${index}`}
            value={i||''}
            autoFocus={index == 0}
            onChange={e => onChangeEmailInput(index, e.currentTarget.value)}
            onKeyDown={e => onKeyDown(e, index)}
          />
        </EmailInputContainer>
      ))}

      <Row vCenter jcfs mt={0} mb={16}>
        <m.Pressable row vCenter p={6} mh={-6} color={c.brand} onClick={addExtraInput}>
          <Icon name="add" size={16} mr={4} />
          <m.T14 medium>Add another</m.T14>
        </m.Pressable>
      </Row>

      {/* <Tooltip
        content={tooltipContent}
        placement="top"
        p={'12px 16px'}
        style={{ overflow: 'unset' }}
        hideOnClick={false}
      > */}
        <FormButton
          id="SubmitButton"
          w="100%"
          useRightIcon
          onClick={onSubmit}
          isSubmitting={isSubmitting}
          bg={success ? c.darkGreen : c.brand}
          iconOp={success ? 1 : 0.7}
          iconName={success ? 'check_circle' : 'arrow_forward'}
        >
          {success ? 'Invitations sent' : 'Send Invitations'}
        </FormButton>
      {/* </Tooltip> */}

      {error && <ErrorMessage mt={8} error={error} />}
    </m.Form>
  )
}

export default EmailInvitesForm

const EmailInput = p => <Input type="email" flex1 placeholder="name@example.com" mb={8} autoComplete="false" {...p} />

const EmailInputContainer = styled(Row)`
  .icon {
    opacity: 0;
  }
  &:hover .icon {
    opacity: 1;
  }
`
