import styled, { css, keyframes } from 'styled-components'

const HeadShakeAnimation = keyframes`
  0%    { transform: translateX(0); }
  6.5%  { transform: translateX(-6px) rotateY(-9deg); }
  18.5% { transform: translateX(5px) rotateY(7deg); }
  31.5% { transform: translateX(-3px) rotateY(-5deg); }
  43.5% { transform: translateX(2px) rotateY(3deg); }
  50%   { transform: translateX(0); }
`

export const shake = css`
  animation-name: ${HeadShakeAnimation};
  animation-timing-function: ease-in-out;
  animation-duration: 1s;
  animation-fill-mode: both;
`
export const fastSpring = { tension: 2000, friction: 100, precision: 1 }
