import copyToClipboard from 'clipboard-copy'
import React, { useEffect, useRef, useState } from 'react'

import { Team } from '@gowiki/core'
import { ErrorMessage, Icon, Loader } from '@gowiki/web'

import Input from 'components/global/forms/Input'

import styled from 'styled-components'
import { Box, c, m, Row } from 'styles'

type Props = {
  source: string
  inviteLink?: string
  forever?: boolean
  skipCall?: boolean
  onCopied?: () => void
  onError?: (error: string) => void
  team?: Team
}

const InviteLinkCopierInline: React.FunctionComponent<Props> = (props: Props) => {
  const { source, onCopied, skipCall, forever, onError } = props

  const { inviteLink, onLinkCopied, inviteError } = {
    inviteLink: props.inviteLink || '',
    onLinkCopied: () => copyToClipboard(props.inviteLink || ''),
    inviteError: null
  }

  const [copied, setCopied] = useState<boolean>(false)
  const timeoutRef = useRef<any>()
  const inputRef = useRef<any>()

  const onCopy = () => {
    setCopied(true)
    onLinkCopied()
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setCopied(false)
    }, 2000)
    if (onCopied) onCopied()
  }

  useEffect(() => {
    if (copied) setCopied(false)
    return clearTimeout(timeoutRef.current)
  }, [props.team, forever])

  if (inviteError && onError) onError(inviteError)

  const copyButton = copied ? (
    <Box row vCenter p={6} bg={c.lightPurple} color={c.black} m={4} br={4}>
      <m.T14 semi>Copied</m.T14>
      <Icon ml={8} name="check" />
    </Box>
  ) : (
    <m.Pressable row center p={8} m={4} onClick={onCopy} br={4} color={c.brand} >
      <m.T14 semi>Copy</m.T14>
    </m.Pressable>
  )


  return <>
    {!inviteError && <Input>
      {({ InputBox, InputField }) => (
        <InputBox className="input-box" minh={44} center mb={0} flex={1} mr={0}>
          {!inviteLink ? (
            <Loader color={c.black} size={24} />
          ) : (
            <Row w="100%" vCenter onClick={onCopy}>
              <InputField
                id="inviteLink"
                value={inviteLink}
                autoComplete="off"
                placeholder="tandem.chat/j/12345"
                ref={inputRef}
                onChange={() => {}}
                op={0.6}
                ml={8}
                h='100%'
                style={{ textOverflow: 'ellipsis', marginRight:0 }}
                onClick={e => e.currentTarget.select()}
              />
              {copyButton}
            </Row>
          )}
        </InputBox>
      )}
    </Input>}
    <ErrorMessage mt={4} error={inviteError} />
  </>
}

export default InviteLinkCopierInline
