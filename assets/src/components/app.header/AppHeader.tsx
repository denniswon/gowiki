import * as React from 'react'
import { tracker } from 'services'

import { useAuthStore } from '@gowiki/api'
import { config, getPlatform, isMobile } from '@gowiki/core'
import { Icon } from '@gowiki/web'

import ProductUpdatesBadge from 'components/app.header/ProductUpdatesBadge'
import TeamSwitcher from 'components/app.header/TeamSwitcher'
import WindowsTopBar from 'components/app.header/WindowsTopBar'
import MacWindowControls from 'components/core/MacWindowControls'
import Popover from 'components/global/Popover'
import OnboardingStarSvg from 'images/onboarding-star.svg'

import styled, { keyframes, ThemeProvider } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

import SettingsMenu from './SettingsMenu'

const macDesktop = getPlatform() == 'mac-app'

export default function AppHeader() {
  const className = macDesktop ? 'app-dragging' : undefined
  const focused = true

  const backgroundColor = focused ? c.black05 : c.transparent

  return (
    <Column bg={backgroundColor} prel className={className} op={focused ? 1 : 0.8}>
      <HeaderContent focused={focused} unifiedApp />
    </Column>
  )
}

function HeaderContent({ focused, unifiedApp }: { focused: boolean, unifiedApp: boolean }) {
  if (isMobile) return <>
    <BottomBar mt={10}>
      <TeamDropdown />
      <Box flex1 />
      <SettingsDropdown />
    </BottomBar>
  </>

  if (macDesktop) return <>
    <MacWindowControls mt={4} colored={focused} />
    <Row h={36} vCenter ml={80}>
      <EnvLabel />
      <Box flex1 />
      <ProductUpdatesBadge />
    </Row>
    <BottomBar>
      <TeamDropdown />
      <Box flex1 />
      <SettingsDropdown />
    </BottomBar>
  </>

  // windows / linux header (with window controls)
  const headerControlColor = unifiedApp ? (focused ? c.ink : c.ink50) : (focused ? c.white : c.white80)
  return <>
    <WindowsTopBar className="app-dragging" hideMax color={headerControlColor}>
      <ProductUpdatesBadge />
      <EnvLabel className='app-dragging'/>
      <Box flex1 className='app-dragging' />
    </WindowsTopBar>
    <BottomBar >
      <TeamDropdown />
      <Box flex1 />
      <SettingsDropdown />
    </BottomBar>
  </>
}

const BottomBar = p => <Row vCenter mt={2} pb={6} mh={m.units.sidebar.padding/2} {...p} />

function TeamDropdown(props: BoxProps) {
  const [team] = useAuthStore(state => [state.team])

  if (team) {
    return (
      // <SimpleTooltip placement='bottom-start' content='Choose a different team' >
        <Popover
          content={<TeamSwitcher />}
          placement='bottom-start'
          onShow={() => tracker.appTeamMenuOpen()}
          style={{overflow: 'hidden'}}
          {...props}
        >
          {({on}) => (
            <Pressable row vCenter iconOp={0.6} flex1 p={8} isActive={on}>
              <m.T15 semi mr={2} ellipsize>
                {team.name}
              </m.T15>
              <Box prel sz={20}>
                <Icon size={16} name="keyboard_arrow_up" pabs left={0} top={-1} />
                <Icon size={16} name="keyboard_arrow_down" pabs left={0} top={7} />
              </Box>
            </Pressable>
          )}
        </Popover>
      // </SimpleTooltip>
    )
  } else {
    return null
  }
}

function EnvLabel(props: BoxProps & { className?: string }) {
  const labelColor = config.dev ? c.blue : config.env == 'staging' ? c.darkGreen : c.black50
  return (
    <Box {...props}>
      {config.env != 'prod' && <m.Badge color={labelColor}>{config.env.toUpperCase()}</m.Badge>}
    </Box>
  )
}

function SettingsDropdown(props: BoxProps) {
  const hint = 'Settings'

  return (
    <Box {...props}>
      {/* <SimpleTooltip placement="bottom" content={hint}> */}
        <Popover
          placement="bottom-end"
          content={<SettingsMenu />}
          onShow={tracker.appSettingsMenuOpen}
        >
          {({on}) => (
            <Pressable flex1 jcfs isActive={on}>
              <Icon name="settings" size={18} />
            </Pressable>
          )}
        </Popover>
      {/* </SimpleTooltip> */}
    </Box>
  )
}

const Pressable = p => {
  const styleProps = {
    color: c.ink70, hoverColor: c.ink,
    hoverBg: c.bgHover, activeBg: c.bgPressing,
  }
  return <m.Pressable row vCenter p={8} iconOp={0.8} {...styleProps} {...p} />
}

const rotate = keyframes` to{ transform: rotate(360deg) } `
const OnboardingStar = styled(m.Img).attrs({ src: OnboardingStarSvg })`
  position: absolute;
  left: -13px;
  top: -13px;
  animation: ${rotate} 10s linear infinite;
  ${config.env === "dev" && `filter: invert(1);`}
`
