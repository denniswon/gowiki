import React from 'react'

import crossplatform_img from 'images/cross_platform.png'
import integrationsImg from 'images/integrations.png'
import feature_hybrid from 'images/landing/feature_hybrid.png'
import feature_meet from 'images/landing/feature_meet.png'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

type Props = {}

const Features2: React.FunctionComponent<Props> = (props: Props) => {
  const {} = props

  return (
    <Column p='5vh 5vw'>
      <Feature>
        <Text>
          <Title bold>Quick Collaboration</Title>
          <Desc>
            See which work apps your team is working in, and join them with a click. Shared cursors = better screen-sharing.
          </Desc>
        </Text>
      </Feature>

      <Feature>
        <Text>
          <Title bold>Spontaneous Conversations</Title>
          <Desc>
            Time zones got you working late? See who is also in work mode and get quick feedback on your work.
          </Desc>
        </Text>
      </Feature>

      <Feature>
        <Text>
          <Title bold>Co-working</Title>
          <Desc>
            Hang out in a minimal voice/video call to feel connected &mdash; like you're working at the same table.
          </Desc>
        </Text>
      </Feature>

      <Feature>
        <Text>
          <Title bold>Meet in Tandem</Title>
          <Desc>
            Meeting rooms automatically appear from calendar events - no need to hunt for links.<br /><br />
            Listening Mode allows you to join as a listener, or invite listeners.<br /><br />
            Create a Quick Meeting, get a link, or schedule in Google Calendar.
          </Desc>
        </Text>

        <Row flex1 hCenter>
          <Box maxw={540}>
            <m.Img src={feature_meet} w="100%" h="auto" />
          </Box>
        </Row>
      </Feature>

      <Feature>
        <Text>
          <Title bold>Work from anywhere, <br/> offices too!</Title>
          <Desc>
            In the same room? No problem. Join from your laptop without audio feedback using the “Same room” feature.<br /><br />
            Distributed teammates feel equally included and present.
          </Desc>
        </Text>
        <Row flex1 hCenter>
          <Box maxw={540}>
            <m.Img src={feature_hybrid} w="100%" h="auto" />
          </Box>
        </Row>
      </Feature>

      <Feature vCenter maxw={m.units.landing.width}>
        <Text>
          <Title bold>120+ Integrations</Title>
          <Desc>Tandem works great with tools in your existing workflow.</Desc>
        </Text>
        <Box maxw={540} m={40}>
          <m.Img src={integrationsImg} w="100%" h="auto" />
        </Box>
      </Feature>

      <Feature vCenter maxw={m.units.landing.width}>
        <Text>
          <Title bold>Cross-platform</Title>
          <Desc>Works on Mac, Windows, and Linux desktops.</Desc>
        </Text>
        <Row flex1 hCenter>
          <Box maxw={270} m={40}>
            <m.Img src={crossplatform_img} w="100%" h="auto" />
          </Box>
        </Row>
      </Feature>

      <Feature vCenter maxw={m.units.landing.width}>
        <Text>
          <Title bold>Group Conversations</Title>
          <Desc>
            Talk with anyone in your team: 1-on-1s or daily standups for the whole team. Join active conversations or
            pull people into a conversation.
          </Desc>
        </Text>
      </Feature>
    </Column>
  )
}

export default Features2

const Feature = styled(Row).attrs({ vCenter: true, maxw: m.units.landing.width, jcsb: true })`
  width: 100%;
  align-self:center;
  margin-bottom: 15vh;
  display:grid;
  grid-template-columns: repeat(2,1fr);
  column-gap: 5vw;
  row-gap: 5vh;
  ${s.media.lg` grid-template-columns: 1fr; `}
  &:last-child{
    margin-bottom: 5vh;
  }

`
  // ${s.media.lg` flex-direction:column; max-width:600px; ${s.aic} ${s.tac}`}

const Text = styled(Column)`
  max-width:440px;
`
const Title = styled(m.T32)`
  margin-bottom: 20px;
  letter-spacing:-0.025em;
  line-height: 120%;
`
const Desc = styled(m.T18)`
  line-height: 150%;
  opacity: 0.8;
  letter-spacing:-0.018em;
`
