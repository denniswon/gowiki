import React from 'react'

import { config } from '@gowiki/core'

import styled from 'styled-components'
import { Box, BoxProps, c, m, Row } from 'styles'

const headerBackground = config.env == 'dev' ? c.blue :
  config.env == 'staging' ? c.darkGreen :
  config.env == 'dogfood' ? c.brand :
  c.superBlack

export function EnvLabel(props: BoxProps) {
  if (config.env == 'prod') return null

  return <m.Badge mh={5} color={headerBackground} {...props}>{config.env.toUpperCase()}</m.Badge>
}