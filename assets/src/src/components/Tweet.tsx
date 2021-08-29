import React, { useEffect, useState, useRef } from 'react'
import { withRouter, useHistory, Link } from 'react-router-dom'
import { useStore } from '../store/store'
import './style.scss'
import moment from 'moment'
import Loader from './Loader'
import {
  ICON_ARROWBACK,
  ICON_HEART,
  ICON_REPLY,
  ICON_RETWEET,
  ICON_HEARTFULL,
  ICON_BOOKMARK,
  ICON_DELETE,
  ICON_BOOKMARKFILL,
  ICON_IMGUPLOAD,
  ICON_CLOSE,
} from '../Icons'
import axios from 'axios'
import { API_URL } from '../config'
import TweetCard, {
  CardContentHeader, CardContentWrapper, CardHeaderDate, CardHeaderDetail, CardHeaderDot, CardHeaderUser,
  CardHeaderUsername, CardUserPicWrapper, MainTweetUser, ReplyContentWrapper, ReplyToUser, ReplyTweetUsername
} from './TweetCard'
import styled from 'styled-components'
import { Box, m } from 'styles'
import {
  CancelImage, CardContentInfo, HeaderBackWrapper, InnerImageBox, InnerInputBox, InnerInputLinks, InputAttachWrapper,
  InputLinksSide, ModalBody, ModalCloseIcon, ModalCloseIconWrap, ModalContent, ModalEdit, ModalHeader, ModalTitle,
  TweetBtnHolder, TweetBtnSide, TweetInput, TweetInputSide, TweetInputWrapper, TweetProfileWrapper, TweetUploadImage
} from '../styles/global'
import { CardIcon } from './TweetCard'
import { ProfileHeaderBack } from './Lists'

