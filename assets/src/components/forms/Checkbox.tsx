import React, { PropsWithChildren, useState } from 'react'

import { Icon } from '@gowiki/web'

import styled, { css } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

interface Props extends BoxProps {
  name?: string
  id?: string
  value?: string
  checked?: boolean
  disabled?: boolean
  readOnly?: boolean
  tabIndex?: number
  onChange?: (checked: boolean) => void
  onClick?: (e) => void
  onFocus?: () => void
  onBlur?: () => void
  autoFocus?: boolean
  title?: string
  style?: React.CSSProperties
}

export default function Checkbox(props: PropsWithChildren<Props>) {
  const { name, value, id, disabled, readOnly, tabIndex, onClick, onFocus, onBlur, autoFocus,
    children, title, checked, onChange: _onChange, ...rest } = props

  const parsedId = id ? id : name

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) return
    if (_onChange) _onChange(e.currentTarget.checked)
  }

  const checkbox = (
    <CheckboxInput
      name={name}
      value={value ? value : name}
      id={parsedId}
      disabled={disabled}
      readOnly={readOnly}
      tabIndex={tabIndex}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      type="checkbox"
      checked={checked}
      autoFocus={autoFocus}
    />
  )

  const checkboxGraphic = (withOutline: boolean) => (
    <CheckboxGraphic
      className="checkbox-box"
      center
      mr={12}
      checked={checked}
      withOutline={withOutline}
      title={title}
    >
      <CheckIcon className="checkbox-icon" name="check" checked={checked} />
    </CheckboxGraphic>
  )

  return children ? (
    <PressableLabel checked={checked} {...rest}>
      {checkbox}
      {checkboxGraphic(false)}
      {children}
    </PressableLabel>
  ) : (
    <Box {...rest}>
      {checkbox}
      {checkboxGraphic(true)}
    </Box>
  )
}

Checkbox.defaultProps = {
  p: 12
}

const CheckboxInput = styled.input`
  opacity: 0;
  ${s.pabs} z-index:-1;
`
const PressableLabel = styled.label<BoxProps & { checked?: boolean }>`${s.boxProps} ${s.flxRow} ${s.aic}
  &:hover {
    .icon { opacity:0.3 !important; }
  }
`

type GraphicProps = { checked?: boolean; isFocused?: boolean; withOutline?: boolean, w?: number, h?: number }

const checkedStyle = css`
  background: ${p => p.theme.highlight};
`
const uncheckedStyle = css`
  border: 2px solid ${p => p.theme.ink30};
`
const hoverStyle = css`
  border: 2px solid ${p => p.theme.highlight};
`

export const CheckboxGraphic = styled(Box)<GraphicProps & { size?: number }>`
  width: ${p => p.size || 20}px;
  height: ${p => p.size || 20}px;
  ${s.prel} z-index:2;
  border-radius: 4px;
  ${s.anim}

  ${p => (p.checked ? checkedStyle : uncheckedStyle)}
  &:hover { ${hoverStyle} }
  ${p => (p.isFocused && p.withOutline ? `box-shadow: ${p.theme.focusOutline}; ` : '')}
`

export const CheckIcon = styled(Icon)<GraphicProps>`
  opacity: 0 !important;
  ${s.anim}
  ${p => (p.checked ? `opacity:1 !important; color:white !important; ` : '')}
`
