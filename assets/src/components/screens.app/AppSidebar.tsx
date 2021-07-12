import React, { useEffect } from 'react'

import AppHeader from 'components/app.header/AppHeader'
import PlainWindowHeader from 'components/app.header/PlainWindowHeader'
import InviteTeammatesModal from 'components/modals/InviteTeammatesModal'
import PopoverModal from 'components/modals/PopoverModal'
import HelpButtonPopover from 'components/popovers/HelpButtonPopover'
import AppLayout from 'components/screens.app/AppLayout'
import SidebarScrollbar from 'components/sidebar/SidebarScrollbar'

import styled from 'styled-components'
import { Box, Column, m, Row } from 'styles'

export default function AppSidebar() {
  return (
    <AppLayout prel customControls>
      <AppHeader />

      <Footer prel>
        <HelpButtonPopover />
      </Footer>

      <InviteTeammatesModal />
      <PopoverModal />
    </AppLayout>
  )
}

const Footer = styled(Column)`
  background: ${p => p.theme.popoverBackground};
  box-shadow: 0 -4px 16px rgba(0,0,0,0.25);
  z-index: ${m.zIndex.bottomModal};
`
