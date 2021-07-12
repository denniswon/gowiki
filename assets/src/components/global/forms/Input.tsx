/** Usage Example
 *
    <Input>
      {() =>
        <InputBox className='input-box' center mb={0} mv={8} flex={1} >
          {(!inviteLink && !disabled)
            ? <Loader color={c.black} size={24} />
            : <InputField id='inviteLink' value={inviteLink} autoComplete="off" placeholder="tandem.chat/i/12345"
                ref={ref => this.input = ref}
                disabled={disabled} onChange={() => {}} onClick={this.onClickLinkInput} />
          }
        </InputBox>
      }
    </Input>
 */

import { transparentize } from 'polished'
import * as React from 'react'
import AutosizeInput from 'react-input-autosize'

import { ErrorMessage, Icon, inputBorderUnits } from '@gowiki/web'

import styled, { css } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

export type Props = {
  label?: string
  innerRef?: any
  children?: any
  autosize?: boolean
  error?: any
  iconName?: string
  iconSize?: number
  useRightIcon?: boolean
} & React.InputHTMLAttributes<HTMLInputElement> &
  BoxProps

type State = {
  isFocused: boolean
}

class Input extends React.Component<Props, State> {
  static defaultProps = {
    mb: 20
  }

  state: State = {
    isFocused: false
  }

  render() {
    const { children, autosize, error, innerRef, label, iconName, iconSize, useRightIcon, ...rest } = this.props

    const { isFocused } = this.state

    const inputPropKeys = [
      'id',
      'value',
      'name',
      'autoComplete',
      'type',
      'placeholder',
      'defaultValue',
      'autoCapitalize',
      'onChange',
      'onFocus',
      'autoFocus',
      'disabled',
      'required'
    ]

    const inputProps: any = {}
    const otherProps: any = {}

    Object.keys(rest).forEach(prop => {
      if (inputPropKeys.indexOf(prop) > -1) inputProps[prop] = rest[prop]
      else otherProps[prop] = rest[prop]
    })

    const StyledInput = autosize ? StyledAutosizeInput : StyledInputField

    const childrenProps = {
      InputBox: StyledInputBox,
      InputField: StyledInput,
      Label: StyledLabel,
      isFocused,
      onBlur: this.onBlur,
      onFocus: this.onFocus
    }

    const id = inputProps.id ? inputProps.id : inputProps.name
    const isMinimized = inputProps.value && inputProps.value.length
    const { bg, ...other } = otherProps

    if (children) return this.props.children(childrenProps)
    else
      return (
        <Column prel {...other}>
          <StyledInputBox
            h={label ? 52 : 44}
            vCenter
            isFocused={isFocused}
            hasError={!!error}
            bg={this.props.bg}
            bs={this.props.bs}
          >
            {iconName && <StyledIcon name={iconName} size={iconSize || 20} useRightIcon={useRightIcon} />}
            <Row w='100%' prel>
              <StyledInput
                id={id}
                ref={innerRef}
                {...inputProps}
                isFocused={isFocused}
                isMinimized={isMinimized}
                hasLabel={!!label}
                placeholder={inputProps.placeholder || label}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
              {label && (
                <StyledLabel isFocused={isFocused} isMinimized={isMinimized} htmlFor={id} hasError={!!error}>
                  {label}
                </StyledLabel>
              )}
            </Row>
          </StyledInputBox>
          {error && <ErrorMessage error={error} mt={4} />}
        </Column>
      )
  }

  onBlur = e => {
    this.setState({ isFocused: false })
    if (this.props.onBlur) this.props.onBlur(e)
  }

  onFocus = e => {
    this.setState({ isFocused: true })
    if (this.props.onFocus) this.props.onFocus(e)
  }
}

export default React.forwardRef((props: any, ref) => <Input innerRef={ref} {...props} />)

const horizontalSpacing = 15

const StyledInputBox = styled.label<{ isFocused: boolean; hasError: boolean } & BoxProps>`
  ${m.inputBox}
  ${s.boxProps}

  cursor: text;
  ${p =>
    p.isFocused &&
    ` background:${p.theme.background} !important;
    box-shadow:inset ${inputBorderUnits} ${p.theme.highlight} !important;
    > .icon{ opacity: 1; }
  `}
  ${p => p.hasError && `box-shadow:${inputBorderUnits} ${c.error} !important;`}
`

const innerInput = css<{ isMinimized?: boolean; hasLabel?: boolean }>`
  ${m.inputText} width:100%;
  height: 100%;
  ${s.prel} box-shadow:none;
  ${p => p.isMinimized && p.hasLabel && ` height:34px; transform: translate3d(0, 18px, 0); `}
`

export const StyledInputField = styled.input.attrs((p: BoxProps) => ({ mh: p.mh || horizontalSpacing }))`
  ${s.boxProps} ${innerInput}
`
const StyledAutosizeInput = styled(AutosizeInput)`
  & input {
    ${innerInput}
  }
`

const StyledLabel = styled.label<BoxProps & { isMinimized: boolean; isFocused: boolean; hasError: boolean }>` ${
  s.boxProps
} ${s.untouchable}
    ${s.pabs} top:6px; left:${horizontalSpacing}px; opacity:0;
    ${m.t12} line-height:20px;
    color:${p => p.theme.ink40};
    ${p => p.isFocused && ` color:${p.theme.highlight}; `}
    ${p => p.hasError && ` color:${c.error}; `}
    ${p => p.isMinimized && ` ${m.tSemi} opacity:1; `}
  `

export const StyledIcon = styled(Icon)<{ useRightIcon: boolean }>`
  margin-left: 12px;
  margin-right: -3px;
  ${s.asc} ${s.untouchable} opacity:0.6;
  ${p => p.useRightIcon && ` order:9999; margin-left:12px; margin-right:15px; `}
`
