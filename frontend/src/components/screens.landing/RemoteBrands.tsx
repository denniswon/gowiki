import React from 'react'

import onepassword from 'images/landing/companies/1password.svg'
import asana from 'images/landing/companies/asana.svg'
import autodesk from 'images/landing/companies/autodesk.svg'
import coinbase from 'images/landing/companies/coinbase.svg'
import dropbox from 'images/landing/companies/dropbox.svg'
import hmbradley from 'images/landing/companies/hmbradley.svg'
import ideo from 'images/landing/companies/ideo.svg'
import netflix from 'images/landing/companies/netflix.svg'
import rho from 'images/landing/companies/rho.svg'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

import * as st from './landingStyles'

type Props = {}

const RemoteBrands: React.FunctionComponent<Props> = (props: Props) => {
  const {} = props

  return (
    <Column center pv={28} mv={28} bg={c.getBlack(5)}>
      <m.T16 medium center op={0.5} mb={16}>
        Used by world-class teams everywhere
      </m.T16>
      <Grid hCenter jcsa w='100%' flxWrap maxw={m.units.landing.width}>
        <Company src={rho} />
        <Company src={autodesk} />
        <Company src={dropbox} />
        <Company src={coinbase} />
        <Company src={netflix} />
        <Company src={ideo} />
        <Company src={onepassword} />
        <Company src={hmbradley} />
      </Grid>
    </Column>
  )
}

export default RemoteBrands


const Company = p => <m.Img h={24} mv={14} mh={20} {...p}/>

const Grid = styled(Box)`
  opacity:0.8;
  display:grid; justify-items:center; grid-template-columns:repeat(8, 1fr); align-items:center;
  ${s.media.lg` grid-template-columns:repeat(4, 1fr); `}
  ${s.media.sm` grid-template-columns:repeat(2, 1fr); `}
`