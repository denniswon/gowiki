import React, { useState, useRef, useEffect } from 'react'
import moment from 'moment'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import axios from 'axios'
import { useStore } from '../store/store'
import {
  ICON_REPLY,
  ICON_RETWEET,
  ICON_HEART,
  ICON_BOOKMARK,
  ICON_HEARTFULL,
  ICON_BOOKMARKFILL,
  ICON_DELETE,
  ICON_CLOSE,
  ICON_IMGUPLOAD,
} from '../Icons'
import { API_URL } from '../config'

import styled, { css } from 'styled-components'
import { Box, m, s } from 'styles'
import {
  CancelImage, CardContentInfo, InnerImageBox, InnerInputBox, InnerInputLinks, InputAttachWrapper,
  InputLinksSide, ModalBody, ModalCloseIcon, ModalCloseIconWrap, ModalContent, ModalEdit, ModalHeader, 
  ModalTitle, TweetBtnHolder, TweetBtnSide, TweetInput, TweetInputSide, TweetInputWrapper, TweetProfileWrapper,
  TweetUploadImage
} from '../styles/global'

// this.props.match.params.*
type PathParamsType = {
}

type Props = RouteComponentProps<PathParamsType> & {
  history: any
  replyTo: any
  retweet: any
  username: string
  name: string
  parent: any
  key: string
  id: string
  user: any
  createdAt: number
  description: string
  images: string[]
  replies: any[]
  retweets: any[]
  likes: any[]
}