const TweetPage = (props) => {
  const history = useHistory()

 const { state, actions } = useStore()
  const { tweet, account, session } = state

  const [modalOpen, setModalOpen] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [replyImage, setReplyImg] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    actions.getTweet(props.match.params.id)
  }, [props.match.params.id])
  const image = new Image()

  let info
  const likeTweet = (id) => {
    if (!session) {
      actions.alert('Please Sign In')
      return
    }
    info = { dest: 'tweet', id }
    actions.likeTweet(info)
  }
  const retweet = (id) => {
    if (!session) {
      actions.alert('Please Sign In')
      return
    }
    info = { dest: 'tweet', id }
    actions.retweet(info)
  }
  const bookmarkTweet = (id) => {
    if (!session) {
      actions.alert('Please Sign In')
      return
    }
    info = { dest: 'tweet', id }
    actions.bookmarkTweet(info)
  }
  const deleteTweet = (id) => {
    actions.deleteTweet(id)
  }

  const uploadImage = (file) => {
    const bodyFormData = new FormData()
    bodyFormData.append('image', file)
    axios
      .post(`${API_URL}/tweet/upload`, bodyFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Twittertoken')}`,
        },
      })
      .then((res) => {
        setReplyImg(res.data.imageUrl)
      })
      .catch((err) => alert('error uploading image'))
  }

  const onchangeImage = () => {
    const file = (document.getElementById('img') as HTMLInputElement).files[0]
    uploadImage(file)
  }

  const removeImage = () => {
    (document.getElementById('img') as HTMLInputElement).value = ''
    setReplyImg(null)
    setImageLoaded(false)
  }

  const toggleModal = (e?, type?) => {
    if (e) {
      e.stopPropagation()
    }
    // if(param === 'edit'){setSaved(false)}
    // if(type === 'parent'){setParent(true)}else{setParent(false)}
    setModalOpen(!modalOpen)
  }

  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  const tweetT = useRef('')
  const handleChange = (evt) => {
    if (
      tweetT.current.trim().length <= 280 &&
      tweetT.current.split(/\r\n|\r|\n/).length <= 30
    ) {
      tweetT.current = evt.target.value
      setReplyText(tweetT.current)
    }
  }

  const replyTweet = (type) => {
    toggleModal()
    const hashtags = replyText.match(/#(\w+)/g)
    if (!replyText.length) {
      return
    }
    const values = {
      description: replyText,
      images: [replyImage],
      parent: props.match.params.id,
      hashtags,
    }
    actions.tweet(values)
    tweetT.current = ''
    setReplyText('')
    setReplyImg(null)
    actions.alert('Tweet sent!')
  }

  const goBack = () => {
    history.goBack()
  }

  return (
    <>
      {tweet ? (
        <TweetWrapper>
          <TweetHeaderWrapper>
            <ProfileHeaderBack>
              <TweetHeaderBackWrapper onClick={() => goBack()}>
                <ICON_ARROWBACK />
              </TweetHeaderBackWrapper>
            </ProfileHeaderBack>
            <TweetHeaderContent> Tweet </TweetHeaderContent>
          </TweetHeaderWrapper>
          <TweetBodyWrapper>
            <TweetHeaderContent>
              <TweetUserPic>
                <Link to={`/profile/${tweet.user.username}`}>
                  <img
                    alt=""
                    style={{ borderRadius: '50%', minWidth: '49px' }}
                    width="100%"
                    height="49px"
                    src={tweet.user.profileImg}
                  />
                </Link>
              </TweetUserPic>
              <TweetUserWrap>
                <TweetUsername>{tweet.user.name}</TweetUsername>
                <TweetUsername>@{tweet.user.username}</TweetUsername>
              </TweetUserWrap>
            </TweetHeaderContent>
            <TweetContent>{tweet.description}</TweetContent>
            {tweet.images[0] ? (
              <TweetImageWrapper>
                <Box
                  style={{
                    backgroundImage: `url(${tweet.images[0]})`,
                    paddingBottom: `${
                      ((image.src = tweet.images[0]),
                      100 / (image.width / image.height))
                    }%`,
                  }}
                />
              </TweetImageWrapper>
            ) : null}
            <TweetDate>
              {moment(tweet.createdAt).format('h:mm A · MMM D, YYYY')}
            </TweetDate>
            <TweetStats>
              <IntNum> {tweet.retweets.length} </IntNum>
              <IntText> Retweets </IntText>
              <IntNum> {tweet.likes.length} </IntNum>
              <IntText> Likes </IntText>
            </TweetStats>
            <TweetInteractions>
              <TweetIntIcon onClick={() => toggleModal()}>
                <CardIcon className="reply-icon">
                  {' '}
                  <ICON_REPLY />{' '}
                </CardIcon>
              </TweetIntIcon>
              <TweetIntIcon
                onClick={() => retweet(tweet._id)}
              >
                <CardIcon className="retweet-icon">
                  <ICON_RETWEET
                    styles={
                      account && account.retweets.includes(tweet._id)
                        ? { stroke: 'rgb(23, 191, 99)' }
                        : { fill: 'rgb(101, 119, 134)' }
                    }
                  />
                </CardIcon>
              </TweetIntIcon>
              <TweetIntIcon
                onClick={() => likeTweet(tweet._id)}
              >
                <CardIcon className="heart-icon">
                  {account && account.likes.includes(tweet._id) ? (
                    <ICON_HEARTFULL styles={{ fill: 'rgb(224, 36, 94)' }} />
                  ) : (
                    <ICON_HEART />
                  )}{' '}
                </CardIcon>
              </TweetIntIcon>
              <TweetIntIcon
                onClick={() =>
                  account && account.username === tweet.user.username
                    ? deleteTweet(tweet._id)
                    : bookmarkTweet(tweet._id)
                }
              >
                <CardIcon
                  className={
                    account && account.username === tweet.user.username
                      ? 'delete-icon'
                      : 'share-icon'
                  }
                >
                  {account && account.username === tweet.user.username ? (
                    <ICON_DELETE styles={{ fill: 'rgb(101, 119, 134)' }} />
                  ) : account && account.bookmarks.includes(tweet._id) ? (
                    <ICON_BOOKMARKFILL styles={{ fill: 'rgb(10, 113, 176)' }} />
                  ) : (
                    <ICON_BOOKMARK styles={{ fill: 'rgb(101, 119, 134)' }} />
                  )}
                </CardIcon>
              </TweetIntIcon>
            </TweetInteractions>
          </TweetBodyWrapper>

          {tweet.replies.map((r) => (
            <TweetCard
              retweet={r.retweet}
              username={r.username}
              name={r.name}
              replyTo={tweet.user.username}
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
          ))}
        </TweetWrapper>
      ) : (
        <TweetWrapper>
          <Loader />
        </TweetWrapper>
      )}

      {tweet && account ? (
        <ModalEdit
          onClick={() => toggleModal()}
          style={{ display: modalOpen ? 'block' : 'none' }}
        >
          {modalOpen ? (
            <ModalContent
              style={{ minHeight: '379px', height: 'initial' }}
              onClick={(e) => handleModalClick(e)}
            >
              <ModalHeader>
                <ModalCloseIcon>
                  <ModalCloseIconWrap
                    onClick={() => toggleModal()}
                  >
                    <ICON_CLOSE />
                  </ModalCloseIconWrap>
                </ModalCloseIcon>
                <ModalTitle>Reply</ModalTitle>
              </ModalHeader>
              <ModalBody mt={5}>
                <ReplyContentWrapper>
                  <CardUserPicWrapper>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      to={`/profile/${tweet.user.username}`}
                    >
                      <img
                        alt=""
                        style={{ borderRadius: '50%', minWidth: '49px' }}
                        width="100%"
                        height="49px"
                        src={tweet.user.profileImg}
                      />
                    </Link>
                  </CardUserPicWrapper>
                  <CardContentWrapper>
                    <CardContentHeader>
                      <CardHeaderDetail>
                        <CardHeaderUser>
                          <Link
                            onClick={(e) => e.stopPropagation()}
                            to={`/profile/${tweet.user.username}`}
                          >
                            {tweet.user.name}
                          </Link>
                        </CardHeaderUser>
                        <CardHeaderUsername>
                          <Link
                            onClick={(e) => e.stopPropagation()}
                            to={`/profile/${tweet.user.username}`}
                          >
                            {`@${tweet.user.username}`}
                          </Link>
                        </CardHeaderUsername>
                        <CardHeaderDot>·</CardHeaderDot>
                        <CardHeaderDate>
                          {/* <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${props.user.username}`}> */}
                          {/* {moment(parent? props.parent.createdAt : props.createdAt).fromNow(true).replace(' ','').replace('an','1').replace('minutes','m').replace('hour','h').replace('hs','h')} */}
                          {moment(tweet.createdAt).fromNow()}
                          {/* </Link> */}
                        </CardHeaderDate>
                      </CardHeaderDetail>
                    </CardContentHeader>
                    <CardContentInfo>{tweet.description}</CardContentInfo>
                    <ReplyToUser>
                      <ReplyTweetUsername>Replying to</ReplyTweetUsername>
                      <MainTweetUser>
                        @{tweet.user.username}
                      </MainTweetUser>
                    </ReplyToUser>
                  </CardContentWrapper>
                </ReplyContentWrapper>
                <TweetInputWrapper prel>
                  <TweetProfileWrapper>
                    <Box>
                      <img
                        alt=""
                        style={{ borderRadius: '50%', minWidth: '49px' }}
                        width="100%"
                        height="49px"
                        src={account.profileImg}
                      />
                    </Box>
                  </TweetProfileWrapper>
                  <TweetInputSide minh={180}
                    onClick={() => document.getElementById('replyBox').focus()}
                  >
                    <InnerInputBox>
                      <TweetInput
                        onKeyDown={(e) =>
                          tweetT.current.length > 279
                            ? e.keyCode !== 8 && e.preventDefault()
                            : null
                        }
                        onPaste={(e) => e.preventDefault()}
                        id="replyBox"
                        active={replyText.length > 0}
                        placeholder="Tweet your reply"
                        html={tweetT.current}
                        onChange={handleChange}
                      />
                    </InnerInputBox>
                    {replyImage && (
                      <InnerImageBox>
                        <TweetUploadImage
                          onLoad={() => setImageLoaded(true)}
                          src={replyImage}
                          alt="tweet image"
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
                        <InputAttachWrapper mb={-10}>
                          <ICON_IMGUPLOAD
                            styles={{ fill: 'rgb(29, 161, 242)' }}
                          />
                          <input
                            title=" "
                            id="img"
                            style={{ opacity: '0' }}
                            type="file"
                            onChange={() => onchangeImage()}
                          />
                        </InputAttachWrapper>
                      </InputLinksSide>
                      <TweetBtnHolder>
                        <m.Text fs={13} color={replyText.length >= 280 ? 'red' : null}>
                          {replyText.length > 0 && `${replyText.length}/280`}
                        </m.Text>
                        <TweetBtnSide
                          onClick={() =>
                            replyTweet(
                              parent
                                ? 'parent'
                                : props.retweet
                                ? 'retweet'
                                : 'none',
                            )
                          }
                          active={replyText.length > 0}>
                          Reply
                        </TweetBtnSide>
                      </TweetBtnHolder>
                    </InnerInputLinks>
                  </TweetInputSide>
                </TweetInputWrapper>
              </ModalBody>
            </ModalContent>
          ) : null}
        </ModalEdit>
      ) : null}
    </>
  )
}

export default withRouter(TweetPage)

export const TweetWrapper = styled(Box)`
  max-width: 600px;
  border-right: 1px solid rgb(230, 236, 240);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const TweetHeaderWrapper = styled(Box)`
  position: sticky;
  border-bottom: 1px solid rgb(230, 236, 240);
  border-left: 1px solid rgb(230, 236, 240);
  background-color: #fff;
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

export const TweetHeaderBackWrapper = styled(HeaderBackWrapper)`
  svg {
    height: 1.5em;
    fill: rgb(29,161,242);
  }
`

export const TweetHeaderContent = styled(Box)`
  font-weight: 800;
  font-size: 19px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`

export const TweetBodyWrapper = styled(Box)`
  padding: 0 15px;
  border-bottom: 1px solid rgb(230, 236, 240);
`

export const TweetUserPic = styled(Box)`
  flex-basis: 49px;
  margin-right: 10px;
  img {
    object-fit: cover;
  }
`

export const TweetUserWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center
`

export const TweetUserName = styled(Box)`
  cursor: pointer;
  font-size: 15.5px;
  font-weight: 400;
  color: rgb(101, 119, 134);
  &:hover {
    text-decoration: underline;
  }
`

export const TweetUsername = styled(Box)`
  font-size: 15.5px;
  font-weight: 400;
  color: rgb(101, 119, 134);
`

export const TweetContent = styled(Box)`
  margin-top: 10px;
  font-size: 23px;
  margin-bottom: 10px;
  word-break: break-word;
`

export const TweetDate = styled(Box)`
  margin: 15px 0;
  font-size: 15px;
  color: rgb(101, 119, 134);
`

export const TweetStats = styled(Box)`
  display: flex;
  padding: 15px 5px;
  border-top: 1px solid rgb(230, 236, 240);
  border-bottom: 1px solid rgb(230, 236, 240);
`

export const IntNum = styled(Box)`
  font-weight: bold;
  margin-right: 5px;
`

export const IntText = styled(Box)`
  color: rgb(101, 119, 134);
  margin-right: 20px;
`

export const TweetInteractions = styled(Box)`
  display: flex;
  justify-content: space-evenly;
`

export const TweetIntIcon = styled(Box)`
  min-height: 49px;
  width: 100%;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TweetCardIcon = styled(CardIcon)`
  svg {
    height: 22.5px;
    width: 22.5px;
    fill: rgb(101, 119, 134);
  }
`

export const TweetRepliesWrapper = styled(Box)`
  padding: 10px 15px 0 15px;
  transition: 0.2s ease-in-out;
  display: flex;
  border-bottom: 1px solid rgb(230, 236, 240);
  cursor: pointer;
  &:hover {
      background-color: rgb(245, 248, 250);
  }
`

export const TweetImageWrapper = styled(Box)`
  overflow: hidden;
  max-height: 730px;

  div {
    border-radius: 14px;
    background-position: center center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-size: cover;
  }
`
