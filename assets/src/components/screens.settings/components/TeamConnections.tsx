import React from 'react'

import { useAuthStore } from '@gowiki/api'
import { Team } from '@gowiki/core'
import { BlueButton, GreyButton } from '@gowiki/web'

import Avatar from 'components/core/Avatar'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

type Props = {}

const TeamConnections: React.FunctionComponent<Props> = (props: Props) => {
  const [teams] = useAuthStore(state => [state.teams])

  return (
    <Column>
      {teams.map(t => (
        <TeamItem team={t} key={t.id} />
      ))}
    </Column>
  )
}

export default TeamConnections

type TeamItemProps = {
  team: Team
}
const TeamItem = (props: TeamItemProps) => {
  const { team } = props
  const { id, name } = team
  const connected = false

  return (
    <ItemWrapper vCenter pb={12} mb={12}>
      <Row vCenter flex1>
        <Avatar size={32} textSize={16} id={id} name={name} mr={12} />
        <m.T15 semi>{name}</m.T15>
      </Row>

      {!connected && (
        <BlueButton>
          <m.T15 semi>Connect</m.T15>
        </BlueButton>
      )}

      {connected && (
        <Row vCenter>
          <m.Pressable p={8} color={c.red} hoverColor={c.red} hoverBg={c.getRed(20)} mr={20}>
            <m.Text medium>Disconnect</m.Text>
          </m.Pressable>
          <GreyButton iconName="settings" iconSize={16} iconOp={0.8}>
            <m.T15 semi>Configure</m.T15>
          </GreyButton>
        </Row>
      )}
    </ItemWrapper>
  )
}

const ItemWrapper = styled(Row)`
  border-bottom: 1px solid ${c.black15};
  &:last-child {
    border: 0;
    padding-bottom: 0;
    margin-bottom: 0;
  }
`
