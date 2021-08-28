import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Box } from 'styles'
import { useStore } from '../store/store'
import TweetCard from './TweetCard'

const Bookmarks = (props) => {
 const { state, actions } = useStore()

  const { account, bookmarks } = state
  // const userParam = props.match.params.username

  useEffect(() => {
    window.scrollTo(0, 0)
    actions.getBookmarks()
    // actions.startChat({id: '5eee5f050cc0ae0017ed2fb2', content: 'hi there buddy'})
  }, [])

  return (
    <BookmarksWrapper>
      <BookmarksHeaderWrapper>
        <BookmarksHeaderContent>
          <BookmarksHeaderName>Bookmarks</BookmarksHeaderName>
          <BookmarksHeaderTweets>
            @{account && account.username}
          </BookmarksHeaderTweets>
        </BookmarksHeaderContent>
      </BookmarksHeaderWrapper>
      {/* add loader for bookmarks when empty using dispatch */}
      {account && account.bookmarks.length < 1 ? (
        <div className="workInProgress"> You don't have any bookmarks </div>
      ) : (
        bookmarks.map((t) => (
          <TweetCard
            retweet={t.retweet}
            username={t.username}
            name={t.name}
            parent={t.parent}
            key={t._id}
            id={t._id}
            user={t.user}
            createdAt={t.createdAt}
            description={t.description}
            images={t.images}
            replies={t.replies}
            retweets={t.retweets}
            likes={t.likes}
          />
        ))
      )}
    </BookmarksWrapper>
  )
}

export default withRouter(Bookmarks)

export const BookmarksWrapper = styled(Box)`
  max-width: 600px;
  border-right: 1px solid rgb(230, 236, 240);
  width: 100%;
  // height: 100vh;
  display: flex;
  flex-direction: column;
  min-height: 2000px;
`

export const BookmarksHeaderWrapper = styled(Box)`
  position: sticky;
  border-bottom: 1px solid rgb(230, 236, 240);
  border-left: 1px solid rgb(230, 236, 240);
  background-color: #fff;
  z-index: 8;
  top: 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 53px;
  min-height: 53px;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
`

export const BookmarksHeaderContent = styled(Box)`
  display: flex;
  flex-direction: column;
`

export const BookmarksHeaderName = styled(Box)`
  font-weight: 800;
  font-size: 19px;
`

export const BookmarksHeaderTweets = styled(Box)`
  font-size: 14px;
  line-height: calc(19.6875px);
  color: rgb(101, 119, 134);
`
