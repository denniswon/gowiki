import React, { useEffect, useState } from 'react'
import { useStore } from '../store/store'
import { Link, withRouter } from 'react-router-dom'
import { ICON_SEARCH, ICON_ARROWBACK } from '../Icons'
import Loader from './Loader'
import TweetCard from './TweetCard'
import styled, { css } from 'styled-components'
import { Box } from 'styles'
import { Span } from '../styles/global'

const Explore = (props) => {
 const { state, actions } = useStore()
  const { trends, result, tagTweets } = state
  const [tab, setTab] = useState('Trends')
  const [trendOpen, setTrendOpen] = useState(false)

  const searchOnChange = (param) => {
    if (tab !== 'Search') {
      setTab('Search')
    }
    if (param.length > 0) {
      actions.search({ description: param })
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    actions.getTrend()
    // if(props.history.location.search.length>0){
    //   goToTrend(props.history.location.search.substring(1))

    // }
  }, [])

  // const followUser = (e, id) => {
  //   e.stopPropagation()
  //   actions.followUser(id)
  // }

  // const goToUser = (id) => {
  //   props.history.push(`/profile/${id}`)
  // }

  const goToTrend = (hash) => {
    setTrendOpen(true)
    const hashtag = hash.substring(1)
    actions.getTrendTweets(hashtag)
  }

  return (
    <ExploreWrapper>
      <ExploreHeader headerBorder={trendOpen}>
        {trendOpen && (
          <ExploreHeaderBack>
            <ExploreBackWrapper
              onClick={() => setTrendOpen(false)}
            >
              <ICON_ARROWBACK />
            </ExploreBackWrapper>
          </ExploreHeaderBack>
        )}
        <ExploreSearchWrapper>
          <ExploreSearchIcon>
            <ICON_SEARCH />
          </ExploreSearchIcon>
          <ExploreSearchInput>
            <input
              onChange={(e) => searchOnChange(e.target.value)}
              placeholder="Search for hashtags or people"
              type="text"
              name="search"
            />
          </ExploreSearchInput>
        </ExploreSearchWrapper>
      </ExploreHeader>
      {!trendOpen ? (
        <Box>
          <ExploreNavMenu>
            <ExploreNavItem active={tab === 'Trends'}
              onClick={() => setTab('Trends')}
            >
              Trending
            </ExploreNavItem>
            <ExploreNavItem active={tab === 'Search'}
              onClick={() => setTab('Search')}
            >
              Search
            </ExploreNavItem>
          </ExploreNavMenu>
          {tab === 'Trends' ? (
            trends.length > 0 ? (
              trends.map((t, i) => (
                <TrendingCardWrapper
                  onClick={() => goToTrend(t.content)}
                  key={t._id}
                >
                  <TrendingCardHeader>
                    {i + 1} <Span>·</Span> Trending
                  </TrendingCardHeader>
                  <TrendingCardContent> {t.content} </TrendingCardContent>
                  <TrendingCardCount> {t.count} Tweets </TrendingCardCount>
                </TrendingCardWrapper>
              ))
            ) : (
              <Loader />
            )
          ) : result.length ? (
            result.map((r) => (
              <TweetCard
                retweet={r.retweet}
                username={r.username}
                name={r.name}
                parent={r.parent}
                key={r._id}
                id={r._id}
                user={r.user}
                createdAt={r.createdAt}
                description={r.description}
                images={r.images}
                replies={r.replies}
                retweets={r.retweets}
                likes={r.likes}
              />
            ))
          ) : (
            <TrySearching>
              Nothing to see here ..
              <Box />
              Try searching for people, usernames, or keywords
            </TrySearching>
          )}
        </Box>
      ) : (
        <Box>
          {tagTweets.length > 0 &&
            tagTweets.map((t) => (
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
            ))}
        </Box>
      )}
    </ExploreWrapper>
  )
}

export default withRouter(Explore)

export const ExploreWrapper = styled(Box)`
  max-width: 600px;
  border-right: 1px solid rgb(230, 236, 240);
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 2000px;
`

export const ExploreHeader = styled(Box)<{ headerBorder?: boolean }>`
  position: sticky;
  border-left: 1px solid rgb(230, 236, 240);
  background-color: #fff;
  z-index: 8;
  top: 0px;
  display: flex;
  align-items: center;
  height: 53px;
  min-height: 53px;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  ${p => p.headerBorder && headerBorder}
`

export const headerBorder = css`
  border-bottom: 1px solid rgb(230, 236, 240);
`

export const ExploreSearchWrapper = styled(Box)`
  background-color: rgb(230, 236, 240);
  border: 1px solid transparent;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  min-height: 38px;
  width: 100%;
`

