import React from 'react'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

export const PageTitle = p => <m.T32 center bold mb={40} {...p} />
export const PageDescription = p => <m.T14 op={0.6} {...p} />
export const InputLabel = p => <m.T14 row as='label' semi op={0.8} mb={8} {...p} />
export const Title = p => <m.T24 mb={24} {...p} />
export const Heading = p => <m.T15 semi mt={32} mb={12} {...p} />
export const Skip = p => <m.T14 medium {...p} />

export const SubText = p => <m.T15 paragraph tCenter op={0.7} medium {...p} />
