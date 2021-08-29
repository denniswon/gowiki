import React, { useEffect, useState, useRef } from 'react'
import { useStore } from '../store/store'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import ContentEditable from 'react-contenteditable'
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  setFetchMethod,
} from 'darkreader'
import { API_URL } from '../config'
import {
  ICON_LOGO, ICON_HOME, ICON_HASH, ICON_BELL, ICON_INBOX, ICON_BOOKMARK, ICON_LIST, ICON_USER, ICON_SETTINGS,
  ICON_HOMEFILL, ICON_HASHFILL, ICON_BELLFILL, ICON_BOOKMARKFILL, ICON_LISTFILL, ICON_USERFILL, ICON_FEATHER,
  ICON_CLOSE, ICON_IMGUPLOAD, ICON_INBOXFILL, ICON_LIGHT, ICON_DARK
} from '../styles/icons'
import styled, { css } from 'styled-components'
import {
  CancelImage, InnerImageBox, InnerInputBox, InnerInputLinks, InputAttachWrapper, InputLinksSide,
  ModalCloseIcon, ModalCloseIconWrap, ModalTitle, ModalBody, ModalContent, ModalEdit, ModalHeader, Span,
  TweetBtnHolder, TweetBtnSide, TweetInputSide, TweetInputWrapper, TweetProfileWrapper, TweetUploadImage
} from '../styles/global'
import { Box, m } from 'styles'

