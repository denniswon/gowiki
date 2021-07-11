import { usePath } from 'hookrouter'
import * as React from 'react'
import { Route, Switch } from 'react-router'

import { paths } from '@gowiki/core'

import CTA from 'components/screens.landing/CTA'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

import illustrationPeople from './illustration_people.svg'

type Props = {}

const Hero: React.SFC<Props> = (props: Props) => {
  return (
    <Wrapper w="100%" maxw={m.units.landing.width} jcsb>
      <Content>
        <Title as="h1" m={'0'} mb={16}>
          The virtual office <br /> for your team
        </Title>
        <Subtitle maxw={410} as="h2" m={'0'} mb={32} op={0.6}>
          Connect effortlessly with your distributed team. See who’s around, talk, and collaborate in one click.
        </Subtitle>
        <CTA center />
      </Content>
      <Illustration prel center maxw={540} maxh={[200, 360, 500, 400]}>
        <m.Img maxw="100%" src={illustrationPeople} alt="A virtual office for remote teams" />
      </Illustration>
    </Wrapper>
  )
}

export default Hero


const Wrapper = styled(Row)`
  margin: 0 auto;
  margin-bottom: 60px;
  margin-top: 120px;
  ${s.media.lg` ${s.flxCol} ${s.aic} margin-top:40px; margin-bottom:40px;`}
`

const Content = styled(Column)`
  width: 100%;
  max-width: 490px;
  order: 1;
  ${s.media.lg` width:100%; ${s.tac} ${s.aic}`}
`

const Illustration = styled(Box)`
  width: 40%;
  ${s.flex1} order:2;
  img {
    ${s.prel} top:-80px;
  }
  ${s.media.lg` width:100%; margin-bottom:20px;
    img{ top:0; }
  `}
  ${s.media.sm` display:none; `}
`

const Title = styled(m.Text)`
  font-size: 52px;
  font-weight: 800;
  line-height: 110%;
  letter-spacing: -0.025em;
  ${s.media.sm` font-size:44px; margin-top:5vh; `}
`
const Subtitle = styled(m.T20)`
  line-height:28px;
  font-weight: 500;
  letter-spacing: -0.02em;
`

const Platforms = styled(m.T13)`
  ${s.media.lg` ${s.asc} `}
`
