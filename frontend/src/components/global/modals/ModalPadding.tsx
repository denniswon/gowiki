import React from 'react'

import { Box, Column } from '@gowiki/styles-global'

import styled from 'styled-components'
import { m } from 'styles'

type Props = {
  withHeader?: boolean
}

const ModalPadding = (
  styled(Column).attrs((p:{ pt?: number, withHeader?: boolean}) => ({
    p: m.units.modal.padding,
    pt: p.pt || (p.withHeader ? 0 : null),
  }))<Props>`
    user-select: none;
  `
)

export default ModalPadding