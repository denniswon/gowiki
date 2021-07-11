import React, { useEffect, useState } from 'react'

import { config, paths } from '@gowiki/core'
import { Icon } from '@gowiki/web'

import LogoTandem from 'components/core/LogoTandem'
import Link from 'components/global/Link'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

type Props = {}

const navigation = [
  { text: 'Blog', href: '/blog', title: 'Tandem Blog', target: '_blank' },
  { text: 'Product Updates', href: '/product_updates', title: 'Tandem Blog', target: '_blank' },
  { text: 'Download', href: '/welcome/download', title: 'Tandem Blog' },
  { text: `We're hiring!`, href: '/jobs', title: 'Tandem Blog', target: '_blank' },
]

const LandingHeader: React.SFC<Props> = (props: Props) => {
  const [ toggle, setToggle ] = useState<boolean>(false)

  const logoLink = location.pathname == '/welcome' ? paths.WELCOME : paths.ROOT

  return <>
    <Wrapper center w='100%' pt={20}>
      <Row flex1 vCenter w='100%' maxw={m.units.landing.width}>
        <Link href={logoLink}>
          <LogoTandem height={36} />
        </Link>

        <Box flex1 />

        <Navigation vCenter jcfe>
          {navigation.map((i, key) => (
            <Link href={i.href} title={i.title} target={i.target} key={key}>
              <PressableLink><m.T16 medium>{i.text}</m.T16></PressableLink>
            </Link>
          ))}
        </Navigation>

        <MenuPressable onClick={() => setToggle(!toggle)} p={12}>
          <Icon name={toggle ? 'close' : 'menu'} />
        </MenuPressable>
      </Row>
      <MobileNavigation asfs ml={32} visible={toggle}>
        {navigation.map((i, key) => (
          <Link href={i.href} title={i.title} target={i.target} key={key}>
            <PressableLink><m.T16 medium>{i.text}</m.T16></PressableLink>
          </Link>
        ))}
      </MobileNavigation>


    </Wrapper>
  </>
}

export default LandingHeader

const Wrapper = styled(Column)``

const Navigation = styled(Row)` ${s.media.lg` display:none; `} `
const MobileNavigation = styled(Column)<{ visible?: boolean }>` display:none; ${p => p.visible && `display: flex;`} `

const MenuPressable = styled(m.Pressable)` display:none; ${s.media.lg` display:flex; `} `

const PressableLink = p => <m.Pressable vCenter medium p={12} mh={8} color={c.black80} hoverColor={c.black} hoverBg={c.black05} {...p}/>

const Separator = styled(m.T14)` ${s.media.sm` display:none; `}  `