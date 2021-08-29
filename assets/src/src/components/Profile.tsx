import React, { useEffect, useState, useRef } from 'react'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import {
  ICON_ARROWBACK,
  ICON_MARKDOWN,
  ICON_DATE,
  ICON_CLOSE,
  ICON_UPLOAD,
  ICON_NEWMSG,
} from '../Icons'
import { useStore } from '../store/store'
import Loader from './Loader'
import TweetCard from './TweetCard'
import { API_URL } from '../config'

import styled, { css } from 'styled-components'
import { Box } from 'styles'
import {
  Span, ModalCloseIcon, SaveModalWrapper, ModalBody, ModalScroll, ModalBanner, ModalProfilePic, ModalBackPic,
  EditInputWrap, EditInputContent, EditForm, EditInput, HeaderBackWrapper, ModalCloseIconWrap, ModalContent,
  ModalHeader, ModalEdit, ModalTitle, SaveModalBtn
} from '../styles/global'
import {
  ExploreNavMenu, SearchUserDetails, SearchUserInfo, SearchUserName, SearchUserUsername, SearchUserBio,
  unfollowSwitch, ExploreNavItem, FollowBtnWrap, SearchResultWapper, SearchUserWrap
} from './Explore'
import { ProfileHeaderBack } from './Lists'