export const ExploreSearchIcon = styled(Box)`
  display: flex;
  align-items: center;
  svg{
    width: 40px;
    height: 18.75px;
    fill: rgb(101, 119, 134);
    padding-left: 10px;
  }
`

export const ExploreSearchInput = styled(Box)`
  width: 100%;
  input{
    background-color: inherit;
    border: inherit;
    padding: 6px 10px;
    width: 100%;
    font-size: 15px;
    color: rgb(101, 119, 134);
    outline: none;
  }
`

export const ExploreNavMenu = styled(Box)`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid rgb(230, 236, 240);
`

export const ExploreNavItem = styled(Box)<{ active?: boolean }>`
  padding: 15px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  color: rgb(101, 119, 134);
  transition: 0.2s;
  will-change: background-color;
  box-sizing:border-box;
  border-bottom: 2px solid transparent;
  &:hover{
    background-color: rgba(29, 161, 242, 0.1);
    color: rgb(29, 161, 242);
  }
  ${p => p.active && css`
    border-bottom: 2px solid rgb(29, 161, 242);
    color: rgb(29, 161, 242);
  `}
`

export const SearchResultWapper = styled(Box)`
  border-bottom: 1px solid rgb(230, 236, 240);
  padding: 10px 15px;
  transition: 0.2s;
  cursor: pointer;
  display: flex;
  &:hover{
    background-color: rgb(245,248,250);
  }
`

export const SearchUserPicWrapper = styled(Link)`
  flex-basis: 49px;
  margin-right: 10px;   
  img{
    object-fit: cover;
  }
`

export const SearchUserDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const SearchUserInfo = styled(Box)`
  display: flex;
  flex-direction: column;
`

export const SearchUserName = styled(Box)`
  font-weight: bold;
  color: rgb(20, 23, 26) !important;
  font-weight: 600 !important;
`

export const SearchUserUsername = styled(Box)`
  color: #657786 !important;
  font-weight: 400 !important;
  line-height: 1;
`

export const SearchUserBio = styled(Box)`
  margin-top: 7px;
`

export const SearchUserWrap = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const TrendingCardWrapper = styled(Box)`
  border-bottom: 1px solid rgb(245,248,250);
  padding: 10px 15px;
  transition: 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  &:hover{
    background-color: rgb(245, 248, 250);
  }
`

export const TrendingCardHeader = styled(Box)`
  color: rgb(101, 119, 134);
  font-size: 14px;
  span{
    padding: 0 3px;
  }
`

export const TrendingCardContent = styled(Box)`
  font-weight: bold;
  font-size: 19px;
  padding-top: 2px;
  padding-bottom: 2px;
`

export const TrendingCardCount = styled(Box)`
  font-size: 15px;
  color: rgb(101, 119, 134);
`

export const TrySearching = styled(Box)`
  font-weight: bold;
  font-size: 17px;
  text-align: center;
  margin-top: 40px;
  color: #657786;
  div{
    margin-bottom: 15px;
  }
`

export const FollowBtnWrap = styled(Box)<{ removeSwitch?: boolean, unfollowSwitch?: boolean }>`
  min-height: 30px;
  min-width: 70px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  border: 1px solid #1da1f2;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1em;
  padding-right: 1em;
  &:hover{
    background-color: rgba(29, 161, 242, 0.1);
  }
  span{
    text-align: center;
    font-weight: 800;
    color: #1da1f2;
    width: 100%;
  }
  ${p => p.removeSwitch && removeSwitch}
  ${p => p.unfollowSwitch && unfollowSwitch}
`

export const removeSwitch = css`
  background-color: rgb(224, 36, 94) !important;
  border-color: rgb(224, 36, 94) !important;
  span{
    color: #fff !important;
  }
`

export const unfollowSwitch = css`
  background-color: rgb(29, 161, 242);
  span{color: #fff !important;}
  &:hover{
    background-color: rgb(202,32,85) !important;
    border: 1px solid transparent;
    span{
      color: #fff;
      span{display: none;}
      &:before{
        content: 'Unfollow';
      }
    }
  }
`

export const ExploreHeaderBack = styled(Box)`
  min-width: 55px;
  min-height: 30px;
  justify-content: center;
  align-items: flex-start;
`

export const ExploreBackWrapper = styled(Box)`
  margin-left: -5px;
  width: 39px;
  height: 39px;
  transition: 0.2s ease-in-out;
  will-change: background-color;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg{
    height: 1.5em;
    fill: rgb(29,161,242);
  }
  &:hover{
    background-color: rgba(29,161,242,0.1);
  }
`
