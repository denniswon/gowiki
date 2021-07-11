import React, { useState } from 'react'

import { logger } from '@gowiki/core'
import { Icon } from '@gowiki/web'

import FormButton from 'components/global/forms/FormButton'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  onSave?: () => Promise<void>
  buttonText?: string
  successText?: string
  errorText?: string
  successIcon?: string
  disabled?: boolean
} & BoxProps

const SaveButton: React.FunctionComponent<Props> = (props: Props) => {

  const { onSave, errorText, buttonText = 'Save', successText, successIcon = 'check', disabled, ...rest } = props

  const [isSaving, setSaving] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const onClickSave = async () => {
    setSaving(true)

    await onSave()

    setSaving(false)
    setSuccess(!errorText)
    setTimeout(() => {
      setSuccess(false)
    }, 1300)
  }

  return (
    <Row vCenter {...rest}>
      <FormButton asfs isSubmitting={isSaving} bg={c.brand} color={c.white} onClick={onClickSave}>
        {buttonText}
      </FormButton>

      {errorText && !success &&
        <Row vCenter>
          <m.T15 semi color={c.red} ml={24}>
            {errorText}
          </m.T15>
        </Row>}

      {successText &&
        <Row vCenter op={(success && !errorText) ? 1 : 0} style={{ transition: '300ms' }}>
          <m.T15 semi color={c.green} ml={24}>
            {successText}
          </m.T15>
          <Icon name={successIcon} color={c.green} ml={8} />
        </Row>
      }
    </Row>
  )
}

export default SaveButton
