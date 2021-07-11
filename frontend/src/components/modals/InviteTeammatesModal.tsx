import React, { useState } from 'react'

import { useAuthStore } from '@gowiki/api'
import { Switch } from '@gowiki/web'

import Modal from 'components/global/modals/Modal'
import ModalHeader from 'components/global/modals/ModalHeader'
import ModalPadding from 'components/global/modals/ModalPadding'
import InviteLinkCopierInline from 'components/screens.appauth/InviteLinkCopierInline'
import EmailInvitesForm from 'components/screens.appauth/signup/EmailInvitesForm'
import { useUIStore } from 'stores/uiStore'

import styled from 'styled-components'
import { m, Row } from 'styles'

type Props = {}

const SOURCE = 'inviteTeammatesModal'

const InviteTeammatesModal: React.FunctionComponent<Props> = (props: Props) => {
  const [isModalOpen, toggleModal] = useUIStore(state => [
    state.showInviteTeammatesModal,
    state.actions.toggleInviteTeammatesModal
  ])

  const close = () => toggleModal(false)

  return (
    <Modal isOpen={isModalOpen} onRequestClose={close} >
      {isModalOpen && <Content close={close} />}
    </Modal>
  )
}

function Content({ close }: { close: () => void }) {
  const team = useAuthStore(state => state.team)
  const [expires, setExpires] = useState(true)
  const [inviteError, setError] = useState(null)

  if (inviteError) return <>
    <ModalHeader title='Invite Teammates' onClickClose={close}/>
    <ModalPadding withHeader>
      <m.T16 mv={8}>{inviteError}</m.T16>
    </ModalPadding>
  </>

  return <>
    <ModalHeader title='Invite Teammates' onClickClose={close}/>

    <ModalPadding>
      <m.T15 semi mb={8}>Send an email invitation</m.T15>

      <EmailInvitesForm team={team} defaultInputCount={1} onSent={close} source='InviteTeammatesModal' />

      <m.Divider mv={20} mh={-m.units.modal.padding}/>

      <m.T15 semi mb={8}>Or, copy an invite link</m.T15>

      <InviteLinkCopierInline source={SOURCE} forever={!expires} onError={(e) => setTimeout(() => setError(e), 0)} />

      <m.Divider mv={20} mh={-m.units.modal.padding}/>

      <Row>
        <m.T13 medium op={0.6} flex1 mr={8}>{!expires ? 'Invite link never expires' : 'Invite link expires in 14 days'}</m.T13>
        <Switch size={14} on={expires} onClick={() => setExpires(!expires)} />
      </Row>

    </ModalPadding>


  </>

}

export default InviteTeammatesModal
