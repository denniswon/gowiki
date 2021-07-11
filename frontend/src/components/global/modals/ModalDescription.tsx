import React, { PropsWithChildren } from 'react'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
} & BoxProps

export default function ModalDescription(props: PropsWithChildren<Props>) {
  return <m.T14 medium paragraph op={0.6} mb={16} {...props} />
}