const TweetCard = React.memo(function TweetCard(props: Props) {
 const { state, actions } = useStore()
  const { account, session } = state

  const [modalOpen, setModalOpen] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [replyImage, setReplyImg] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [parent, setParent] = useState(false)
  const [styleBody, setStyleBody] = useState(false)

  let info
  const likeTweet = (e, id) => {
    e.stopPropagation()
    if (!session) {
      actions.alert('Please Sign In')
      return
    }
    if (props.history.location.pathname.slice(1, 5) === 'prof') {
      info = { dest: 'profile', id }
    } else {
      info = { id }
    }
    actions.likeTweet(info)
  }

  const bookmarkTweet = (e, id) => {
    e.stopPropagation()
    if (!session) {
      actions.alert('Please Sign In')
      return
    }
    if (props.history.location.pathname.slice(1, 5) === 'prof') {
      info = { dest: 'profile', id }
    } else {
      info = { id }
    }
    actions.bookmarkTweet(info)
  }

  const retweet = (e, id, retweetId?) => {
    e.stopPropagation()
    if (!session) {
      actions.alert('Please Sign In')
      return
    }
    if (props.history.location.pathname.slice(1, 5) === 'prof') {
      info = { dest: 'profile', id, retweetId }
    } else {
      info = { id, retweetId }
    }
    actions.retweet(info)
  }

  const deleteTweet = (e, id) => {
    e.stopPropagation()
    actions.deleteTweet(id)
  }

  const goToTweet = (id) => {
    if (props.replyTo) {
      actions.getTweet(id)
    }
    props.history.push(`/tweet/${props.user.username}/${id}`)
  }
  const goToReply = (e, id) => {
    e.stopPropagation()
    if (props.replyTo) {
      actions.getTweet(id)
    }
    props.history.push(`/tweet/${props.user.username}/${id}`)
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
    if (!session) {
      actions.alert('Please Sign In')
      return
    }
    setStyleBody(!styleBody)
    if (type === 'parent') {
      setParent(true)
    } else {
      setParent(false)
    }
    setTimeout(() => {
      setModalOpen(!modalOpen)
    }, 20)
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

  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      document.getElementsByTagName('body')[0].style.cssText =
        styleBody && 'overflow-y: hidden; margin-right: 17px'
    }
  }, [styleBody])

  useEffect(
    () => () => (document.getElementsByTagName('body')[0].style.cssText = ''),
    [],
  )

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else if (document.getElementById('replyBox')) {
      document.getElementById('replyBox').focus()
    }
  }, [modalOpen])

  const replyTweet = (type) => {
    if (!session) {
      actions.alert('Please Sign In')
      return
    }
    toggleModal(type)

    const hashtags = replyText.match(/#(\w+)/g)
    if (!replyText.length) {
      return
    }
    const values = {
      description: replyText,
      images: [replyImage],
      parent:
        type === 'parent'
          ? props.parent?._id
          : type === 'retweet'
          ? props.retweet._id
          : props.id,
      hashtags,
    }
    actions.tweet(values)
    tweetT.current = ''
    setReplyText('')
    setReplyImg(null)
    actions.alert('Tweet sent!')
  }

  const goToUser = (e, username) => {
    e.stopPropagation()
    props.history.push(`/profile/${username}`)
  }

  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'few seconds ago',
      ss: '%ss',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: 'a day',
      dd: '%dd',
      M: 'a month',
      MM: '%dM',
      y: 'a year',
      yy: '%dY',
    },
  })

  return (
    <Box>
      {props.parent ? (
        <TweetCardWrapper
          onClick={() => goToTweet(props.parent?._id)}
          key={props.parent?._id}
          style={{ borderBottom: '0px' }}
        >
          <CardUserPicWrapper
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {props.parent.parent ? (
              <Box mt={17} />
            ) : null}
            <Link
              onClick={(e) => e.stopPropagation()}
              to={`/profile/${props.parent.user.username}`}
            >
              <img
                alt=""
                style={{ borderRadius: '50%', minWidth: '49px' }}
                width="100%"
                height="49px"
                src={props.parent.user.profileImg}
              />
            </Link>
            <TweetReplyThread />
          </CardUserPicWrapper>
          <CardContentWrapper>
            {props.parent.parent ? (
              <UserReplied
                onClick={(e) => goToReply(e, props.parent.parent._id)}
              >
                Replying to @{props.parent.parent.username}
              </UserReplied>
            ) : null}
            <CardContentHeader>
              <CardHeaderDetail>
                <CardHeaderUser>
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    to={`/profile/${props.parent.user.username}`}
                  >
                    {props.parent.user.name}
                  </Link>
                </CardHeaderUser>
                <CardHeaderUsername>
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    to={`/profile/${props.parent.user.username}`}
                  >
                    {`@${props.parent.user.username}`}
                  </Link>
                </CardHeaderUsername>
                <CardHeaderDot>·</CardHeaderDot>
                <CardHeaderDate>
                  {/* <Link to={`/profile/${props.parent.user.username}`}> */}
                  {moment(props.parent.createdAt).fromNow(true)}
                  {/* </Link> */}
                </CardHeaderDate>
              </CardHeaderDetail>
              <CardHeaderMore />
            </CardContentHeader>
            <CardContentInfo>{props.parent.description}</CardContentInfo>
            {props.parent.images[0] && (
              <CardContentImages>
                <CardImageLink>
                  <img alt="" src={props.parent.images[0]} />
                </CardImageLink>
              </CardContentImages>
            )}
            <CardButtonsWrapper>
              <CardButtonWrap
                onClick={(e) => toggleModal(e, 'parent')}
                className="reply-wrap"
              >
                <CardIcon className="reply-icon">
                  <ICON_REPLY styles={{ fill: 'rgb(101, 119, 134)' }} />
                </CardIcon>
                <CardIconValue>
                  {props.parent?.replies?.length > 0 &&
                    props.parent?.replies?.length}
                </CardIconValue>
              </CardButtonWrap>
              <CardButtonWrap
                onClick={(e) => retweet(e, props.parent?._id)}
                className="retweet-wrap"
              >
                <CardIcon className="retweet-icon">
                  <ICON_RETWEET
                    styles={
                      account && account.retweets?.includes(props.parent?._id)
                        ? { stroke: 'rgb(23, 191, 99)' }
                        : { fill: 'rgb(101, 119, 134)' }
                    }
                  />
                </CardIcon>
                <CardIconValue
                    color={account && account.retweets?.includes(props.parent?._id) ? 'rgb(23, 191, 99)' : undefined}
                    op={props.parent?.retweets?.length > 0 ? '1' : '0'}>
                  {props.parent?.retweets?.length}
                </CardIconValue>
              </CardButtonWrap>
              <CardButtonWrap
                onClick={(e) => likeTweet(e, props.parent?._id)}
                className="heart-wrap">
                <CardIcon className="heart-icon">
                  {account && account.likes?.includes(props.parent?._id) ? (
                    <ICON_HEARTFULL styles={{ fill: 'rgb(224, 36, 94)' }} />
                  ) : (
                    <ICON_HEART styles={{ fill: 'rgb(101, 119, 134)' }} />
                  )}
                </CardIcon>
                <CardIconValue
                    color={account && account.likes?.includes(props.parent?._id) ? 'rgb(224, 36, 94)' : undefined}
                    op={props.parent?.likes?.length > 0 ? '1' : '0'}>
                  {props.parent?.likes?.length}
                </CardIconValue>
              </CardButtonWrap>
              <CardButtonWrap
                onClick={(e) =>
                  account && account.username === props.parent?.user?.username
                    ? deleteTweet(e, props.parent?._id)
                    : bookmarkTweet(e, props.parent?._id)
                }
              >
                <CardIcon
                  className={
                    account &&
                    account &&
                    account &&
                    account.username === props.parent?.user?.username
                      ? 'delete-icon'
                      : 'share-icon'
                  }
                >
                  {account &&
                  account &&
                  account &&
                  account.username === props.parent?.user?.username ? (
                    <ICON_DELETE styles={{ fill: 'rgb(101, 119, 134)' }} />
                  ) : account &&
                    account.bookmarks?.includes(props.parent?._id) ? (
                    <ICON_BOOKMARKFILL styles={{ fill: 'rgb(10, 113, 176)' }} />
                  ) : (
                    <ICON_BOOKMARK styles={{ fill: 'rgb(101, 119, 134)' }} />
                  )}
                  {/* <ICON_SHARE /> */}
                </CardIcon>
              </CardButtonWrap>
            </CardButtonsWrapper>
          </CardContentWrapper>
        </TweetCardWrapper>
      ) : null}

      {/* ///////////////////////////parent up\\\\\\\\\\\\\\\\\\\\\\\\ */}

      {props.retweet && props.retweet._id ? (
        <TweetCardWrapper
          onClick={() => goToTweet(props.retweet._id)}
          key={props.retweet._id}
        >
          <CardUserPicWrapper>
            <UserRetweetIcon>
              <ICON_RETWEET />
            </UserRetweetIcon>
            <Link
              onClick={(e) => e.stopPropagation()}
              to={`/profile/${props.retweet.user.username}`}
            >
              <img
                alt=""
                style={{ borderRadius: '50%', minWidth: '49px' }}
                width="100%"
                height="49px"
                src={props.retweet.user.profileImg}
              />
            </Link>
          </CardUserPicWrapper>
          <CardContentWrapper>
            {props.user._id === account && account._id ? (
              <UserRetweeted
                onClick={(e) => goToUser(e, account.username)}
              >
                {' '}
                You Retweeted{' '}
              </UserRetweeted>
            ) : (
              <UserRetweeted
                onClick={(e) => goToUser(e, props.user.username)}
              >
                {' '}
                {props.user.username} Retweeted{' '}
              </UserRetweeted>
            )}
            <CardContentHeader>
              <CardHeaderDetail>
                <CardHeaderUser>
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    to={`/profile/${props.retweet.user.username}`}
                  >
                    {props.retweet.user.name}
                  </Link>
                </CardHeaderUser>
                <CardHeaderUsername>
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    to={`/profile/${props.retweet.user.username}`}
                  >
                    {`@${props.retweet.user.username}`}
                  </Link>
                </CardHeaderUsername>
                <CardHeaderDot>·</CardHeaderDot>
                <CardHeaderDate>
                  {moment(props.retweet.createdAt).fromNow(true)}
                </CardHeaderDate>
              </CardHeaderDetail>
              <CardHeaderMore />
            </CardContentHeader>
            {props.retweet.replyTo ? (
              <ReplyToWrapper>
                <ReplyTweetUsername>Replying to</ReplyTweetUsername>
                <MainTweetUser>
                  @{props.retweet.replyTo}
                </MainTweetUser>
              </ReplyToWrapper>
            ) : null}
            <CardContentInfo>{props.retweet.description}</CardContentInfo>
            {props.retweet.images[0] && (
              <CardContentImages>
                <CardImageLink>
                  <img alt="" src={props.retweet.images[0]} />
                </CardImageLink>
              </CardContentImages>
            )}
            <CardButtonsWrapper>
              <CardButtonWrap
                onClick={(e) => toggleModal(e)}
                className="reply-wrap"
              >
                <CardIcon className="reply-icon">
                  <ICON_REPLY styles={{ fill: 'rgb(101, 119, 134)' }} />
                </CardIcon>
                <CardIconValue>
                  {props.retweet.replies.length > 0 &&
                    props.retweet.replies.length}
                </CardIconValue>
              </CardButtonWrap>
              <CardButtonWrap
                onClick={(e) => retweet(e, props.retweet._id, props.id)}
                className="retweet-wrap"
              >
                <CardIcon className="retweet-icon">
                  <ICON_RETWEET
                    styles={
                      account && account.retweets?.includes(props.retweet._id)
                        ? { stroke: 'rgb(23, 191, 99)' }
                        : { fill: 'rgb(101, 119, 134)' }
                    }
                  />
                </CardIcon>
                <CardIconValue
                    color={account && account.retweet?.includes(props.parent?._id) ? 'rgb(23, 191, 99)' : undefined}
                    op={props.parent?.retweets?.length > 0 ? '1' : '0'}>
                  {props.retweet?.retweets?.length}
                </CardIconValue>
              </CardButtonWrap>
              <CardButtonWrap
                onClick={(e) => likeTweet(e, props.retweet._id)}
                className="heart-wrap"
              >
                <CardIcon className="heart-icon">
                  {account && account.likes?.includes(props.retweet._id) ? (
                    <ICON_HEARTFULL styles={{ fill: 'rgb(224, 36, 94)' }} />
                  ) : (
                    <ICON_HEART styles={{ fill: 'rgb(101, 119, 134)' }} />
                  )}
                </CardIcon>
                <CardIconValue
                    color={account && account.retweet?.includes(props.parent?._id) ? 'rgb(224, 36, 94)' : undefined}
                    op={props.parent?.retweets?.likes?.length > 0 ? '1' : '0'}>
                  {props.retweet?.likes?.length}
                </CardIconValue>
              </CardButtonWrap>
              <CardButtonWrap
                onClick={(e) =>
                  account && account.username === props.retweet.user.username
                    ? deleteTweet(e, props.retweet._id)
                    : bookmarkTweet(e, props.retweet._id)
                }
              >
                <CardIcon
                  className={
                    account &&
                    account &&
                    account &&
                    account.username === props.retweet.user.username
                      ? 'delete-icon'
                      : 'share-icon'
                  }
                >
                  {account &&
                  account &&
                  account &&
                  account.username === props.retweet.user.username ? (
                    <ICON_DELETE styles={{ fill: 'rgb(101, 119, 134)' }} />
                  ) : account &&
                    account.bookmarks?.includes(props.retweet._id) ? (
                    <ICON_BOOKMARKFILL styles={{ fill: 'rgb(10, 113, 176)' }} />
                  ) : (
                    <ICON_BOOKMARK styles={{ fill: 'rgb(101, 119, 134)' }} />
                  )}
                </CardIcon>
              </CardButtonWrap>
            </CardButtonsWrapper>
          </CardContentWrapper>
        </TweetCardWrapper>
      ) : props.user ? (
        <TweetCardWrapper
          onClick={() => goToTweet(props.id)}
          key={props.id}
        >
          <CardUserPicWrapper>
            {/* <div className="UserRetweetIcon">
          <ICON_RETWEET />
        </div> */}
            <Link
              onClick={(e) => e.stopPropagation()}
              to={`/profile/${props.user.username}`}
            >
              <img
                alt=""
                style={{ borderRadius: '50%', minWidth: '49px' }}
                width="100%"
                height="49px"
                src={props.user.profileImg}
              />
            </Link>
          </CardUserPicWrapper>
          <CardContentWrapper>
            {/* {props.username === account.username && props.retweets?.includes(account._id) ? 
        <div className="user-retweeted"> You Retweeted </div> :
        props.username !== account.username &&  */}
            <CardContentHeader>
              <CardHeaderDetail>
                <CardHeaderUser>
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    to={`/profile/${props.user.username}`}
                  >
                    {props.user.name}
                  </Link>
                </CardHeaderUser>
                <CardHeaderUsername>
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    to={`/profile/${props.user.username}`}
                  >
                    {`@${props.user.username}`}
                  </Link>
                </CardHeaderUsername>
                <CardHeaderDot>·</CardHeaderDot>
                <CardHeaderDate>
                  {moment(props.createdAt).fromNow(true)}
                </CardHeaderDate>
              </CardHeaderDetail>
              <CardHeaderMore />
            </CardContentHeader>
            {props.replyTo ? (
              <ReplyToWrapper>
                <ReplyTweetUsername>Replying to</ReplyTweetUsername>
                <MainTweetUser>@{props.replyTo}</MainTweetUser>
              </ReplyToWrapper>
            ) : null}
            <CardContentInfo>{props.description}</CardContentInfo>
            {props.images[0] && (
              <CardContentImages>
                <CardImageLink>
                  <img alt="" src={props.images[0]} />
                </CardImageLink>
              </CardContentImages>
            )}
            <CardButtonsWrapper>
              <CardButtonWrap
                onClick={(e) => toggleModal(e)}
                className="reply-wrap"
              >
                <CardIcon className="reply-icon">
                  <ICON_REPLY styles={{ fill: 'rgb(101, 119, 134)' }} />
                </CardIcon>
                <CardIconValue>
                  {props.replies.length > 0 && props.replies.length}
                </CardIconValue>
              </CardButtonWrap>
              <CardButtonWrap
                onClick={(e) => retweet(e, props.id)}
                className="retweet-wrap"
              >
                <CardIcon className="retweet-icon">
                  <ICON_RETWEET
                    styles={
                      account && account.retweets?.includes(props.id)
                        ? { stroke: 'rgb(23, 191, 99)' }
                        : { fill: 'rgb(101, 119, 134)' }
                    }
                  />
                </CardIcon>
                <CardIconValue
                    color={account && account.retweet?.includes(props.parent?._id) ? 'rgb(23, 191, 99)' : undefined}
                    op={props.parent?.retweets?.length > 0 ? '1' : '0'}>
                  {props.retweets.length}
                </CardIconValue>
              </CardButtonWrap>
              <CardButtonWrap
                onClick={(e) => likeTweet(e, props.id)}
                className="heart-wrap"
              >
                <CardIcon className="heart-icon">
                  {account && account.likes?.includes(props.id) ? (
                    <ICON_HEARTFULL styles={{ fill: 'rgb(224, 36, 94)' }} />
                  ) : (
                    <ICON_HEART styles={{ fill: 'rgb(101, 119, 134)' }} />
                  )}
                </CardIcon>
                <CardIconValue
                    color={account && account.likes?.includes(props.parent?._id) ? 'rgb(224, 36, 94)' : undefined}
                    op={props.parent?.likes?.length > 0 ? '1' : '0'}>
                  {props.likes?.length}
                </CardIconValue>
              </CardButtonWrap>
              <CardButtonWrap
                onClick={(e) =>
                  account && account.username === props.user.username
                    ? deleteTweet(e, props.id)
                    : bookmarkTweet(e, props.id)
                }
              >
                <CardIcon
                  className={
                    account &&
                    account &&
                    account &&
                    account.username === props.user.username
                      ? 'delete-icon'
                      : 'share-icon'
                  }
                >
                  {account &&
                  account &&
                  account &&
                  account.username === props.user.username ? (
                    <ICON_DELETE styles={{ fill: 'rgb(101, 119, 134)' }} />
                  ) : account && account.bookmarks?.includes(props.id) ? (
                    <ICON_BOOKMARKFILL styles={{ fill: 'rgb(10, 113, 176)' }} />
                  ) : (
                    <ICON_BOOKMARK styles={{ fill: 'rgb(101, 119, 134)' }} />
                  )}
                </CardIcon>
              </CardButtonWrap>
            </CardButtonsWrapper>
          </CardContentWrapper>
        </TweetCardWrapper>
      ) : null}

      {/* tweet modal */}
      {props.parent || props.user ? (
        <ModalEdit
          onClick={() => toggleModal()}
          style={{ display: modalOpen ? 'block' : 'none' }}
        >
          {modalOpen ? (
            <ModalContent
              style={{ minHeight: '350px', height: 'initial' }}
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
                      to={`/profile/${
                        parent
                          ? props.parent.user.username
                          : props.user.username
                      }`}
                    >
                      <img
                        alt=""
                        style={{ borderRadius: '50%', minWidth: '49px' }}
                        width="100%"
                        height="49px"
                        src={
                          parent
                            ? props.parent.user.profileImg
                            : props.user.profileImg
                        }
                      />
                    </Link>
                  </CardUserPicWrapper>
                  <CardContentWrapper>
                    <CardContentHeader>
                      <CardHeaderDetail>
                        <CardHeaderUser>
                          <Link
                            onClick={(e) => e.stopPropagation()}
                            to={`/profile/${
                              parent
                                ? props.parent.user.username
                                : props.user.username
                            }`}
                          >
                            {parent ? props.parent.user.name : props.user.name}
                          </Link>
                        </CardHeaderUser>
                        <CardHeaderUsername>
                          <Link
                            onClick={(e) => e.stopPropagation()}
                            to={`/profile/${
                              parent
                                ? props.parent.user.username
                                : props.user.username
                            }`}
                          >
                            {parent
                              ? `@${props.parent.user.username}`
                              : `@${props.user.username}`}
                          </Link>
                        </CardHeaderUsername>
                        <CardHeaderDot>·</CardHeaderDot>
                        <CardHeaderDate>
                          {moment(
                            parent ? props.parent.createdAt : props.createdAt,
                          ).fromNow()}
                        </CardHeaderDate>
                      </CardHeaderDetail>
                    </CardContentHeader>
                    <CardContentInfo>
                      {parent
                        ? props.parent.description
                        : props.retweet
                        ? props.retweet.description
                        : props.description}
                    </CardContentInfo>
                    <ReplyToUser>
                      <ReplyTweetUsername>Replying to</ReplyTweetUsername>
                      <MainTweetUser>
                        @
                        {parent
                          ? props.parent.user.username
                          : props.user.username}
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
    </Box>
  )
})

export default withRouter(TweetCard)


const TweetCardWrapper = styled(Box)`
  border-bottom: 1px solid rgb(230, 236, 240);
  display: flex;
  transition: 0.2s ease-in-out;
  will-change: background-color;
  cursor: pointer;
  padding: 10px 15px;
  &:hover{
    background-color: rgb(245,248,250);
  }
`

const CardUserPicWrapper = styled(Box)`
  flex-basis: 49px;
  margin-right: 10px;  
  display: flex;
  flex-direction: column;
  img{
    object-fit: cover;
  }
`

const CardContentWrapper = styled(Box)`
  max-width: calc(100% - 60px);
  flex-basis: calc(100% - 49px);
`

const CardContentHeader = styled(Box)`
  margin-bottom: 2px;
  display: flex;
  justify-content: space-between;
`

const CardHeaderDetail = styled(Box)`
`

const CardHeaderUser = styled.span`
  font-weight: bold;
  &:hover{
    text-decoration: underline;
  }
`

const CardHeaderUsername = styled.span`
  margin-left: 5px;
`

const CardHeaderDot = styled.span`
  padding: 0 5px;
  color: rgb(101, 119, 134)
`

const CardHeaderDate = styled.span`
  color: rgb(101, 119, 134)
  &:hover{
    text-decoration: underline;
  }
`

const CardHeaderMore = styled(Box)`
`

const CardContentImages = styled(Box)`
  margin-top: 10px;
  border: 1px solid rgb(204, 214, 221);
  border-radius: 14px;
  // display: flex;
  // flex-direction: column;
`

const CardImageLink = styled(Box)`
  cursor: pointer;
  display: block;
  max-height: 253px;
  border-radius: 14px;

  img{
    max-height:253px;
    border-radius: 14px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const CardButtonsWrapper = styled(Box)`
  margin-left: -5px;
  margin-top: 5px;
  max-width: 425px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -5px;
`

const CardButtonWrap = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: rgb(134, 120, 101);
  &:hover{
    .reply-icon{
      const CardButtonWrap{color: rgb(212, 11, 11) !important}
      background-color: rgba(29, 161, 242,0.1);
      svg{ fill: rgb(29, 161, 242) !important; }
    }
    .retweet-icon{
      background-color: rgba(23, 191, 99,0.1);
      svg{ fill: rgb(23, 191, 99) !important; }
    }
    .heart-icon{
      
      background-color: rgba(224, 36, 94,0.1);
      svg{ fill: rgb(224, 36, 94) !important; }
    }
    .share-icon{
      background-color: rgba(29, 161, 242,0.1);
      svg{ fill: rgb(29, 161, 242) !important; }
    }
    .delete-icon{
      background-color: rgba(212, 11, 11, 0.1);
      svg{ fill: rgb(212, 11, 11) !important; }
    }
    .reply-wrap:hover{
      color: rgb(29, 161, 242);
    }
    .retweet-wrap:hover{
      color: rgb(23, 191, 99);
    }
    .heart-wrap:hover{
      color: rgb(224, 36, 94);
    }
  }
`

const CardIcon = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7.4px;
  border-radius: 50%;
  transition: 0.2s ease-in-out;
  will-change: background-color;
  svg{
    width: 18.75px;
    height: 18.75px;
  }
`

const CardIconValue = styled(Box)`
  margin-left: 3px;
  font-size: 13px;
`

/////////reply modal
const ReplyContentWrapper = styled(Box)`
  display: flex;
  padding: 10px 15px;
`

const ReplyTweetUsername = styled.span`
  font-size: 15.5px;
  margin-right: 5px;
  color: rgb(101, 119, 134);
`

const MainTweetUser = styled.span`
  color: rgb(27, 149, 224);
  &:hover{ text-decoration: underline;}
`

const ReplyToUser = styled(Box)`
  margin-top: 15px;
`

// const ReplyThread = styled(Box)`
//   border-right: 2px solid #ccd6dd;
//   text-align: center;
//   height: 100%;
//   width: 100%;
// `

const ReplyToWrapper = styled(Box)`
  margin-bottom: 2px;
`

const UserRetweetIcon = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
  svg{
    width: 13px;
    height: 18.75px;
    fill: rgb(101, 119, 134);   
  }
`

const UserRetweeted = styled(Box)`
  color: rgb(101, 119, 134);
  font-size: 13px;
  margin-bottom: 5px;
  &:hover{
    text-decoration: underline;
  }
`

const TweetReplyThread = styled(Box)`
  margin-top: 2px;
  width: 2px;
  background-color: rgb(204, 214, 221);
  margin: 0 auto;
  height: 100%;
  margin-top: -5px;
`

const UserReplied = styled(Box)`
  color: rgb(101, 119, 134);
  font-size: 13px;
  margin-bottom: 5px;
  &:hover{
    text-decoration: underline;
  }
`
