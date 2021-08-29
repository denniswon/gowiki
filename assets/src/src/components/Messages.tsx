import React, { useEffect } from 'react'
import { useStore } from '../store/store'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment'
import { useMediaQuery } from 'react-responsive'
import Chat from './ChatPage'
import { auto } from 'darkreader'
import styled from 'styled-components'
import { Box } from 'styles'
import { Span } from '../styles/global'

const Messages = (props) => {
 const { state, actions } = useStore()
  const { account, conversations } = state
  const path = props.history.location.pathname

  useEffect(() => {
    actions.getConversations()
    document.getElementsByTagName('body')[0].style.cssText =
      'position:fixed; overflow-y: scroll;'
  }, [path])

  useEffect(
    () => () => (document.getElementsByTagName('body')[0].style.cssText = ''),
    [],
  )

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 888px)' })
  return (
    <>
      {isTabletOrMobile && path !== '/messages' && account ? (
        <Chat res />
      ) : (
        <MessagesWrapper>
          <MessagesHeaderWrapper>Messages</MessagesHeaderWrapper>
          <MessagesBody>
            <RecentMessagesWrapper>
              {account &&
              conversations &&
              conversations.conversations.length > 0 ? (
                conversations.conversations.map((con) => (
                  <MessageBox
                    style={{
                      borderRight:
                        path.slice(10) === con._id ? '2px solid #1da1f2' : null,
                    }}
                    key={con._id}
                    onClick={() => props.history.push(`/messages/${con._id}`)}
                  >
                    <MessageAvatar
                      onClick={(e) => e.stopPropagation()}
                      to={`/profile/${
                        con.participants[0].username !== account.username
                          ? con.participants[0].username
                          : con.participants[1].username
                      }`}
                    >
                      <img
                        width="100%"
                        height="100"
                        src={
                          con.participants[0].username !== account.username
                            ? con.participants[0].profileImg
                            : con.participants[1].profileImg
                        }
                        alt=""
                      />
                    </MessageAvatar>
                    {account && (
                      <MessageDetails>
                        <MessageInfo>
                          {con.participants[0].username !== account.username ? (
                            <Box>
                              {con.participants[0].name}
                              <Span>@{con.participants[0].username}</Span>
                            </Box>
                          ) : (
                            <Box>
                              {con.participants[1].name}
                              <Span>@{con.participants[1].username}</Span>
                            </Box>
                          )}
                          <Span>
                            {moment(con.updatedAt).format('MMM D, YYYY')}
                          </Span>
                        </MessageInfo>
                        <Box>
                          {con.messages.length > 0 &&
                            con.messages[con.messages.length - 1].content.slice(
                              0,
                              15,
                            )}
                        </Box>
                      </MessageDetails>
                    )}
                  </MessageBox>
                ))
              ) : (
                <h5
                  style={{
                    textAlign: 'center',
                    margin: '10% auto',
                    width: '100%',
                  }}
                >
                  You have no messages
                </h5>
              )}
            </RecentMessagesWrapper>
          </MessagesBody>
        </MessagesWrapper>
      )}
    </>
  )
}

export default withRouter(Messages)


export const MessagesWrapper = styled(Box)`
  width: 400px;
  border-right: 1px solid rgb(230, 236, 240);
  color: #657786;
  min-height: 100vh;
  @media(max-width: 888px) {
    .messages-wrapper{
      width: 100% !important;
    }
  }
`

export const MessagesBody = styled(Box)`
`

export const MessagesHeaderWrapper = styled(Box)`
  position: sticky;
  border-bottom: 1px solid rgb(230, 236, 240);
  border-left: 1px solid rgb(230, 236, 240);
  background-color: #fff;
  z-index: 3;
  top: 0px;
  display: flex;
  align-items: center;
  height: 53px;
  min-height: 53px;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
  font-weight: 800;
  font-size: 19px;
  color: #14171a;
  @media(max-width: 888px) {
    max-width: 100% !important;
  }
`

export const RecentMessagesWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: calc(100vh - 96px);
`

export const MessageBox = styled(Box)`
  display: flex;
  padding: 15px;
  transition: 0.2s ease-in-out;
  border-bottom: 1px solid rgb(230, 236, 240);
  &:hover{
    cursor: pointer;
    background-color: rgb(245, 248, 250);
  }
`

export const MessageAvatar = styled(Link)`
  flex-basis: 49px;
  min-width: 49px;
  margin-right: 10px;
  img{
    border-radius: 50%;
    max-height: 49px;
    object-fit: cover;
  }
`

export const MessageDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const MessageInfo = styled(Box)`
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  overflow: hidden;
  div{
    max-width: 210px;
    overflow: hidden;
    font-weight: 800;
    color: #000;   
  }
  span{
    font-weight: 400;
    margin-left: 3px;
    color: rgb(101, 119, 134);
  }
`
