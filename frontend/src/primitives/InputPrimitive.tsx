import { rgba } from 'polished'
import React from 'react'

import { c } from 'styles'
import { BoxProps, s } from 'styles-global'

import styled, { css } from 'styled-components'

// -------------------
// Core Input variables
export const focusOutline = `0 0 0 4px ${c.inputFocus}`
export const inputBorderWidth = 2
export const inputBorderUnits = `inset 0 0 0 ${inputBorderWidth}px`
export const errorStyle = css`
  box-shadow: inset 0 0 0 2px ${c.red} !important;
`
export const resetTextAttributes = css`
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
`

export const globalInputStyles = css`
  input,
  textarea,
  select {
    ${resetTextAttributes} margin:0;
    padding: 0;
    background: transparent;
    border: 0;
    outline: 0;
    color: inherit;
    font-size: inherit;
  }

  input[data-com-onepassword-filled='light'],
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    transition: background-color 5000s ease-in-out 0s;
  }
`

// TODO improve how errors are handeled with inputs. Improve when creating new Field/Input primitive components
export type InputProps = { hasError?: boolean; color?: string }

// -------------------
// Base Input


export const baseInput = css`
  ${s.ass} box-sizing:border-box;
  background: transparent;
  border-radius: 6px;
  &:hover {
    z-index: 1;
  }
  &:focus {
    z-index: 2;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: color 9999s ease-out 9999s, background-color 9999s ease-out 9999s;
  }
`

export const inputText = css`
  line-height:18px;
  color:${p => p.theme.ink};
  &::placeholder{ color:${p => p.theme.ink50}; }
  &:hover::placeholder{ color:${p => p.theme.ink60};  }
  &:focus::placeholder{ color:${p => p.theme.ink60}; }
`

const inputBoxFocus = css`
  background: ${p => p.theme.background};
  box-shadow: ${inputBorderUnits} ${p => p.theme.highlight} !important;
`

export const inputBox = css<{ isActive?: boolean, isFocused?: boolean }>` ${baseInput}
  background: ${p => p.theme.bgIdle};

  box-shadow:inset 0 0 0 1px ${p => rgba(p.theme.ink, 0.07)};
  &:hover{
    background:${p => p.theme.background};
    box-shadow:${inputBorderUnits} ${p => p.theme.highlight};
  }
  &:focus{ ${inputBoxFocus} }

  ${p => (p.isActive || p.isFocused) && inputBoxFocus}
`

export const innerInput = css`
  ${inputText} padding:15px;
`

// -------------------
// Textareas
export const textarea = css`
  ${inputBox}
  ${p => p.theme.ink}
  resize:none;
  padding:16px;
`

// -------------------
// Segmented Controls

export const segmentedControlBox = css<{ isActive?: boolean, isFocused?: boolean }>` ${baseInput}
  background: ${p => p.theme.bgIdle};

  box-shadow: ${inputBorderUnits} ${p => rgba(p.theme.highlight, 0.7)};
  &:focus{ ${inputBoxFocus} }

  ${p => (p.isActive || p.isFocused) && inputBoxFocus}
`

export const Form = styled.form<BoxProps>`
  ${s.boxProps}
`