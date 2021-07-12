import React from 'react'

import { usePageView } from 'utils/usePageView'

import styled from 'styled-components'
import { BoxProps, Column, m, s } from 'styles'

import { CornerHelpButton } from 'components/core/HelpButton'
import Footer from 'components/landing/Footer'
import LandingHeader from 'components/landing/LandingHeader'
import Layout from 'components/layouts/Layout'

import CTA from './CTA'
import Features2 from './Features2'
import Hero from './Hero'
import { landingMargins } from './landingStyles'
import RemoteBrands from './RemoteBrands'
import Testimonials from './Testimonials'
import VideoPreview from './video/VideoPreview'

const LandingScreen: React.FunctionComponent = () => {

  usePageView('landing')

  return (
    <Layout>

      <WrapperWithPadding>
        <LandingHeader />
        <Hero />
      </WrapperWithPadding>

      <RemoteBrands />

      <Section mb={80} mt={40}>
        <VideoPreview />
      </Section>

      <Features2 />

      <WrapperWithPadding>
        <Column center mv={[30, 80]}>
          <m.T20 bold mb={20}>
            Try it now
          </m.T20>
          <CTA asc />
          <Column hCenter mt={28}>
            <m.T14 lh={24} medium op={0.8} center>
              14 day trial · No credit card required.
            </m.T14>
            <m.T14 lh={24} medium op={0.5} center>
              $10/active user/month.
            </m.T14>
          </Column>
        </Column>

      </WrapperWithPadding>
      <CornerHelpButton />

      <Testimonials />

      <Footer />
    </Layout>
  )
}

export default LandingScreen

const WrapperWithPadding = styled(Column)`
  ${landingMargins}
`

const Section = styled.section<BoxProps>` ${s.boxProps}
  width:100%; max-width:${m.units.landing.width}px;
  margin-left:auto; margin-right:auto;
  ${landingMargins}
`
