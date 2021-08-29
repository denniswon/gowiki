import React, { useEffect, useState, useRef } from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import { useStore } from '../store/store'
import Loader from './Loader'
import TweetCard from './TweetCard'
import { API_URL } from '../config'
import {
  ICON_ARROWBACK,
  ICON_UPLOAD,
  ICON_CLOSE,
  ICON_SEARCH,
} from '../Icons'
import styled, { css } from 'styled-components'
import { Box } from 'styles'
import {
  ExploreNavItem, ExploreNavMenu, ExploreSearchIcon, ExploreSearchInput, ExploreSearchWrapper,
  FollowBtnWrap, SearchResultWapper, SearchUserBio, SearchUserDetails, SearchUserInfo, SearchUserName,
  SearchUserPicWrapper, SearchUserUsername, SearchUserWrap
} from './Explore'
import {
  ModalBody, ModalScroll, Span, ModalBanner, EditForm, EditInputWrap, EditInputContent, EditInput,
  HeaderBackWrapper, ModalCloseIcon, ModalCloseIconWrap, ModalContent, ModalEdit, ModalHeader, ModalTitle,
  SaveModalBtn, SaveModalWrapper
} from '../styles/global'
import {
  BookmarksHeaderContent, BookmarksHeaderName, BookmarksHeaderTweets, BookmarksHeaderWrapper, BookmarksWrapper
} from './Bookmarks'
import { ProfileHeaderBack } from './Lists'

