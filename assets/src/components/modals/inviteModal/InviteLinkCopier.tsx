import * as React from 'react'

import { Button, Icon, Loader } from '@gowiki/web'

import Input from 'components/global/forms/Input'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  inviteLink: string
  onClickCopyLink: (inviteLink: string) => void
  inviteBoxStyle?: React.CSSProperties
  disabled?: boolean
  withButton?: boolean
} & BoxProps

type State = {
  didCopy: boolean
}

export default class InviteLinkCopier extends React.Component<Props, State> {
  copyTimeout: any

  input: HTMLInputElement

  state: State = {
    didCopy: false
  }

  render() {
    const { inviteLink, onClickCopyLink, disabled, withButton = true, ...rest } = this.props
    const { didCopy } = this.state

    return (
      <Column hCenter {...rest}>
        <Input>
          {() => (
            <InputBox className="input-box" center mb={0} flex={1}>
              {!inviteLink && !disabled ? (
                <Box h={48} />
              ) : (
                <InputField
                  id="inviteLink"
                  value={inviteLink}
                  autoComplete="off"
                  placeholder="tandem.chat/j/12345"
                  ref={ref => (this.input = ref)}
                  disabled={disabled}
                  onChange={() => {}}
                  onClick={this.onClickLinkInput}
                />
              )}
            </InputBox>
          )}
        </Input>

        {withButton &&
          <Button
            fw
            mt={8}
            color={c.white}
            bg={didCopy ? c.green : c.brand}
            onClick={this.onClickCopyLink}
            withTextShadow={didCopy}
            disabled={disabled}
          >
            {didCopy ? 'Copied' : 'Copy Invite'}
            <Icon name={didCopy ? 'check_circle' : 'file_copy'} ml={8} />
          </Button>
        }
      </Column>
    )
  }

  onClickLinkInput = e => {
    this.onClickCopyLink()
    this.input.select()
  }

  onClickCopyLink = () => {
    const { inviteLink } = this.props
    this.setState({ didCopy: true })
    clearTimeout(this.copyTimeout)
    this.copyTimeout = setTimeout(() => this.setState({ didCopy: false }), 2000)
    this.props.onClickCopyLink(inviteLink)
  }

  componentWillUnmount() {
    clearTimeout(this.copyTimeout)
  }
}

const InputBox = styled.label<BoxProps>`
  ${s.boxProps} ${m.inputBox}
`
const InputField = styled.input`
  ${m.innerInput} ${s.flex1} color:inherit;
`