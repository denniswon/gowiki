import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/store'
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client'
import moment from 'moment'
import { useMediaQuery } from 'react-responsive'
import { token } from '../store/middleware'
import { API_URL } from '../config'
import { ICON_ARROWBACK, ICON_SEND } from '../Icons'

import styled, { css } from 'styled-components'
import { Box } from 'styles'
import { ChatBottomWrapper, ChatHeight, HeaderBackWrapper } from '../styles/global'
import { ProfileHeaderBack } from './Lists'
const socket = io.connect(API_URL, {
  query: { token: token() },
})

const ChatPage = (props) => {
 const { state, actions } = useStore()
  const [room, setRoom] = useState(null)
  const [conversation, setConversation] = useState([])
  const [text, setText] = useState('')
  const mounted = useRef<boolean>()
  const roomRef = useRef()

  const { account } = state
  useEffect(() => {
    if (props.history.location.pathname.slice(10).length === 24)
      getConversation(props.history.location.pathname.slice(10))
    // check when component unmounts
    return () => {
      if (roomRef.current) {
        socket.emit('leaveRoom', roomRef.current)
      }
    }
  }, [props.history.location.pathname])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      if (document.querySelector('#messageBody')) {
        const messageBody = document.querySelector('#messageBody')
        messageBody.scrollTop =
          messageBody.scrollHeight - messageBody.clientHeight
      }
      socket.on('output', (msg) => {
        const currConversation = conversation
        currConversation.push(msg)
        setConversation(currConversation)
        setText(text)
        const messageBody = document.querySelector('#messageBody')
        messageBody.scrollTop =
          messageBody.scrollHeight - messageBody.clientHeight
      })
    }
  }, [conversation])

  const fillConversation = (params) => {
    setConversation(params)
  }

  const sendMsg = () => {
    if (text.length > 0) {
      (document.getElementById('chat') as HTMLInputElement).value = ''
      const id =
        state.conversation.participants[0] !== state.account._id
          ? state.conversation.participants[0]
          : state.conversation.participants[1]
      socket.emit('chat', { room, id, content: text })
    }
  }

  const getConversation = (id) => {
    if (room) {
      socket.emit('leaveRoom', room)
    }
    socket.emit('subscribe', id)
    setRoom(id)
    roomRef.current = id
    actions.getSingleConversation({ id, func: fillConversation })
  }

  const handleInputChange = (e) => {
    setText(e.target.value)
  }

  const handleKeyDown = (e) => {
    console.log(conversation)
    if (e.keyCode === 13) {
      sendMsg()
    }
  }

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 888px)' })

  return (
    <ChatWrapper chatRight={!props.res}>
      {account ? (
        isTabletOrMobile && !props.res ? null : (
          <ChatHeight>
            <ChatHeaderWrapper>
              {props.res && (
                <ProfileHeaderBack>
                  <HeaderBackWrapper
                    onClick={() => window.history.back()}
                  >
                    <ICON_ARROWBACK />
                  </HeaderBackWrapper>
                </ProfileHeaderBack>
              )}
            </ChatHeaderWrapper>
            <ConvDiv>
              <ConversationWrapper id="messageBody">
                {room ? (
                  conversation.map((msg, i) => (
                    <Box key={msg._id}>
                      {msg.sender.username === account.username ? (
                        <UsersBox>
                          <UsersMsg>
                            <UsersContent>{msg.content}</UsersContent>
                          </UsersMsg>
                          {i > 0 &&
                          moment
                            .duration(
                              moment(msg.createdAt).diff(
                                moment(conversation[i - 1].createdAt),
                              ),
                            )
                            .asMinutes() > 1 ? (
                            <UsersDate>
                              {moment(msg.createdAt).format(
                                'MMM D, YYYY, h:mm A',
                              )}
                            </UsersDate>
                          ) : (
                            <Box mt={-20} />
                          )}
                        </UsersBox>
                      ) : (
                        <SenderBox>
                          <SenderMsg>
                            <SenderContent>{msg.content}</SenderContent>
                          </SenderMsg>
                          {i > 0 &&
                          moment
                            .duration(
                              moment(msg.createdAt).diff(
                                moment(conversation[i - 1].createdAt),
                              ),
                            )
                            .asMinutes() > 1 ? (
                            <SenderDate>
                              {moment(msg.createdAt).format(
                                'MMM D, YYYY, h:mm A',
                              )}
                            </SenderDate>
                          ) : (
                            <Box mt={-20} />
                          )}
                        </SenderBox>
                      )}
                    </Box>
                  ))
                ) : (
                  <NotSelectedMsg>
                    <Box>You dont have a message selected</Box>
                    <p>Choose one from your existing messages, on the left.</p>
                  </NotSelectedMsg>
                )}
              </ConversationWrapper>
            </ConvDiv>
            <ChatBottomWrapper>
              <ChatInputContainer
                active={Boolean(room)}
              >
                <input
                  disabled={!room}
                  onKeyDown={(e) => handleKeyDown(e)}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Start a new message"
                  id="chat"
                  type="text"
                  name="message"
                />
                <Box onClick={sendMsg}>
                  <ICON_SEND />
                </Box>
              </ChatInputContainer>
            </ChatBottomWrapper>
          </ChatHeight>
        )
      ) : null}
    </ChatWrapper>
  )
}

