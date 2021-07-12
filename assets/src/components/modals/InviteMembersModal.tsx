import React, { useState } from 'react'

import { useAuthStore, userById } from '@gowiki/api'
import { userDisplayName } from '@gowiki/app'
import { setCopyAdd } from '@gowiki/core'
import { Button } from '@gowiki/web'

import Modal from 'components/global/modals/Modal'
import ModalHeader from 'components/global/modals/ModalHeader'
import ModalPadding from 'components/global/modals/ModalPadding'
import Scrollbars from 'components/global/Scrollbars'

import { c, Column, m, Row } from 'styles'

// Generic model for inviting other team members to meetings, calls, etc.
type InviteMembersModalProps = {
  invitableUserIds: string[],
  title: string,
  invite: (userId: string) => void,
  isOpen: boolean,
  closeModal: () => void,
  filter?: (userId: string) => boolean
}

const InviteMembersModal =
  ({ invitableUserIds, title, invite, isOpen, closeModal, filter }: InviteMembersModalProps) => {
    const onClose = (event: React.MouseEvent | React.KeyboardEvent) => {
      event.stopPropagation()
      closeModal()
    }

    return (
      <Modal isOpen={isOpen} onRequestClose={onClose} >
        <ModalHeader title={title} onClickClose={e => onClose(e as any)} />
        <ModalPadding>
          <Heading>Choose teammates:</Heading>
          <InviteMemberBody invitableUserIds={invitableUserIds}
            invite={userId => invite(userId)} filter={filter} />
        </ModalPadding>
      </Modal>
    )
  }

const InviteMemberBody = ({ invitableUserIds, invite, filter }:
    { invitableUserIds: string[], invite: (userId) => void, filter?: (id: string) => boolean}) => {
  const [invitedSet, setInvited] = useState(new Set<string>())

  const doInvite = userId => {
    invite(userId)
    setInvited(setCopyAdd(invitedSet, userId))
  }

  return InviteMemberList(
    invitableUserIds,
    userId => {
      const invited = invitedSet.has(userId)
      return invited ? (
        <m.T16 color={c.green}>Sent</m.T16>
      ) : (
        <Button bg={c.lightPurple} color={c.brand} onClick={() => doInvite(userId)}>
          Invite
        </Button>
      )
    },
    filter
  )
}

const InviteMemberList = (
  invitableUserIds: string[],
  rowAction: (userId: string) => JSX.Element,
  filterFn?: (userId: string) => boolean
) => {
  const [members] = useAuthStore(state => [state.members])

  const invitableIds = filterFn ? invitableUserIds.filter(filterFn) : invitableUserIds

  return (
    <>
      <Scrollbars style={{ height: 'auto' }}>
        {invitableIds.map(presentUserId => {
          return (
            <Column key={presentUserId} mb={16}>
              <Row vCenter>
                <m.T15 ml={10} bold flex1>
                  {userDisplayName(userById(presentUserId))}
                </m.T15>
                {rowAction(presentUserId)}
              </Row>
            </Column>
          )
        })}

        {invitableIds.length == 0 && (
          <m.T14 op={0.9} italic center mv={30}>
            There's no one else online!
          </m.T14>
        )}
      </Scrollbars>
    </>
  )
}

export default InviteMembersModal

const Heading = p => <m.T14 medium op={0.6} mb={8} {...p} />

const pluralize = (num, noun) => `${num} ${noun}${num == 1 ? '' : 's'}`