const ListPage = (props) => {
 const { state, actions } = useStore()
  const [modalOpen, setModalOpen] = useState(false)

  const [editName, setName] = useState('')
  const [editDescription, setDescription] = useState('')
  const [banner, setBanner] = useState('')
  const [saved, setSaved] = useState(false)
  const [memOpen, setMemOpen] = useState(false)
  const [tab, setTab] = useState('Members')
  const [bannerLoading, setBannerLoading] = useState(false)
  const [styleBody, setStyleBody] = useState(false)
  const { account, list, listTweets, resultUsers } = state

  useEffect(() => {
    window.scrollTo(0, 0)
    actions.getList(props.match.params.id)
  }, [])

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

  const editList = () => {
    const values = {
      id: props.match.params.id,
      name: editName,
      description: editDescription,
      banner,
    }
    actions.editList(values)
    setSaved(true)
    toggleModal()
  }

  const toggleModal = (param?) => {
    if (param === 'edit') {
      setSaved(false)
    }
    if (param === 'members') {
      setMemOpen(true)
    }
    if (param === 'close') {
      setMemOpen(false)
    }
    setStyleBody(!styleBody)
    setTimeout(() => {
      setModalOpen(!modalOpen)
    }, 20)
  }

  const handleModalClick = (e) => {
    e.stopPropagation()
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
        setBanner(res.data.imageUrl)
        setBannerLoading(false)
      })
      .catch((err) => alert('error uploading image'))
  }

  const changeBanner = () => {
    setBannerLoading(true)
    const file = (document.getElementById('banner') as HTMLInputElement).files[0]
    uploadImage(file)
  }

  const deleteList = () => {
    actions.deleteList(props.match.params.id)
    props.history.push('/lists')
  }

  const goToUser = (id) => {
    props.history.push(`/profile/${id}`)
  }

  const searchOnChange = (param) => {
    if (param.length > 0) {
      actions.searchUsers({ username: param })
    }
  }

  const addToList = (e, username, userId, profileImg, name) => {
    e.stopPropagation()
    const values = {
      id: props.match.params.id,
      username,
      userId,
      profileImg,
      name,
    }
    actions.addToList(values)
  }

  return (
    <Box>
      {list ? (
        <Box>
          <BookmarksWrapper>
            <BookmarksHeaderWrapper>
              <ProfileHeaderBack>
                <HeaderBackWrapper
                  onClick={() => window.history.back()}>
                  <ICON_ARROWBACK />
                </HeaderBackWrapper>
              </ProfileHeaderBack>
              <BookmarksHeaderContent>
                <BookmarksHeaderName>{list.name}</BookmarksHeaderName>
                <BookmarksHeaderTweets>
                  @{list.user.username}
                </BookmarksHeaderTweets>
              </BookmarksHeaderContent>
            </BookmarksHeaderWrapper>
            <ListpBanner>
              <img
                src={
                  saved && banner.length > 0
                    ? banner
                    : list.banner.length > 0
                    ? list.banner
                    : 'https://pbs-o.twimg.com/media/EXZ3BXhUwAEFNBE?format=png&name=small'
                }
                alt="list-banner"
              />
            </ListpBanner>
            <ListpDetailsWrap>
              <BookmarksHeaderName>
                {saved && editName.length > 0 ? editName : list.name}
              </BookmarksHeaderName>
              {list.description.length > 0 || saved ? (
                <ListDescription>
                  {saved && editDescription.length > 0
                    ? editDescription
                    : list.description}
                </ListDescription>
              ) : null}
              <ListOwnerWrap>
                <h4>{list.user.name}</h4>
                <Box>@{list.user.username}</Box>
              </ListOwnerWrap>
              <ListOwnerWrap member={true}
                onClick={() => toggleModal('members')}>
                <h4>{list.users.length}</h4>
                <Box>Members</Box>
              </ListOwnerWrap>
              <ListpEditBtn
                onClick={() => toggleModal('edit')}>
                Edit List
              </ListpEditBtn>
            </ListpDetailsWrap>
            {listTweets &&
              listTweets.map((t) => (
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
          </BookmarksWrapper>
          <ModalEdit
            onClick={() => toggleModal('close')}
            style={{ display: modalOpen ? 'block' : 'none' }}
          >
            <ModalContent h={572}
              onClick={(e) => handleModalClick(e)}
            >
              <ModalHeader noBorder={memOpen}>
                <ModalCloseIcon>
                  <ModalCloseIconWrap
                    onClick={() => toggleModal('close')}>
                    <ICON_CLOSE />
                  </ModalCloseIconWrap>
                </ModalCloseIcon>
                <ModalTitle>
                  {memOpen ? 'List members' : 'Edit List'}
                </ModalTitle>
                {memOpen ? null : (
                  <SaveModalWrapper>
                    <SaveModalBtn onClick={editList}>
                      Done
                    </SaveModalBtn>
                  </SaveModalWrapper>
                )}
              </ModalHeader>
              {memOpen ? (
                <ModalBody>
                  <ExploreNavMenu>
                    <ExploreNavItem active={tab == 'Members'}
                      onClick={() => setTab('Members')}
                    >
                      Members ({list.users.length})
                    </ExploreNavItem>
                    <ExploreNavItem active={tab == 'Search'}
                      onClick={() => setTab('Search')}
                    >
                      Search
                    </ExploreNavItem>
                  </ExploreNavMenu>
                  <ModalScroll>
                    {tab === 'Members' ? (
                      list.users.map((u) => (
                        <SearchResultWapper
                          onClick={() => goToUser(u.username)}
                          key={u._id}>
                          <SearchUserPicWrapper
                            to={`/profile/${u.username}`}>
                            <img
                              style={{
                                borderRadius: '50%',
                                minWidth: '49px',
                              }}
                              width="100%"
                              height="49px"
                              src={u.profileImg}
                            />
                          </SearchUserPicWrapper>
                          <SearchUserDetails>
                            <SearchUserWrap>
                              <SearchUserInfo>
                                <SearchUserName>{u.name}</SearchUserName>
                                <SearchUserUsername>
                                  @{u.username}
                                </SearchUserUsername>
                              </SearchUserInfo>
                              {u._id === account._id ? null : (
                                <FollowBtnWrap removeSwitch={list.users.some((x) => x._id === u._id)}
                                  onClick={(e) =>
                                    addToList(
                                      e,
                                      u.username,
                                      u._id,
                                      u.profileImg,
                                      u.name,
                                    )
                                  }
                                >
                                  <Span>
                                    <Span>
                                      {list.users.some((x) => x._id === u._id)
                                        ? 'Remove'
                                        : 'Add'}
                                    </Span>
                                  </Span>
                                </FollowBtnWrap>
                              )}
                            </SearchUserWrap>
                            <SearchUserBio>
                              {/* {account.description.substring(0,160)} */}
                            </SearchUserBio>
                          </SearchUserDetails>
                        </SearchResultWapper>
                      ))
                    ) : (
                      <Box>
                        <ExploreSearchWrapper br={0}>
                          <ExploreSearchIcon>
                            <ICON_SEARCH styles={{ fill: '#1da1f2' }} />
                          </ExploreSearchIcon>
                          <ExploreSearchInput>
                            <input
                              onChange={(e) => searchOnChange(e.target.value)}
                              placeholder="Search People"
                              type="text"
                              name="search"
                            />
                          </ExploreSearchInput>
                        </ExploreSearchWrapper>
                        {resultUsers.length
                          ? resultUsers.map((u) => (
                              <SearchResultWapper
                                onClick={() => goToUser(u.username)}
                                key={u._id}>
                                <SearchUserPicWrapper
                                  to={`/profile/${u.username}`}>
                                  <img
                                    style={{
                                      borderRadius: '50%',
                                      minWidth: '49px',
                                    }}
                                    width="100%"
                                    height="49px"
                                    src={u.profileImg}
                                  />
                                </SearchUserPicWrapper>
                                <SearchUserDetails>
                                  <SearchUserWrap>
                                    <SearchUserInfo>
                                      <SearchUserName>
                                        {u.name}
                                      </SearchUserName>
                                      <SearchUserUsername>
                                        @{u.username}
                                      </SearchUserUsername>
                                    </SearchUserInfo>
                                    {u._id === account._id ? null : (
                                      <FollowBtnWrap removeSwitch={list.users.some(
                                        (x) => x._id === u._id,
                                      )}
                                        onClick={(e) =>
                                          addToList(
                                            e,
                                            u.username,
                                            u._id,
                                            u.profileImg,
                                            u.name,
                                          )
                                        }
                                      >
                                        <Span>
                                          <Span>
                                            {list.users.some(
                                              (x) => x._id === u._id,
                                            )
                                              ? 'Remove'
                                              : 'Add'}
                                          </Span>
                                        </Span>
                                      </FollowBtnWrap>
                                    )}
                                  </SearchUserWrap>
                                  <SearchUserBio>
                                    {u.description.substring(0, 160)}
                                  </SearchUserBio>
                                </SearchUserDetails>
                              </SearchResultWapper>
                            ))
                          : null}
                      </Box>
                    )}
                  </ModalScroll>
                </ModalBody>
              ) : (
                <ModalBody>
                  <ModalBanner>
                    {list.banner.length > 0 || banner.length > 0 ? (
                      <img
                        src={
                          bannerLoading
                            ? 'https://i.imgur.com/62jOROc.gif'
                            : banner.length > 0
                            ? banner
                            : list.banner
                        }
                        alt="modal-banner"
                      />
                    ) : null}
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
                  <EditForm>
                    <EditInputWrap>
                      <EditInputContent>
                        <label>Name</label>
                        <EditInput
                          defaultValue={list.name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          name="name"
                        />
                      </EditInputContent>
                    </EditInputWrap>
                    <EditInputWrap mt={30}>
                      <EditInputContent>
                        <label>Description</label>
                        <EditInput
                          defaultValue={list.description}
                          onChange={(e) => setDescription(e.target.value)}
                          type="text"
                          name="description"
                        />
                      </EditInputContent>
                    </EditInputWrap>
                  </EditForm>
                  <ModalDeleteBox onClick={deleteList}>
                    Delete List
                  </ModalDeleteBox>
                </ModalBody>
              )}
            </ModalContent>
          </ModalEdit>
        </Box>
      ) : (
        <BookmarksWrapper>
          <Loader />{' '}
        </BookmarksWrapper>
      )}
    </Box>
  )
}

export default withRouter(ListPage)

export const ListpBanner = styled(Box)`
  max-height: 200px;
  height: 200px;
  width: 100%;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const ListpDetailsWrap = styled(Box)`
  padding: 10px 10px 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgb(230, 236, 240);;
`

export const ListOwnerWrap = styled(Box)<{ member?: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
  &:hover{
    h4{text-decoration: underline;}
  }
  div{
    margin-left: 5px;
    color: rgb(101, 119, 134);
  }
  ${p => p.member && css`
    &:hover{
      text-decoration: underline;
    }  
  `}
`

export const ListpEditBtn = styled(Box)`
  margin: 20px 0;
  min-width: 92px;
  min-height: 39px;
  display: flex;
  font-weight: bold;
  color: rgb(29, 161, 242);
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  border: 1px solid rgb(29, 161, 242);
  border-radius: 9999px;
  transition: 0.2s ease-in-out;
  &:hover{
    background-color: rgba(29,161,242,0.1);
  }
`

export const ListDescription = styled(Box)`
  margin-top: 10px;
`

export const ModalDeleteBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(224, 36, 94);
  border-top: 1px solid rgb(230, 236, 240);
  border-bottom: 1px solid rgb(230, 236, 240);
  padding: 15px;
  min-height: 49px;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  will-change: background-color;
  margin-top: 30px;
  &:hover{
    font-weight: 600;
    background-color: rgba(224, 36, 94, 0.1);
  }
`