export default withRouter(ChatPage)

const ChatWrapper = styled(Box)<{ chatRight?: boolean }>`
  max-width: 100%;
  border-right: 1px solid rgb(230, 236, 240);
  width: 100%;
  color: #657786;
  min-height: 100vh;
  @media only (max-width: 888px){
    display: none;
  }
  ${p => p.chatRight && css`
    @media (max-width: 888px) {
      display: none;
    }
  `}
`

const ChatHeaderWrapper = styled(Box)`
  position: sticky;
  border-bottom: 1px solid rgb(230, 236, 240);
  background-color: #fff;
  z-index: 3;
  top: 0px;
  display: flex;
  align-items: center;
  height: 53px;
  min-height: 53px;
  padding: 3px 15px;
  max-width: 100%;
  width: 100%;
  font-size: 19px;
  h4{
    color: #000;
  }
  span{
    font-weight: 400;
    color: rgb(101, 119, 134);
    margin-left: 5px;
  }
`

const ConvDiv = styled(Box)`
  position: relative;
  height: 100%;
`

const ConversationWrapper = styled(Box)`
  padding: 20px 15px 0 15px;
  margin: 0 auto;
  height: calc(100% - 110px);
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const UsersBox = styled(Box)`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
`

const UsersMsg = styled(Box)`
  display: flex;
  justify-content: flex-end;
`

const UsersContent = styled(Box)`
  padding: 10px 15px;
  background-color: rgb(29, 161, 242);
  color: #fff;
  max-width: 100%;
  border-radius: 30px 30px 0 30px;
  margin-bottom: 3px;
`

const UsersDate = styled(Box)`
  display: flex;
  justify-content: flex-end;;
  font-size: 13px;
`

const SenderBox = styled(Box)`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
`

const SenderMsg = styled(Box)`
  display: flex;
`

const SenderContent = styled(Box)`
  padding: 10px 15px;
  background-color: rgb(230, 236, 240);
  color: #000;
  max-width: 100%;
  border-radius: 30px 30px 30px 0px;
  margin-bottom: 3px;
`

const SenderDate = styled(Box)`
  display: flex;
  font-size: 13px;
`

const ChatInputContainer = styled(Box)<{ active?: boolean }>`
  background-color: #e6ecf0;
  border: 1px solid transparent;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  min-height: 38px;
  width: 100%;
  input{
    background-color: inherit;
    border: inherit;
    width: 100%;
    font-size: 15px;
    color: #657786;
    outline: none;
    padding: 6px 10px;
    border-radius: 9999px;
  }
  div{
    display: flex;
    align-items: center;
  }
  svg{
    height: 22.5px;
    width: 22.5px;
    margin-left: 10px;
    fill: rgb(29, 161, 242);
    cursor: pointer;
  }
  ${p => p.active && css`
    background-color: #fff;
    input{
      border: 1px solid rgb(29, 161, 242);
    }
  `}
`

const NotSelectedMsg = styled(Box)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: -53px;
  div{
    font-size: 19px;
    font-weight: bold;
    color: #000;
    margin-bottom: 10px;
  }
  p{
    font-size: 16px;
    color: rgb(101, 119, 134);
  }
`
