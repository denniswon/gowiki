import React, { useEffect, useState, useRef } from 'react'
import { useStore } from '../store/store'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ICON_IMGUPLOAD } from '../Icons'
import { API_URL } from '../config'
import Loader from './Loader'
import TweetCard from './TweetCard'
import styled from 'styled-components'
import { Box, c } from 'styles'
import {
  CancelImage, InnerImageBox, InnerInputBox, InnerInputLinks, InputAttachWrapper, InputLinksSide,
  TweetBtnHolder, TweetBtnSide, TweetInput, TweetInputDivider, TweetInputSide, TweetInputWrapper,
  TweetProfileWrapper, TweetUploadImage
} from '../styles/global'

const Home = () => {
 const { state, actions } = useStore()
  const { account, session } = state
  useEffect(() => {
    window.scrollTo(0, 0)
    actions.getTweets()
  }, [])

  // used for contenteditable divs on react hooks
  const tweetT = useRef('')
  const handleChange = (e) => {
    if (
      tweetT.current.trim().length <= 280 &&
      tweetT.current.split(/\r\n|\r|\n/).length <= 30
    ) {
      tweetT.current = e.target.value
      setTweetText(tweetT.current)
    }
    document.getElementById('tweet-box').innerHTML =
      document.getElementById('tweet-box').innerHTML.replace(
        /(\#\w+)/g,
        `<span style={{ color: ${c.lightBlue}}}>$1</span>`
      )
  }
  const [tweetText, setTweetText] = useState('')
  const [tweetImage, setTweetImage] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)

  const submitTweet = () => {
    if (!tweetText.length) {
      return
    }

    const hashtags = tweetText.match(/#(\w+)/g)

    const values = {
      description: tweetText,
      images: [tweetImage],
      hashtags,
    }
    actions.tweet(values)
    tweetT.current = ''
    setTweetText('')
    setTweetImage(null)
  }

  const onchangefile = () => {
    setImageLoading(true)
    const file = (document.getElementById('file') as HTMLInputElement).files[0]

    const bodyFormData = new FormData()
    bodyFormData.append('image', file)
    axios
      .post(`${API_URL}/tweet/upload`, bodyFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Twittertoken')}`,
        },
      })
      .then((res) => {
        setTweetImage(res.data.imageUrl)
        setImageLoading(false)
      })
      .catch((err) => alert('error uploading image'))
  }

  const removeImage = () => {
    (document.getElementById('file') as HTMLInputElement).value = ''
    setTweetImage(null)
    setImageLoaded(false)
  }

  return (
    <HomeWrapper>
      <HomeHeaderWrapper>
        <HomeHeader>Latest Tweets</HomeHeader>
      </HomeHeaderWrapper>
      {session ? (
        <TweetInputWrapper>
          <TweetProfileWrapper>
            <Link to={`/profile/${account && account.username}`}>
              {account && (
                <img
                  alt=""
                  style={{ borderRadius: '50%', minWidth: '49px' }}
                  width="100%"
                  height="49px"
                  src={account.profileImg}
                />
              )}
            </Link>
          </TweetProfileWrapper>
          <TweetInputSide
            onClick={() => document.getElementById('tweet-box').focus()}
          >
            <InnerInputBox>
              <TweetInput
                active={tweetText.length > 0}
                onPaste={(e) => e.preventDefault()}
                id="tweet-box"
                onKeyDown={(e) =>
                  tweetT.current.length > 279
                    ? e.keyCode !== 8 && e.preventDefault()
                    : null
                }
                placeholder="What's happening?"
                html={tweetT.current}
                onChange={(e) => handleChange(e)}
              />
            </InnerInputBox>
            <Box>{imageLoading ? <Loader /> : null}</Box>
            {tweetImage && (
              <InnerImageBox>
                <TweetUploadImage
                  onLoad={() => setImageLoaded(true)}
                  src={tweetImage}
                  alt="tweet"
                />
                {imageLoaded && (
                  <CancelImage onClick={removeImage}>
                    x
                  </CancelImage>
                )}
              </InnerImageBox>
            )}
            <InnerInputLinks>
              <InputLinksSide>
                <InputAttachWrapper ml={-10}>
                  <ICON_IMGUPLOAD styles={{ fill: 'rgb(29, 161, 242)' }} />
                  <input
                    title=" "
                    id="file"
                    style={{ opacity: '0' }}
                    type="file"
                    onChange={() => onchangefile()}
                  />
                </InputAttachWrapper>
              </InputLinksSide>
              <TweetBtnHolder>
                <Box
                  style={{
                    fontSize: '13px',
                    color: tweetText.length >= 280 ? 'red' : null,
                  }}
                >
                  {tweetText.length > 0 && `${tweetText.length}/280`}
                </Box>
                <TweetBtnSide active={tweetText.length > 0}
                  onClick={submitTweet}
                >
                  Tweet
                </TweetBtnSide>
              </TweetBtnHolder>
            </InnerInputLinks>
          </TweetInputSide>
        </TweetInputWrapper>
      ) : null}
      <TweetInputDivider></TweetInputDivider>
      {state.tweets.length > 0 ? (
        state.tweets.map((t) => (
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
      ) : (
        <Loader />
      )}
    </HomeWrapper>
  )
}

export default Home

export const HomeWrapper = styled(Box)`
    max-width: 600px;
    border-right: 1px solid rgb(230, 236, 240);
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 2000px;
`

export const HomeHeaderWrapper = styled(Box)`
    position: sticky;
    border-bottom: 1px solid rgb(230, 236, 240);
    border-left: 1px solid rgb(230, 236, 240);
    background-color: rgb(255, 255, 255);
    z-index: 3;
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

export const HomeHeader = styled.h2`
    font-weight: 800;
    font-size: 19px;
    color: rgb(20, 23, 26);
    line-height: 1.3125;
`
