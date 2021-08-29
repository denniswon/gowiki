import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useStore } from '../store/store'
import Loader from './Loader'
import styled from 'styled-components'
import { Box } from 'styles'
import { Span } from '../styles/global'
import {
  SearchUserPicWrapper, SearchUserDetails, SearchUserInfo, SearchUserName,
  SearchUserUsername, FollowBtnWrap, SearchUserWrap
} from './Explore'

const Feed = (props) => {
 const { state, actions } = useStore()

  const { account, trends, suggestions, session } = state
  // const userParam = props.match.params.username

  useEffect(() => {
    actions.getTrend()
    if (session) {
      actions.whoToFollow()
    }
  }, [])

  const goToUser = (id) => {
    props.history.push(`/profile/${id}`)
  }

  const followUser = (e, id) => {
    e.stopPropagation()
    actions.followUser(id)
  }

  return (
    <FeedWrapper>
      <FeedTrendingCard>
        <FeedCardHeader>Trending</FeedCardHeader>
        {trends.length > 0 ? (
          trends.slice(0, 3).map((t, i) => (
            <FeedCardTrend
              onClick={() => props.history.push('/explore')}
              key={t._id}
            >
              <Box>{i + 1} · Trending</Box>
              <Box>{t.content}</Box>
              <Box>{t.count} Tweets</Box>
            </FeedCardTrend>
          ))
        ) : (
          <Loader />
        )}
        <FeedMore
          onClick={() => props.history.push(`/explore`)}
        >
          Show more
        </FeedMore>
      </FeedTrendingCard>
      {account ? (
        <FeedTrendingCard>
          <FeedCardHeader>Who to follow</FeedCardHeader>
          {suggestions.length > 0 ? (
            suggestions.map((s) => {
              if (s.username !== account.username) {
                return (
                  <FeedCardTrend key={s._id}>
                    <SuggResultWapper
                      onClick={() => goToUser(s.username)}
                    >
                      <SearchUserPicWrapper
                        to={`/profile/${s.username}`}
                      >
                        <img
                          alt=""
                          style={{ borderRadius: '50%', minWidth: '49px' }}
                          width="100%"
                          height="49px"
                          src={s.profileImg}
                        />
                      </SearchUserPicWrapper>
                      <SearchUserDetails>
                        <SearchUserWrap>
                          <SearchUserInfo>
                            <SearchUserName>{s.name}</SearchUserName>
                            <SearchUserUsername>
                              @{s.username}
                            </SearchUserUsername>
                          </SearchUserInfo>
                          <FollowBtnWrap
                            unfollowSwitch={account.following.includes(s._id)}
                            onClick={(e) => followUser(e, s._id)}
                          >
                            <Span style={{ lineHeight: '0.8' }}>
                              <Span>
                                {account.following.includes(s._id)
                                  ? 'Following'
                                  : 'Follow'}
                              </Span>
                            </Span>
                          </FollowBtnWrap>
                        </SearchUserWrap>
                      </SearchUserDetails>
                    </SuggResultWapper>
                  </FeedCardTrend>
                )
              }
            })
          ) : (
            <Loader />
          )}
          <FeedMore>{/* Show more */}</FeedMore>
        </FeedTrendingCard>
      ) : null}
    </FeedWrapper>
  )
}

export default withRouter(Feed)

export const FeedWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: sticky;
  top: 5px;
`

export const FeedTrendingCard = styled(Box)`
  width: 100%;
  background-color: rgb(245, 248, 250);
  margin-top: 10px;
  margin-bottom: 15px;
  border: 1px solid rgb(245, 248, 250);
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
`

export const FeedCardHeader = styled.h3`
  border-bottom: 1px solid rgb(230, 236, 240);
  padding: 10px 15px;
  display: flex;
  align-items: center;
  font-size: 19px;
  font-weight: bold;
`

export const FeedCardTrend = styled(Box)`
  border-bottom: 1px solid rgb(230, 236, 240);
  padding: 10px 15px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover{
    background-color: rgba(0, 0, 0, 0.03);
  }
  div:nth-child(1){
    font-size: 13px;
    color: rgb(101, 119, 134);
  }
  div:nth-child(2){
    font-size: 15px;
    color: rgb(20, 23, 26);
    font-weight: bold;
    padding-top: 2px;
  }
  div:nth-child(3){
    font-size: 15px;
    color: rgb(101, 119, 134);
    padding-top: 2px;
  }
`

export const FeedMore = styled(Box)`
  padding: 15px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  font-size: 15px;
  color: rgb(29,161,242);
`

export const SuggResultWapper = styled(Box)`
  cursor: pointer;
  display: flex;
`
