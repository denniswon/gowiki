import React from 'react'
import { Route, Switch } from 'react-router'

import { paths } from '@gowiki/core'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

import FormButton from 'components/global/forms/FormButton'

type Props = {} & BoxProps

const bg = c.brand
const color = c.white

const CTA: React.FunctionComponent<Props> = (props: Props) => {
  const { ...rest } = props

  return (
    <FormButton p={'8px 16px 8px 8px !important'} h={48} w={203} hCenter bg={bg} color={color} isSubmitting={false}
      shadowColor={c.black10} defaultShadow onSubmit={(e) => { location.href = paths.AUTH_SIGNUP }} {...rest}>
        <m.T16>
          <b>Get Started</b>
        </m.T16>
      </FormButton>
  )
}
const Wrapper = styled(m.ResponsiveRow)`
  ${p => (p.asc ? s.asc : ' align-self:flex-start;')}
  ${s.media.lg` align-self: center; `}`

export default CTA