const Profile = (props) => {
 const { state, actions } = useStore()
  const [activeTab, setActiveTab] = useState('Tweets')
  const [editName, setName] = useState('')
  const [editBio, setBio] = useState('')
  const [editLocation, setLocation] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [banner, setBanner] = useState('')
  const [avatar, setAvatar] = useState('')
  const [saved, setSaved] = useState(false)
  const [memOpen, setMemOpen] = useState(false)
  const [tab, setTab] = useState('Followers')
  const [loadingAvatar, setLoadingAvatar] = useState(false)
  const [loadingBanner, setLoadingBanner] = useState(false)
  const [styleBody, setStyleBody] = useState(false)
  const { account, user, session } = state
  const userParam = props.match.params.username

  useEffect(() => {
    window.scrollTo(0, 0)
    actions.getUser(props.match.params.username)
    // preventing edit modal from apprearing after clicking a user on memOpen
    setMemOpen(false)
    setModalOpen(false)
  }, [props.match.params.username])

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

  const changeTab = (tab) => {
    setActiveTab(tab)
  }

  const editProfile = () => {
    const values = {
      name: editName,
      description: editBio,
      location: editLocation,
      profileImg: avatar,
      banner,
    }
    actions.updateUser(values)
    setSaved(true)
    toggleModal()
  }

  const toggleModal = (param?, type?) => {
    setStyleBody(!styleBody)
    if (param === 'edit') {
      setSaved(false)
    }
    if (type) {
      setTab(type)
    }
    if (param === 'members') {
      setMemOpen(true)
      actions.getFollowers(props.match.params.username)
    }
    if (memOpen) {
      setMemOpen(false)
    }
    setTimeout(() => {
      setModalOpen(!modalOpen)
    }, 20)
  }

  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  const followUser = (e, id) => {
    if (!session) {
      actions.alert('Please Sign In')
      return
    }
    e.stopPropagation()
    actions.followUser(id)
  }

  const uploadImage = (file, type) => {
    const bodyFormData = new FormData()
    bodyFormData.append('image', file)
    axios
      .post(`${API_URL}/tweet/upload`, bodyFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Twittertoken')}`,
        },
      })
      .then((res) => {
        type === 'banner'
          ? setBanner(res.data.imageUrl)
          : setAvatar(res.data.imageUrl)
        type === 'banner' ? setLoadingBanner(false) : setLoadingAvatar(false)
      })
      .catch((err) => actions.alert('error uploading image'))
  }

  const changeBanner = () => {
    setLoadingBanner(true)
    const file = (document.getElementById('banner') as HTMLInputElement).files[0]
    uploadImage(file, 'banner')
  }
  const changeAvatar = () => {
    setLoadingAvatar(true)
    const file = (document.getElementById('avatar') as HTMLInputElement).files[0]
    uploadImage(file, 'avatar')
  }

  const goToUser = (id) => {
    setModalOpen(false)
    props.history.push(`/profile/${id}`)
  }

  const startChat = () => {
    if (!session) {
      actions.alert('Please Sign In')
      return
    }
    actions.startChat({ id: user._id, func: goToMsg })
  }

  const goToMsg = () => {
    props.history.push(`/messages`)
  }

  return (
    <Box>
      {user ? (
        <Box>
          <ProfileWrapper>
            <ProfileHeaderWrapper>
              <ProfileHeaderBack>
                <HeaderBackWrapper onClick={() => window.history.back()}>
                  <ICON_ARROWBACK />
                </HeaderBackWrapper>
              </ProfileHeaderBack>
              <ProfileHeaderContent>
                <ProfileHeaderName>
                  {account && account.username === userParam
                    ? account.username
                    : user.username}
                </ProfileHeaderName>
                <ProfileHeaderTweets>
                  {account && account.username === userParam
                    ? account.tweets?.length
                    : user.tweets?.length} Tweets
                </ProfileHeaderTweets>
              </ProfileHeaderContent>
            </ProfileHeaderWrapper>
            <ProfileBannerWrapper>
              <img
                src={banner.length > 0 && saved ? banner : user.banner}
                alt=""
              />
            </ProfileBannerWrapper>
            <ProfileDetailsWrapper>
              <ProfileOptions>
                <ProfileImageWrapper>
                  <img
                    src={avatar.length > 0 && saved ? avatar : user.profileImg}
                    alt=""
                  />
                </ProfileImageWrapper>
                {account && account.username === userParam ? null : (
                  <Span onClick={() => startChat()} className="NewMsg">
                    <ICON_NEWMSG />
                  </Span>
                )}
                <ProfileEditButton unfollowSwitch={account && account.following.includes(user._id)}
                  onClick={(e) =>
                    account && account.username === userParam
                      ? toggleModal('edit')
                      : followUser(e, user._id)
                  }>
                  {account && account.username === userParam ? (
                    <Span>Edit profile</Span>
                  ) : (
                    <Span>
                      <Span>
                        {account && account.following.includes(user._id)
                          ? 'Following'
                          : 'Follow'}
                      </Span>
                    </Span>
                  )}
                </ProfileEditButton>
              </ProfileOptions>
              <ProfileDetailsBox>
                <ProfileName>{user.name}</ProfileName>
                <ProfileUsername>
                  @
                  {account && account.username === userParam
                    ? account.username
                    : user.username}
                </ProfileUsername>
                <ProfileBio>{user.description}</ProfileBio>
                <ProfileInfoBox>
                  {user.location.length > 0 && <ICON_MARKDOWN />}
                  <ProfileLocation show={user.location.length > 0}>
                    {' '}
                    {user.location}{' '}
                  </ProfileLocation>
                  <ICON_DATE />
                  <ProfileDate>
                    {' '}
                    Joined {moment(user.createdAt).format('MMMM YYYY')}{' '}
                  </ProfileDate>
                </ProfileInfoBox>
              </ProfileDetailsBox>
              <ProfileSocialBox>
                <Box onClick={() => toggleModal('members', 'Following')}>
                  <FollowNum> {user.following.length} </FollowNum>
                  <FollowText> Following </FollowText>
                </Box>
                <Box onClick={() => toggleModal('members', 'Followers')}>
                  <FollowNum> {user.followers.length} </FollowNum>
                  <FollowText> Followers </FollowText>
                </Box>
              </ProfileSocialBox>
            </ProfileDetailsWrapper>
            <ProfileNavMenu>
              <ProfileNavItem active={activeTab === 'Tweets'}
                key="tweets"
                onClick={() => changeTab('Tweets')}
              >
                Tweets
              </ProfileNavItem>
              <ProfileNavItem active={activeTab === 'Tweets&Replies'}
                key="replies"
                onClick={() => changeTab('Tweets&Replies')}
              >
                Tweets & replies
              </ProfileNavItem>
              <ProfileNavItem active={activeTab === 'Media'}
                key="media"
                onClick={() => changeTab('Media')}
              >
                Media
              </ProfileNavItem>
              <ProfileNavItem active={activeTab === 'Likes'}
                key="likes"
                onClick={() => changeTab('Likes')}
              >
                Likes
              </ProfileNavItem>
            </ProfileNavMenu>
            {activeTab === 'Tweets'
              ? user.tweets.map((t) => {
                  if (!t.parent)
                    return (
                      <TweetCard
                        retweet={t.retweet}
                        username={t.username}
                        name={t.name}
                        parent={t.parent}
                        id={t._id}
                        key={`tweets.${t._id}`}
                        user={t.user}
                        createdAt={t.createdAt}
                        description={t.description}
                        images={t.images}
                        replies={t.replies}
                        retweets={t.retweets}
                        likes={t.likes}
                      />
                    )
                })
              : activeTab === 'Tweets&Replies'
              ? user.tweets.map((t) => {
                  if (t.parent)
                    return (
                      <TweetCard
                        retweet={t.retweet}
                        username={t.username}
                        name={t.name}
                        parent={t.parent}
                        key={`replies.${t._id}`}
                        id={t._id}
                        user={t.user}
                        createdAt={t.createdAt}
                        description={t.description}
                        images={t.images}
                        replies={t.replies}
                        retweets={t.retweets}
                        likes={t.likes}
                      />
                    )
                })
              : activeTab === 'Likes'
              ? user.likes.map((t) => (
                  <TweetCard
                    retweet={t.retweet}
                    username={t.username}
                    name={t.name}
                    parent={t.parent}
                    key={`likes.${t._id}`}
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
              : activeTab === 'Media'
              ? user.tweets.map((t) => {
                  if (t.images[0])
                    return (
                      <TweetCard
                        retweet={t.retweet}
                        username={t.username}
                        name={t.name}
                        parent={t.parent}
                        key={`tweets.${t._id}`}
                        id={t._id}
                        user={t.user}
                        createdAt={t.createdAt}
                        description={t.description}
                        images={t.images}
                        replies={t.replies}
                        retweets={t.retweets}
                        likes={t.likes}
                      />
                    )
                })
              : null}
          </ProfileWrapper>
          <ModalEdit
            onClick={() => toggleModal()}
            style={{ display: modalOpen ? 'block' : 'none' }}
          >
            <ModalContent onClick={(e) => handleModalClick(e)}>
              <ModalHeader noBorder={memOpen}>
                <ModalCloseIcon>
                  <ModalCloseIconWrap
                    onClick={() => toggleModal()}
                  >
                    <ICON_CLOSE />
                  </ModalCloseIconWrap>
                </ModalCloseIcon>
                <ModalTitle>{memOpen ? null : 'Edit Profile'}</ModalTitle>
                {memOpen ? null : (
                  <SaveModalWrapper>
                    <SaveModalBtn onClick={editProfile}>
                      Save
                    </SaveModalBtn>
                  </SaveModalWrapper>
                )}
              </ModalHeader>
              {memOpen ? (
                <ModalBody>
                  <ExploreNavMenu>
                    <ExploreNavItem active={tab == 'Followers'}
                      onClick={() => setTab('Followers')}
                    >
                      Followers
                    </ExploreNavItem>
                    <ExploreNavItem active={tab == 'Following'}
                      onClick={() => setTab('Following')}
                    >
                      Following
                    </ExploreNavItem>
                  </ExploreNavMenu>
                  <ModalScroll>
                    {tab === 'Followers'
                      ? state.followers.map((f) => (
                          <SearchResultWapper
                            onClick={() => goToUser(f.username)}
                            key={f._id}
                          >
                            <Link
                              to={`/profile/${f.username}`}
                              className="SearchUserPicWrapper"
                            >
                              <img
                                style={{
                                  borderRadius: '50%',
                                  minWidth: '49px',
                                }}
                                width="100%"
                                height="49px"
                                src={f.profileImg}
                              />
                            </Link>
                            <SearchUserDetails>
                              <SearchUserWrap>
                                <SearchUserInfo>
                                  <SearchUserName>
                                    {f.name}
                                  </SearchUserName>
                                  <SearchUserUsername>
                                    @{f.username}
                                  </SearchUserUsername>
                                </SearchUserInfo>
                                {f._id === account && account._id ? null : (
                                  <FollowBtnWrap unfollowSwitch={account && account.following.includes(f._id)}
                                    onClick={(e) => followUser(e, f._id)}
                                  >
                                    <Span>
                                      <Span>
                                        {account &&
                                        account.following.includes(f._id)
                                          ? 'Following'
                                          : 'Follow'}
                                      </Span>
                                    </Span>
                                  </FollowBtnWrap>
                                )}
                              </SearchUserWrap>
                              <SearchUserBio>
                                {f.description.substring(0, 160)}
                              </SearchUserBio>
                            </SearchUserDetails>
                          </SearchResultWapper>
                        ))
                      : state.following.map((f) => (
                          <SearchResultWapper
                            onClick={() => goToUser(f.username)}
                            key={f._id}
                          >
                            <Link
                              to={`/profile/${f.username}`}
                              className="SearchUserPicWrapper"
                            >
                              <img
                                style={{
                                  borderRadius: '50%',
                                  minWidth: '49px',
                                }}
                                width="100%"
                                height="49px"
                                src={f.profileImg}
                              />
                            </Link>
                            <SearchUserDetails>
                              <SearchUserWrap>
                                <SearchUserInfo>
                                  <SearchUserName>
                                    {f.name}
                                  </SearchUserName>
                                  <SearchUserUsername>
                                    @{f.username}
                                  </SearchUserUsername>
                                </SearchUserInfo>
                                {f._id === account && account._id ? null : (
                                  <FollowBtnWrap unfollowSwitch={account && account.following.includes(f._id)}
                                    onClick={(e) => followUser(e, f._id)}
                                  >
                                    <Span>
                                      <Span>
                                        {account &&
                                        account.following.includes(f._id)
                                          ? 'Following'
                                          : 'Follow'}
                                      </Span>
                                    </Span>
                                  </FollowBtnWrap>
                                )}
                              </SearchUserWrap>
                              <SearchUserBio>
                                {f.description.substring(0, 160)}
                              </SearchUserBio>
                            </SearchUserDetails>
                          </SearchResultWapper>
                        ))}
                  </ModalScroll>
                </ModalBody>
              ) : (
                <ModalBody>
                  <ModalBanner>
                    <img
                      src={
                        loadingBanner
                          ? 'https://i.imgur.com/62jOROc.gif'
                          : banner.length > 0
                          ? banner
                          : user.banner
                      }
                      alt="modal-banner"
                    />
                    <Box>
                      <ICON_UPLOAD />
                      <input
                        onChange={() => changeBanner()}
                        title=" "
                        id="banner"
                        style={{ opacity: '0' }}
                        type="file"
                      />
                    </Box>
                  </ModalBanner>
                  <ModalProfilePic>
                    <ModalBackPic>
                      <img
                        src={
                          loadingAvatar
                            ? 'https://i.imgur.com/62jOROc.gif'
                            : avatar.length > 0
                            ? avatar
                            : user.profileImg
                        }
                        alt="profile"
                      />
                      <Box>
                        <ICON_UPLOAD />
                        <input
                          onChange={() => changeAvatar()}
                          title=" "
                          id="avatar"
                          style={{ opacity: '0' }}
                          type="file"
                        />
                      </Box>
                    </ModalBackPic>
                  </ModalProfilePic>
                  <EditForm>
                    <EditInputWrap>
                      <EditInputContent>
                        <label>Name</label>
                        <EditInput
                          defaultValue={user.name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          name="name"
                        />
                      </EditInputContent>
                    </EditInputWrap>
                    <EditInputWrap>
                      <EditInputContent>
                        <label>Bio</label>
                        <EditInput
                          defaultValue={user.description}
                          onChange={(e) => setBio(e.target.value)}
                          type="text"
                          name="bio"
                        />
                      </EditInputContent>
                    </EditInputWrap>
                    <EditInputWrap>
                      <EditInputContent>
                        <label>Location</label>
                        <EditInput
                          defaultValue={user.location}
                          onChange={(e) => setLocation(e.target.value)}
                          type="text"
                          name="location"
                        />
                      </EditInputContent>
                    </EditInputWrap>
                  </EditForm>
                </ModalBody>
              )}
            </ModalContent>
          </ModalEdit>
        </Box>
      ) : (
        <ProfileWrapper>
          <Loader />{' '}
        </ProfileWrapper>
      )}
    </Box>
  )
}

export default withRouter(Profile)

export const ProfileWrapper = styled(Box)`
  max-width: 600px;
  border-right: 1px solid rgb(230, 236, 240);
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 2000px;
`

export const ProfileHeaderWrapper = styled(Box)`
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

export const ProfileHeaderContent = styled(Box)`
  display: flex;
  flex-direction: column;
`

export const ProfileHeaderName = styled(Box)`
  font-weight: 800;
  font-size: 19px;
`

export const ProfileHeaderTweets = styled(Box)`
  font-size: 14px;
  line-height: calc(19.6875px);
  color: rgb(101, 119, 134);
`

export const ProfileBannerWrapper = styled(Box)`
  max-width: 600px;
  height: 200px;
  position: relative;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const ProfileDetailsWrapper = styled(Box)`
  padding: 10px 15px 15px 15px;
`

export const ProfileOptions = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`

export const ProfileImageWrapper = styled(Box)`
  position: absolute;
  left: 0px;
  bottom: -30px;
  width: 134px;
  min-width: 49px;
  border: 4px solid #fff;
  border-radius: 50%;
  height: 134px;
  z-index: 5;
  img{
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const ProfileEditButton = styled(Box)<{ unfollowSwitch?: boolean }>`
  min-height: 39px;
  min-width: 98.8px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  border: 1px solid rgb(29, 161, 242);
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
  padding-left: 1em;
  padding-right: 1em;
  span{
    text-align: center;
    font-weight: 800;
    color: rgb(29, 161, 242);
    width: 100%
  }
  &:hover{
    background-color: rgba(29, 161, 242,0.1);
  }
  ${p => p.unfollowSwitch && unfollowSwitch}
`

export const ProfileDetailsBox = styled(Box)`
  margin-top: 40px;
`

export const ProfileName = styled(Box)`
  font-weight: 800;
  font-size: 19px;
`

export const ProfileUsername = styled(Box)`
  font-size: 15px;
  color: rgb(101, 119, 134);
`

export const ProfileBio = styled(Box)`
  margin-bottom: 10px;
  margin-top: 10px;
`

export const ProfileInfoBox = styled(Box)`
  display: flex;
  margin-top: 10px;
  svg{
    margin-right: 5px;
    fill: rgb(101, 119, 134);
    height: 18.75px;
  }
`

const showProfileText = css`
  color: rgb(101, 119, 134);
  margin-right: 10px;
`

export const ProfileLocation = styled(Box)<{ show?: boolean }>`
  ${p => p.show ? showProfileText : null}
`

export const ProfileDate = styled(Box)`
  ${showProfileText}
`

export const ProfileSocialBox = styled(Box)`
  display: flex;
  margin-top: 7px;
  div{
    display: flex;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
`

export const FollowNum = styled.p`
  font-weight: bold;
  margin-right: 3px;
  cursor: pointer;
`

export const FollowText = styled.p`
  color: rgb(101, 119, 134);
  margin-right: 20px;
  cursor: pointer;
`

export const ProfileNavMenu = styled(Box)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid rgb(230, 236, 240);
`

export const ProfileNavItem = styled(Box)<{ active?: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  padding: 15px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  color: rgb(101, 119, 134);
  transition: 0.2s;
  will-change: background-color;
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

export const NewMsg = styled(Box)`
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: 0.2s ease-in-out;
  &:hover{
    background-color: rgba(29, 161, 242, 0.1);
    svg{fill: rgb(29, 161, 242)}
  }
  cursor: pointer;
  svg{
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    fill: #000;
    transition: 0.2s ease-in-out;
  }
`
