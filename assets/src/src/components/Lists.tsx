import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../store/store'
import { API_URL } from '../config'
import {
  ICON_ARROWBACK,
  ICON_CLOSE,
  ICON_NEWLIST,
  ICON_UPLOAD,
} from '../Icons'
import styled from 'styled-components'
import { Box } from 'styles'
import {
  Span, ModalEdit, ModalContent, ModalCloseIcon, ModalCloseIconWrap, ModalHeader, ModalTitle,
  SaveModalBtn, SaveModalWrapper, ModalBody, EditForm, EditInputWrap, EditInputContent, ModalBanner
} from '../styles/global'
import {
  BookmarksWrapper, BookmarksHeaderWrapper, BookmarksHeaderContent, BookmarksHeaderName,
  BookmarksHeaderTweets
} from './Bookmarks'

const Lists = (props) => {
  const { state, actions } = useContext(StoreContext)
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [banner, setBanner] = useState('')
  const [styleBody, setStyleBody] = useState(false)

  const { account, lists } = state

  useEffect(() => {
    window.scrollTo(0, 0)
    actions.getLists()
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

  const createList = () => {
    const values = { name, description, banner }
    actions.createList(values)
    toggleModal()
  }

  const toggleModal = () => {
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
      })
      .catch((err) => alert('error uploading image'))
  }

  const changeBanner = () => {
    const file = (document.getElementById('banner') as HTMLInputElement).files[0]
    uploadImage(file)
  }

  return (
    <Box>
      <BookmarksWrapper>
        <BookmarksHeaderWrapper>
          <ProfileHeaderBack>
            <HeaderBackWrapper
              onClick={() => window.history.back()}
              className="header-back-wrapper"
            >
              <ICON_ARROWBACK />
            </HeaderBackWrapper>
          </ProfileHeaderBack>
          <BookmarksHeaderContent>
            <BookmarksHeaderName>Your Lists</BookmarksHeaderName>
            <BookmarksHeaderTweets>
              @{account && account.username}
            </BookmarksHeaderTweets>
          </BookmarksHeaderContent>
          <NewlistIconWrap onClick={() => toggleModal()}>
            <Span>new list</Span>
            <ICON_NEWLIST />
          </NewlistIconWrap>
        </BookmarksHeaderWrapper>
        {lists.map((l) => (
          <ListCardWrapper
            key={l._id}
            to={`/lists/${l._id}`}
          >
            <ListImgWrap>
              <img
                src={
                  l.banner.length > 0
                    ? l.banner
                    : 'https://pbs-o.twimg.com/media/EXZ3BXhUwAEFNBE?format=png&name=small'
                }
                alt="list"
              />
            </ListImgWrap>
            <ListContentWrap>
              <h4>{l.name}</h4>
              <ListDetailsWrap>
                <h5>{account && account.name}</h5>
                <Box>@{account && account.username}</Box>
              </ListDetailsWrap>
            </ListContentWrap>
          </ListCardWrapper>
        ))}

        {/* add loader for bookmarks when empty using dispatch */}
        {/* {bookmarks.map(t=>{
        console.log(t)
        return <TweetCard parent={t.parent} key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description} images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  />
      })} */}
      </BookmarksWrapper>
      <ModalEdit
        onClick={() => toggleModal()}
        style={{ display: modalOpen ? 'block' : 'none' }}
      >
        <ModalContent h={480} onClick={(e) => handleModalClick(e)}>
          <ModalHeader>
            <ModalCloseIcon>
              <ModalCloseIconWrap
                onClick={() => toggleModal()}
              >
                <ICON_CLOSE />
              </ModalCloseIconWrap>
            </ModalCloseIcon>
            <ModalTitle>Create a new List</ModalTitle>
            <SaveModalWrapper>
              <SaveModalBtn onClick={createList}>
                Create
              </SaveModalBtn>
            </SaveModalWrapper>
          </ModalHeader>
          <ModalBody>
            <ModalBanner>
              {banner.length > 0 && <img src={banner} alt="list-banner" />}
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
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    className="edit-input"
                  />
                </EditInputContent>
              </EditInputWrap>
              <EditInputWrap mt={30}>
                <EditInputContent>
                  <label>Description</label>
                  <input
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    name="description"
                    className="edit-input"
                  />
                </EditInputContent>
              </EditInputWrap>
            </EditForm>
          </ModalBody>
        </ModalContent>
      </ModalEdit>
    </Box>
  )
}

export default withRouter(Lists)

const ProfileHeaderBack = styled(Box)`
  min-width: 55px;
  min-height: 30px;
  justify-content: center;
  align-items: flex-start;
`

const HeaderBackWrapper = styled(Box)`
  &:hover{
    background-color: rgba(29,161,242,0.1);
  }
`

const ListCardWrapper = styled(Link)`
  padding: 10px 15px;
  border-bottom: 1px solid rgb(230, 236, 240);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover{
    background-color: rgb(245,248,250);
  }
`

const ListImgWrap = styled(Box)`
  margin-right: 15px;
  height: 49px;
  width: 49px;
  border-radius: 14px;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 14px;
  }
`

const ListContentWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40px;
  align-items: flex-start;
`

const ListDetailsWrap = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 2px;
  div{
    margin-left: 5px;
    font-size: 13px;
    line-height: 1.5;
    color: rgb(101, 119, 134);
  }
`

const NewlistIconWrap = styled(Box)`
  display: flex;
  margin-left: auto;
  span{
    margin-right: 5px;
    font-weight: 500;
    line-height: 1.5;
  }
  svg{
    fill: rgb(29, 161, 242);
    width: 22.5px;
    height: 22.5px;
  }
`
