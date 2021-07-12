import React from 'react'

import { Box, BoxProps } from '@gowiki/styles-global'

import styled from 'styled-components'
import { m } from 'styles'

export type ListBadgesProps = {
  badges: any
} & BoxProps

export default function ListBadges(props: ListBadgesProps) {
  const { badges, ...rest } = props

  if (!badges?.length) return null

  return (
    <Box vCenter {...rest}>
      {badges?.map((badge, index) => (
        <Box key={index}>{badge}</Box>
      ))}
    </Box>
  )
}

// Badge

export enum BadgeVariant {
  Positive
}
export type BadgeProps = {
  variant?: BadgeVariant
  children?: React.ReactNode
}
export function Badge({ variant, children }: BadgeProps = {}) {
  return (
    <BadgeContainer p={6} br={4}>
      <m.T12 medium>{children}</m.T12>
    </BadgeContainer>
  )
}

const BadgeContainer = styled(Box)`
  background-color: #e8fbdd;
  color: #01a501;
`