const Nav = ({ history }) => {
 const { state, actions } = useStore()

  const { account, session } = state
  const [moreMenu, setMoreMenu] = useState(false)
  const [theme, setTheme] = useState<string>('light')
  const [modalOpen, setModalOpen] = useState(false)
  const [styleBody, setStyleBody] = useState(false)
  const [tweetText, setTweetText] = useState<string>('')
  const [tweetImage, setTweetImage] = useState<string>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  const tweetT = useRef('')

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
    const ran = false
    history.listen((location, action) => {
      state.account == null
        ? actions.verifyToken('get account')
        : actions.verifyToken()
    })
    !ran && state.account == null
      ? actions.verifyToken('get account')
      : actions.verifyToken()
    if (localStorage.getItem('Theme') == 'dark') {
      setTheme('dark')
      setFetchMethod(window.fetch)
      enableDarkMode({})
    } else if (!localStorage.getItem('Theme')) {
      localStorage.setItem('Theme', 'light')
    }
  }, [])

  const path = history.location.pathname.slice(0, 5)

  const openMore = (e) => {
    setMoreMenu(!moreMenu)
  }

  const handleMenuClick = (e) => {
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
        setTweetImage(res.data.imageUrl)
      })
      .catch((err) => alert('error uploading image'))
  }

  const onchangeImage = () => {
    const file = (document.getElementById('image') as HTMLInputElement).files[0]
    uploadImage(file)
  }

  const removeImage = () => {
    (document.getElementById('image') as HTMLInputElement).value = ''
    setTweetImage(null)
    setImageLoaded(false)
  }

  const toggleModal = (e) => {
    if (e) {
      e.stopPropagation()
    }
    setStyleBody(!styleBody)
    setTimeout(() => {
      setModalOpen(!modalOpen)
    }, 20)
  }

  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  const handleChange = (evt) => {
    if (
      tweetT.current.trim().length <= 280 &&
      tweetT.current.split(/\r\n|\r|\n/).length <= 30
    ) {
      tweetT.current = evt.target.value
      setTweetText(tweetT.current)
    }
  }

  const submitTweet = (e) => {
    const hashtags = tweetText.match(/#(\w+)/g)
    toggleModal(e)
    if (!tweetText.length) {
      return
    }
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

  const changeTheme = () => {
    if (localStorage.getItem('Theme') === 'dark') {
      disableDarkMode()
      localStorage.setItem('Theme', 'light')
    } else if (localStorage.getItem('Theme') === 'light') {
      localStorage.setItem('Theme', 'dark')
      setFetchMethod(window.fetch)
      enableDarkMode({})
    }
  }

  return (
    <NavComponent>
      <NavWidth>
        <NavBody >
          <NavContent>
            <NavWrapper>
              <LogoWrapper to="/home">
                <ICON_LOGO
                  styles={{
                    fill: 'rgb(29,161,242)',
                    width: '47px',
                    height: '30px',
                  }}
                />
              </LogoWrapper>
              <NavLink to="/home">
                <NavItemHover active={path === '/home'}>
                  {path === '/home' ? <ICON_HOMEFILL /> : <ICON_HOME />}
                  <NavItem>Home</NavItem>
                </NavItemHover>
              </NavLink>
              <NavLink to="/explore">
                <NavItemHover active={path === '/expl'}>
                  {path === '/expl' ? <ICON_HASHFILL /> : <ICON_HASH />}
                  <NavItem>Explore</NavItem>
                </NavItemHover>
              </NavLink>
              {session ? (
                <>
                  <NavLink to="/notifications">
                    <NavItemHover active={path === '/noti'}>
                      {path === '/noti' ? <ICON_BELLFILL /> : <ICON_BELL />}
                      <NavItem>Notifications</NavItem>
                    </NavItemHover>
                  </NavLink>
                  <NavLink to="/messages">
                    <NavItemHover active={path === '/mess'}>
                      {path === '/mess' ? <ICON_INBOXFILL /> : <ICON_INBOX />}
                      <NavItem>Messages</NavItem>
                    </NavItemHover>
                  </NavLink>
                  <NavLink to="/bookmarks">
                    <NavItemHover active={path === '/book'}>
                      {path === '/book' ? (
                        <ICON_BOOKMARKFILL />
                      ) : (
                        <ICON_BOOKMARK />
                      )}
                      <NavItem>Bookmarks</NavItem>
                    </NavItemHover>
                  </NavLink>
                  <NavLink to="/lists">
                    <NavItemHover active={path === '/list'}>
                      {path === '/list' ? <ICON_LISTFILL /> : <ICON_LIST />}
                      <NavItem>Lists</NavItem>
                    </NavItemHover>
                  </NavLink>
                  <NavLink to={`/profile/${account && account.username}`}>
                    <NavItemHover active={path === '/prof'}>
                      {path === '/prof' ? <ICON_USERFILL /> : <ICON_USER />}
                      <NavItem>Profile</NavItem>
                    </NavItemHover>
                  </NavLink>
                </>
              ) : null}
              <NavLinkBtn id="moremenu" onClick={(e) => openMore(e)}>
                <NavItemHover>
                  <ICON_SETTINGS />
                  <NavItem>More</NavItem>
                </NavItemHover>
                <MoreMenuBackground active={moreMenu}
                  onClick={openMore}
                >
                  <MoreModalWrapper>
                    {moreMenu && (
                      <MoreMenuContent
                        top={document.getElementById('moremenu').getBoundingClientRect().top - 40}
                        left={document.getElementById('moremenu').getBoundingClientRect().left}
                        h={!session ? 104 : null}
                        onClick={handleMenuClick}
                      >
                        <MoreMenuItem onClick={changeTheme}>
                          <Span>Change Theme</Span>
                          <Span>{theme ? <ICON_DARK /> : <ICON_LIGHT />}</Span>
                        </MoreMenuItem>
                        {session ? (
                          <Link
                            to="/bookmarks"
                            className="more-menu-item more-item"
                          >
                            <Span>Bookmarks</Span>
                            <Span>
                              <ICON_BOOKMARK />
                            </Span>
                          </Link>
                        ) : null}
                        {session ? (
                          <MoreMenuItem
                            onClick={() => actions.logout()}
                          >
                            Log out @{account && account.username}
                          </MoreMenuItem>
                        ) : (
                          <MoreMenuItem
                            onClick={() => history.push('/login')}
                            className="more-menu-item"
                          >
                            Log in
                          </MoreMenuItem>
                        )}
                      </MoreMenuContent>
                    )}
                  </MoreModalWrapper>
                </MoreMenuBackground>
              </NavLinkBtn>
              {session && (
                <NavTweet>
                  <NavTweetLink onClick={toggleModal}>
                    <NavTweetBtn className="btn-hide">Tweet</NavTweetBtn>
                    <NavTweetBtn className="btn-show">
                      <Span>
                        <ICON_FEATHER />
                      </Span>
                    </NavTweetBtn>
                  </NavTweetLink>
                </NavTweet>
              )}
            </NavWrapper>
            <Box />
          </NavContent>
        </NavBody>
      </NavWidth>

      {account && (
        <ModalEdit
          onClick={toggleModal}
          style={{ display: modalOpen ? 'block' : 'none' }}
        >
          <ModalContent minh={270} h={'initial'}
              onClick={(e) => handleModalClick(e)}>
            <ModalHeader>
              <ModalCloseIcon>
                <ModalCloseIconWrap
                  onClick={toggleModal}>
                  <ICON_CLOSE />
                </ModalCloseIconWrap>
              </ModalCloseIcon>
              <ModalTitle>Tweet</ModalTitle>
            </ModalHeader>
            <ModalBody mt={5}>
              <TweetInputWrapper prel>
                <TweetProfileWrapper>
                  <Box>
                    <img
                      style={{ borderRadius: '50%', minWidth: '49px' }}
                      width="100%"
                      height="49px"
                      src={account.profileImg}
                    />
                  </Box>
                </TweetProfileWrapper>
                <TweetInputSide
                  onClick={() => document.getElementById('tweetPop').focus()}
                >
                  <InnerInputBox>
                    <ContentEditable
                      onKeyDown={(e) =>
                        tweetT.current.length > 279
                          ? e.keyCode !== 8 && e.preventDefault()
                          : null
                      }
                      id="tweetPop"
                      onPaste={(e) => e.preventDefault()}
                      style={{ minHeight: '120px' }}
                      className={tweetText.length ? 'tweet-input-active' : null}
                      placeholder="What's happening"
                      html={tweetT.current}
                      onChange={handleChange}
                    />
                  </InnerInputBox>
                  {tweetImage && (
                    <InnerImageBox>
                      <TweetUploadImage
                        onLoad={() => setImageLoaded(true)}
                        src={tweetImage}
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
                      <InputAttachWrapper ml={-10}>
                        <ICON_IMGUPLOAD
                          styles={{ fill: 'rgb(29, 161, 242)' }}
                        />
                        <input
                          title=" "
                          id="image"
                          style={{ opacity: '0' }}
                          type="file"
                          onChange={() => onchangeImage()}
                        />
                      </InputAttachWrapper>
                    </InputLinksSide>
                    <TweetBtnHolder>
                      <m.Text fs={13} color={ tweetText.length >= 280 ? 'red' : null }>
                        {tweetText.length > 0 && `${tweetText.length}/280`}
                      </m.Text>
                      <TweetBtnSide active={tweetText.length > 0} onClick={(e) => submitTweet(e)}>
                        Tweet
                      </TweetBtnSide>
                    </TweetBtnHolder>
                  </InnerInputLinks>
                </TweetInputSide>
              </TweetInputWrapper>
            </ModalBody>
          </ModalContent>
        </ModalEdit>
      )}
    </NavComponent>
  )
}

export default withRouter(Nav)

const NavWidth = styled(Box)`
  width: 275px;
  position: relative;
  @media (max-width: 1282px) {
    width: 88px;
  }
  @media (max-width: 450px) {
    width: 100vw !important;
    height: 53px;
  }
`

const NavComponent = styled(Box)`
  position: relative;
  z-index: 200;
  @media (max-width: 450px) {
    width: 100vw;
  }
`

const NavBody = styled(Box)`
  top: 0;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  border-right: 1px solid rgb(230, 236, 240);
  @media (max-width: 450px) {
    top: auto !important;
    width: 100vw;
    position: relative !important;
  }
`

const NavContent = styled(Box)`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  width: 275px;
  padding-right: 20px;
  padding-left: 20px;
  // justify-content: space-between;
  height: 100%;
  @media (max-width: 1282px) {
    width: 88px;
  }
  @media (max-width: 450px) {
    width: 100% !important;
    display: block;
    padding: 0 !important;
    height: auto;
    overflow: hidden;
  }
`

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  @media (max-width: 450px) {
    background-color: #fff;
    border-top: 2px solid rgb(245, 248, 250);
    display: flex;
    align-content: center;
    flex-direction: row !important;
    margin: 0;
    justify-content: space-evenly;
    a:nth-child(1) {
      display: none;
    }
    a:nth-child(4) {
      display: none;
    }
    a:nth-child(6) {
      display: none;
    }
    a:nth-child(9) {
      display: none;
    }
  }
`

const LogoWrapper = styled(Link)`
  min-width: 30px;
  cursor: pointer;
  margin-top: 11.5px;
  display: flex;
  margin-bottom: 15px;
  // align-items: center;
  // justify-content: center;
`

const link = css`
  padding: 7px 0;
  display: flex;
  cursor: pointer;
  &:hover{
    background-color: rgba(29,161,242, 0.1);
    color: rgb(29, 161, 242);
    svg{fill: rgb(29, 161, 242)}
  }
`

const NavLink = styled(Link)`
  ${link}
  @media (max-width: 450px) {
    padding: 0;
  }
`

const NavLinkBtn = styled(Box)`${link}`

const NavItemHover = styled(Box)<{ active?: boolean }>`
  svg{fill: rgb(16, 17, 17)}
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
  max-width: 100%;
  border-radius: 9999px;
  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  svg {
    width: 26.25px; height:26.25px;
    min-width: 26.25px;
  }
  ${p => p.active && 'svg { fill: rgb(29, 161, 242); }'}
`

const NavItem = styled(Box)<{ active?: boolean }>`
  font-size: 19px;
  font-weight: 700;
  margin-left: 20px;
  margin-right: 20px;
  @media (max-width: 1282px) {
    display: none;
  }
  ${p => p.active && 'color: rgb(29, 161, 242);'}
`

const NavTweet = styled(Box)`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 5px;
  display: flex;
  @media (max-width: 1286px) {
    justify-content: center;
  }
`

const NavTweetLink = styled(Box)`
  width: 90%;
  background-color: rgb(29, 161, 242);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 28px;
  outline-style: none;
  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  min-width: 78.89px;
  min-height: 49px;
  padding-left: 30px;
  padding-right: 30px;
  border: 1px solid rgba(0, 0, 0, 0);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  
  @media (max-width: 1286px) {
    width: 100%;
  }
  @media (max-width: 1282px) {
    max-width: 49px;
    width: 49px;
    padding: 0;
    min-width: 49px;
`

const NavTweetBtn = styled(Box)`
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  overflow-wrap: break-word;
  text-align: center;
  max-width: 100%;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 22.25px; height:22.25px;
      min-width: 22.25px;
      fill: #fff;
    }
  }
  content: 'Tweet';
  
  .btn-show {
    display: none;
    @media (max-width: 1282px) {
      display: block;
    }
  }
  .btn-hide {
    @media (max-width: 1282px) {
      display: none;
    }
  }
`

const MoreMenuBackground = styled(Box)<{ active?: boolean }>`
  position: fixed; 
  z-index: 20; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%;
  overflow: auto; 
  cursor: auto;
  display: ${p => p.active ? 'block' : 'none'}
`

const MoreModalWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
`

const MoreMenuContent = styled(Box)`
  min-height: 100px;
  max-width: 40vw;
  max-height: 50vh;
  width: 190px;
  min-width: 190px;
  border-radius: 14px;
  background-color: #fff;
  position: absolute;
  // top: 46.5%;
  // left: 26%;
  z-index: 1000;
  // transform: translate(-50%, -50%);
  overflow: hidden;
  box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;
  display: flex;
  flex-direction: column;
  @media (min-width: 451px){
    height: 104px;
  }
`

const MoreMenuItem = styled(Box)`
  border-bottom: 1px solid rgb(245, 248, 250);
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.2 ease-in-out;
  cursor: pointer;
  &:hover{
    background-color: rgb(245, 248, 250);
  }
  span{
    display: flex;
    align-items: center;
  }
  svg{
    width: 16px;
  }
`

const MoreItem = styled(Box)`
  display: none;
`
