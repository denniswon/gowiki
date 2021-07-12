import { navigate } from 'hookrouter'
import React from 'react'

import { useAuthStore } from '@gowiki/api'
import { paths } from '@gowiki/core'
import { Button2 as Button, ErrorMessage, Loader } from '@gowiki/web'

import { CornerHelpButton } from 'components/core/HelpButton'
import LogoTandem from 'components/core/LogoTandem'
import ScreenMeta from 'components/core/ScreenMeta'
import Icon from 'components/global/Icon'
import Link from 'components/global/Link'
import Popover from 'components/global/Popover'
import Theme from 'components/global/Theme'
import LogoIcon from 'components/icons/LogoIcon'
import PopoverMenu from 'components/popovers/PopoverMenu'
import PopoverOption from 'components/popovers/PopoverOption'

import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

type Props = {
  title?: string
  isLoading?: boolean
  vCenter?: boolean
  centerLogo?: boolean
}

export default function AppAuthLayout(props: React.PropsWithChildren<Props>) {
  const { vCenter, isLoading } = props
  const title = props.title || 'Tandem'

  return (
    <ThemeProvider theme={m.themes.whiteBackground}>
      <>
        <ScreenMeta title={title} />

        <Column minh="100%" hCenter ph={[16, 24]}>

          <Row vCenter w="100%" mv={28} maxw={m.units.auth.width} jcsb>
            <Link href="/" ><LogoTandem height={40} mr={8} /></Link>
            <UserButton />
          </Row>

          {isLoading ? (
            <Box h="100%" center>
              <Loader color={c.black} />
            </Box>
          ) : (
            <Column flex1 w="100%" maxw={m.units.auth.width} pb={20} hCenter jcc={vCenter}>
              {props.children}
            </Column>
          )}

          <CornerHelpButton />
        </Column>
      </>
    </ThemeProvider>
  )
}

const UserButton = (props: any) => {
  const [user] = useAuthStore(state => [state.user])

  if (!user || (!user.name && !user.email)) {
    return null
  }

  const signOut = () => {
    navigate(paths.AUTH_SIGNOUT, true)
  }

  const content = <PopoverMenu>
    <PopoverOption onClick={signOut} text={'Sign out'} />
  </PopoverMenu>

  return <Popover content={content}
    placement="bottom-end"
    {...props}
  >
    {({on}) => (
      <m.Pressable p={8} row vCenter>
        <Column aifs color={c.ink} aife>
          <m.T13 medium op={0.4}>Signed in as</m.T13>
          {user.email && <m.T13 mt={2} medium op={0.6}>{user.email}</m.T13>}
        </Column>
      </m.Pressable>
    )}
  </Popover>
}