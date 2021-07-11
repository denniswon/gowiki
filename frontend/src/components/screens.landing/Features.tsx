import * as React from 'react'

import { Icon } from '@gowiki/web'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

import illustrationUi from './illustration_ui.svg'
import { landingMargins } from './landingStyles'

type Props = {}

const Features: React.SFC<Props> = (props: Props) => {
  const {} = props

  return (
    <Wrapper w="100%">
      <Inner maxw={m.units.landing.width}>
        <Illustration maxw={680} center>
          <m.Img
            src={illustrationUi}
            maxw="100%"
            alt="Voice, video, Interactive Screensharing, Collaborative Docs and Drawings, Chat"
          />
        </Illustration>

        <FeaturesList>
          <Feature
            iconName="voice_chat"
            text1={`One-Click Voice and Video Meetings`}
            text2={`Share quick thoughts or brainstorm`}
          />
          <Feature
            iconName="screen_share"
            text1={`Interactive Screensharing`}
            text2={`Collaborate together on any tool`}
          />
          <Feature iconName="edit" text1={`Collaborative Docs and Drawings`} text2={`Persist your team’s knowledge`} />
          <Feature iconName="textsms" text1={`Chat`} text2={`Ping, share files or images`} />
        </FeaturesList>
      </Inner>
    </Wrapper>
  )
}

const Feature = ({ iconName, text1, text2 }) => (
  <Row mb={40}>
    <Icon size={32} name={iconName} mr={16} op={0.6} mt={-3} />
    <Column>
      <m.T20 as="h3" m={'0'} bold mb={8}>
        {text1}
      </m.T20>
      <m.T18 as="h4" m={'0'} op={0.6}>
        {text2}
      </m.T18>
    </Column>
  </Row>
)

export default Features

const Wrapper = styled(Row)`
  margin-bottom: 60px;
  background: ${c.lightPurple};
  ${s.prel}
  ${s.media.lg` ${s.flxCol} ${s.aic} margin-bottom:40px;`}
`

const Inner = styled(Row)`
  margin: 0 auto;
  ${landingMargins}
  ${s.media.lg` ${s.flxCol} ${s.aic} `}
`

const Illustration = styled(Box)`
  width: 40%;
  max-height: 80vw;
  ${s.flex1}
  img {
    ${s.prel}
  }
  ${s.media.lg` width:100%; order:0; margin-bottom:20px; `}
`

const FeaturesList = styled(Box)`
  margin-left: 60px;
  margin-top: 120px;
  ${s.media.lg` margin-top:40px; margin-left:0; `}
`

const BackgroundWave = styled(Box)`
  ${s.pabs} left:0;
  right: 0;
  margin-top: -20px;
  ${s.media.lg` display:none;`}
`
