import React, { useState } from 'react'

import { Button } from '@gowiki/web'

import Input from 'components/global/forms/Input'
import Modal from 'components/global/modals/Modal'
import ModalPadding from 'components/global/modals/ModalPadding'
import { useUIStore } from 'stores/uiStore'

import { Box, c, Column, m, Row, s } from 'styles'

export type Props = {
  message: string
  buttons?: string[]
  action?: (okPressed: boolean, input?: string) => void
  input?: string
}

function PopoverModalBody(props: Props) {
  const { message, action, buttons, input } = props

  const [text, setText] = useState(input ? '' : null)

  return (
    <ModalPadding center>
      <m.T16 mb={20} medium>{message}</m.T16>
      {input && <Input autoFocus placeholder={input} value={text}
        onChange={e => setText(e.target.value)} onKeyUp={e => e.key == 'Enter' && action(true, text)} />}
      {action && (
        <Row aic>
          <Button mr={20} onClick={() => action(true, text)}>
            {buttons[0]}
          </Button>
          {buttons[1] && (
            <Button bg={c.black50} onClick={() => action(false)}>
              {buttons[1]}
            </Button>
          )}
        </Row>
      )}
    </ModalPadding>
  )
}

PopoverModalBody.defaultProps = {
  buttons: ['OK', 'Cancel']
}

export default function PopoverModal() {
  const [popoverModal, clearPopover] = useUIStore(state => [
    state.popoverModal,
    state.actions.clearPopover
  ])

  return (
    <Modal
      isOpen={!!popoverModal}
      contentLabel="Message"
      onRequestClose={() => (popoverModal.action ? popoverModal.action(false) : clearPopover())}
      contentStyles={{ minWidth: 250, width: null }}
    >
      {popoverModal && <PopoverModalBody {...popoverModal} />}
    </Modal>
  )
}
