import * as React from 'react'

import { config, paths } from '@gowiki/core'

import Link from 'components/global/Link'
import Theme from 'components/global/Theme'
import LogoIcon from 'components/icons/LogoIcon'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

type Props = {}

const Footer: React.SFC<Props> = (props: Props) => {
  const { } = props

  return (
    <Theme theme={m.themes.darkBackground}>
      <Column bg="black" mt={40} pv={40} hCenter>
        <m.ResponsiveRow w="100%" maxw={m.units.landing.width} hCenter aifs jcsb ph={20} pb={20}>
          <LogoIcon size={48} mt={24} color={c.white} />

          <Column>
            <Heading>Product</Heading>
            <Item href="/integrations" title={`Integrations List`} target="_blank">
              App Integrations
            </Item>
            <Item href="/product_updates" title={`Product Updates`} target="_blank">
              Product Updates
            </Item>
            <Item href="/youtube_channel" title={`Tandem's Live Product Design on YouTube`} target="_blank">
              YouTube Channel
            </Item>
            <Item href="/welcome/download" title={`Download Tandem`}>
              Download
            </Item>
          </Column>

          <Column>
            <Heading>Help</Heading>
            <Item title="Chat with us" onClick={() => {}}>
              Chat with us!
            </Item>
            <Item href="/help_center" title={`Help Center`} target="_blank">
              Help & FAQ
            </Item>
            <Item href="/privacy_statement" title={`Privacy Statement`} target="_blank">
              Privacy Statement
            </Item>
          </Column>

          <Column>
            <Heading>Contact</Heading>
            <Item href="/about" target="_blank">
              About Us
            </Item>
            <Item href="/follow_us" title={`Follow us`} target="_blank">
              Follow us
            </Item>
            <Item href="/blog" title={`Tandem's Blog`} target="_blank">
              Blog
            </Item>
            <Item href="/press" title={`Press Kit`} target="_blank">
              Press Kit
            </Item>
            <Item href="/jobs" title={`Join us on Tandem`} target="_blank">
              Jobs
            </Item>
            <Item href={config.twitterUrl} title={`Tandem's Twitter @gowiki`}>
              Twitter @gowiki
            </Item>
          </Column>
        </m.ResponsiveRow>

        <m.ResponsiveRow mt={24} mb={8} ph={20} vCenter>
          <m.T14 row vCenter mv={4} mr={12} op={0.5}>
            © Copyright {new Date().getFullYear()} Tandem Communications Inc. All Rights Reserved.
          </m.T14>

          <Link href={paths.TERMS} mr={12}>
            <m.Pressable p={8} mh={-8} color={c.white50}>
              Terms of Service
            </m.Pressable>
          </Link>

          <Link href={paths.PRIVACY}>
            <m.Pressable p={8} mh={-8} color={c.white50}>
              Privacy Policy
            </m.Pressable>
          </Link>
        </m.ResponsiveRow>
      </Column>
    </Theme>
  )
}

export default Footer

const Heading = styled(m.T14).attrs({ bold: true, op: 0.55, upcase: true, mb: 12, mt: 24 })``

const Item = ({
  children,
  title,
  href,
  onClick,
  target
}: {
  children: any
  title?: string
  href?: string
  onClick?: (e) => void
  target?: string
}) => {
  const pressable = (
    <m.Pressable color={c.white} hoverBg={c.white20} hoverColor={c.white} p={8} mh={-8} onClick={onClick}>
      <m.T16 semi>{children}</m.T16>
    </m.Pressable>
  )

  return (
    <li style={{ listStyle: 'none' }}>
      {href ? (
        <Link href={href} title={title} target={target}>
          {pressable}
        </Link>
      ) : (
          pressable
        )}
    </li>
  )
}
