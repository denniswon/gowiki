import * as React from 'react'

import { Box, BoxProps } from '@gowiki/styles'

import styled, { css, keyframes } from 'styled-components'

export type Props = {
  size?: number
  thickness?: number
  speed?: number
  bg?: string
  color?: string
  fast?: boolean
  slow?: boolean
} & BoxProps

const fastSpeed = 0.6
const slowSpeed = 0.8

export const Loader: React.SFC<Props> = (props: Props) => {
  const speed = props.speed ? props.speed : props.fast ? fastSpeed : slowSpeed
  return <Spinner {...props} speed={speed} />
}

Loader.defaultProps = {
  size: 40,
  color: 'white'
}

const THICKNESS_FACTOR = 0.1

const circle = css`
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  margin-top: -${p => p.size / 2}px;
  margin-left: -${p => p.size / 2}px;
  border-radius: 50%;
  border: ${p => (p.thickness ? p.thickness : p.size * THICKNESS_FACTOR)}px solid #ccc;
`

const rotate = keyframes` to{ transform: rotate(360deg) } `
const Spinner = styled(Box)<Props>`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  position: ${p => (p.pabs ? 'absolute' : 'relative')};
  background:none;

  &:before {
    ${circle}
    border-color: ${p => p.bg};
    opacity:0.2;
  }
  &:after {
    ${circle}
    border-color: transparent;
    border-top-color: ${p => p.color};
    animation: ${rotate} ${p => p.speed}s linear infinite;
  }
`
