import { A, usePath } from 'hookrouter'
import React, { PropsWithChildren } from 'react'

import { useAuthStore } from '@gowiki/api'
import { appService } from '@gowiki/app'
import { config, isMac, paths, SETTINGS_ROUTES, User } from '@gowiki/core'
import { PressableProps } from '@gowiki/web'

import Alphatar from 'components/core/Alphatar'
import PopoverOption from 'components/popovers/PopoverOption'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'
import { StyledScrollbars } from './SettingsLayout'

const padding = 20

const sidebarBackground = '#F8F8F8'

type Props = {}

const SettingsSidebar: React.FunctionComponent<Props> = (props: Props) => {
  const [teams] = useAuthStore(state => [state.teams])
  const titleBarPadding = isMac ? 32 : 0 //In mac: the 3 window actions pushes sidebar content down

  return <Column bg={sidebarBackground} pt={titleBarPadding} borderRight={`1px solid ${c.black05}`}>
    <StyledScrollbars>

      <Column minw={208} pt={4} pb={12} ph={4}>

        <Item to={SETTINGS_ROUTES.PROFILE} icon='person' text="Profile" />
        <Item to={SETTINGS_ROUTES.PREFERENCES} icon="tune" text="Preferences" />
        <Item to={SETTINGS_ROUTES.NOTIFICATIONS} icon="notifications" text="Notifications" />
        
        <Separator />

        <Heading>Teams</Heading>
        {teams.map(t => {
          const icon = <Alphatar characters={t.name} bg={c.black10} color={c.black60} mr={m.units.popover.iconPadding} />
          return <Item key={t.id} to={`${SETTINGS_ROUTES.TEAM}${t.id}`} icon={icon} text={t.name} />
        })}
        <Item to={SETTINGS_ROUTES.NEW_TEAM} icon="add" text="Add new team" color={c.brand} hoverColor={c.brand} />

      </Column>
    </StyledScrollbars>
  </Column>
}

export default SettingsSidebar

type ItemProps = PropsWithChildren<{
  to?: string
  img?: string
  text?: string
  user?: User
  icon?: any
  iconComponent?: React.ReactNode
  onClick?: () => void
}> &
  BoxProps &
  PressableProps

const Item = (props: ItemProps) => {
  const { to, user, text, icon, onClick, children, ...rest } = props
  const path = usePath()
  const isActive = path.startsWith(to)

  const button = (
    <PopoverOption isActive={isActive} mh={8} icon={icon} onClick={onClick} text={user ? null : text} mb={1} {...rest}>
      {user && <PopoverOption.Text>{text}</PopoverOption.Text>}
      {children}
    </PopoverOption>)

  if (to) return <A href={to} style={{ 'WebkitUserDrag': 'none' } as any}>{button}</A>
  else return button
}

const Separator = p => <m.Divider {...p} mt={8} mb={16} mh={-4} />
const Heading = p => <m.T13 {...p} bold upcase op={0.4} mb={12} ml={16} />
