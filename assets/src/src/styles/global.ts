import styled, { css } from 'styled-components'
import { Box } from 'styles'
import ContentEditable from 'react-contenteditable'

export const Span = styled.span``

export const BodyWrap = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 450px) {
    overflow-y: auto !important;
    overflow-x: hidden;
    width: 100%;
  }
`

export const Header = styled(Box)`
  display: flex;
  justify-content: flex-end;
  position: relative;
  order: -1;
  flex-wrap: wrap;
  @media (max-width: 450px) {
    position: sticky;
    width: 100vw;
    bottom: 0;
    height: 53px;
    order: 1;
  }
`

export const Main = styled(Box)`
  width: 990px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1196px) {
    width: 920px;
  }
  @media (max-width: 1005px) {
    width: 100%;
  }
`

export const MiddleSection = styled(Box)`
  max-width: 600px;
  min-height: 100vh;
`

export const MsWidth = styled(Box)`
  width: 100%;
`

export const RightSection = styled(Box)`
  width: 350px;
  margin-right: 10px;
  min-height: 1000px;
  height: 100%;
  @media (max-width: 1196px) {
    width: 290px !important;
  }
  @media (max-width: 1005px) {
    display: none;
  }
`

export const ModalEdit = styled(Box)`
  // display: none;
  position: fixed; 
  z-index: 250; 
  // padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%;
  overflow: auto; 
  background-color: rgba(0,0,0,0export const 4); 
`

export const ModalContent = styled(Box)`
  min-height: 400px;
  max-height: 90vh;
  height: 650px;
  width: 100%;
  max-width: 600px;
  border-radius: 14px;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 50;
  transform: translate(-50%, -50%);
  overflow: hidden;
`

export const ModalHeader = styled(Box)`
  height: 53px;
  z-index: 3;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid rgb(204, 214, 221);
  max-width: 1000px;
  width: 100%;

`

export const ModalCloseIcon = styled(Box)`
  display: flex;
  justify-content: flex-start;
  margin-left: 4px;
  align-items: center;
  min-width: 59px;
  min-height: 30px;
`

export const ModalCloseIconWrap = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0export const 2s ease-in-out;
  border: 1px solid rgba(0,0,0,0);
  border-radius: 9999px;
  width: 39px;
  height: 39px;
  cursor: pointer;
  &:hover {
    background-color: rgba(29,161,242,0export const 1);
  }
  svg {
    fill: rgb(29, 161, 242);
    height: 22export const 5px;
  }
`

export const ModalTitle = styled.p`
  font-weight: bold;
  font-size: 19px;
  width: 100%;
`

export const SaveModalWrapper = styled(Box)`
  margin-right: 8px;
  min-height: 39px;
  min-width: 66px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const SaveModalBtn = styled(Box)`
  // width: 48px;
  min-height: 30px;
  transition: 0export const 2s ease-in-out;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #fff;
  background-color: rgb(29,161,242);
  border: 1px solid rgba(0,0,0,0);
  border-radius: 9999px;
  line-height: 20px;
  cursor: pointer;
  &:hover {
    background-color: rgb(26, 145, 218);
  }
`

export const ModalBody = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  
`

export const ModalBanner = styled(Box)`
  max-height: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  border: 2px solid rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0export const 3);
  position: relative;

  img {
    max-width: 100%;
    width: 100%;
    max-height: 100%;
    object-fit: cover;
    display: block;
    opacity: 0export const 75;
  }

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      width: 22export const 5px;
      min-width: 22export const 5px;
      height: 22export const 5px;
      overflow: hidden;
      z-index: 20;
      padding: 10px 0 10px 30px;
      cursor: pointer;
      color: inherit;
      background-color: initial;
      outline: none;
      border: initial;
    }

    svg {
      cursor: pointer;
      position: absolute;
      fill: #fff;
      width: 22export const 5px;
      min-width: 22export const 5px;
      height: 22export const 5px;
    } 
  }
`

export const ModalScroll = styled(Box)`
  overflow-y: scroll;
  height: 100%;
  margin-bottom: 55px;
`

export const ModalProfilePic = styled(Box)`
  height: 120px;
  width: 120px;
  border: 4px solid #fff;
  border-radius: 50%;
  margin-left: 16px;
  margin-top: -48px;
  z-index: 5;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalBackPic = styled(Box)`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 1);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: 0export const 6;
    border-radius: 50%;
  }

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      width: 22export const 5px;
      min-width: 22export const 5px;
      height: 22export const 5px;
      overflow: hidden;
      z-index: 20;
      padding: 10px 0 10px 30px;
      cursor: pointer;
      color: inherit;
      background-color: initial;
      outline: none;
      border: initial;
    }

    svg {
      cursor: pointer;
      position: absolute;
      fill: #fff;
      width: 22export const 5px;
      min-width: 22export const 5px;
      height: 22export const 5px;
    }
  }
`

export const EditForm = styled.form`
  width: 100%;
`

export const EditInput = styled(Box)`
  background-color: inherit;
  border: inherit;
  &:focus = {
    background-color: inherit;
    border: inherit;
  }
`

export const EditInputWrap = styled(Box)`
  padding: 10px 15px;
  margin-bottom: 15px;
`

export const EditInputContent = styled(Box)`
  border-bottom: 1px solid rgb(64, 67, 70);
  background-color: rgb(245, 248, 250);
  label {
    color: rgb(101, 119, 134);
    display: block;
    padding: 5px 10px 0 10px;
  }
  input {
    width: 100%;
    outline: none;
    font-size: 19px;
    padding: 2px 10px 5px 10px;
  }
`


//////from home


export const TweetInputWrapper = styled(Box)`
  padding: 10px 15px 5px 15px;
  display: flex;
  margin-bottom: 2px;
`

export const TweetProfileWrapper = styled(Box)`
  flex-basis: 49px;
  padding-top: 5px;
  margin-right: 10px;
  img {
    object-fit: cover;
  }
`
export const TweetInputSide = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: static;
  width: calc(100% - 49px);
  border: 2px solid rgba(0, 0, 0, 0);
  border-radius: 5px;
  padding-top: 5px;
  line-height: 1export const 3125;   
  cursor: text;
`

export const InnerInputBox = styled(Box)`
  padding: 10px 0;
  font-size: 19px;
  color: #9197a3;
  position: relative;
  div {
    outline: none;
    white-space: pre-wrap;
    max-width: 506px;
    &:focus {
      outline: none;
    }
  }
`

export const InnerInputLinks = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin: 0 2px;
  
`

export const InputLinksSide = styled(Box)`
  margin-top: 10px;
  display: flex;
  align-items: center;
`

export const InputAttachWrapper = styled(Box)`
  width: 39px;
  height: 39px;
  cursor: pointer;
  padding: 8export const 3px;
  position: relative;
  input {
    position: absolute;
    width: 0export const 3px;
    height: 0export const 3px;
    overflow: hidden;
    z-index: 4;
    padding-top: 21px;
    padding-bottom: 15px;
    padding-right: 0px;
    padding-left: 32px;
    top: 2px;
    left: 3px;
    cursor: pointer;
    outline: none;
    color: inherit;
    background-color: initial;
    border: initial;
    text-align: start !important;
  }
  &:hover {
    border-radius: 50%;
    background-color: rgba(29, 161, 242, 0.1);
  }
`

export const TweetBtnSide = styled(Box)<{ active?: boolean }>`
  margin-left: 10px;
  min-height: 39px;
  min-width: calc(62export const 79px);
  background-color: rgb(29, 161, 242);
  padding: 0 1em;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 700;
  // cursor: pointer;
  opacity: 0export const 5;
  transition: 0export const 15s ease-in-out;
  ${p => p.active && css`
    cursor: pointer;
    opacity: 1;
    &:hover {
      background-color: rgba(11, 137, 216, 0.876);
    }
  `}
`

export const TweetInput = styled(ContentEditable)<{ active?: boolean }>`
  ${p => p.active && css`
    color: rgb(20, 23, 26
  `}
`

export const TweetInputDivider = styled(Box)`
  min-height: 10px;
  height: 10px;
  background-color: rgb(230, 236, 240);
  content: '';
`

export const Editable = styled(ContentEditable)`
  display: inline-block;
  &:empty {
    &:before {
      content: attr(placeholder);
      pointer-events: none;
      display: block; /* For Firefox */
    }
    &:focus {
      opacity: 0export const 7;
    }
  }
`
  
export const CardContentInfo = styled(Box)`
  word-wrap: break-word;
`

export const TweetUploadImage = styled.img`
  margin-top: 10px;
  border-radius: 14px;
  max-height: 253px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const InnerImageBox = styled(Box)`
  position: relative;
`

export const CancelImage = styled.span`
  position: absolute;
  color: white;
  left: 9px;
  top: 18px;
  width: 33px;
  align-items: center;
  justify-content: center;
  line-height: 23px;
  text-align: center;
  display: flex;
  height: 33px;
  background-color: rgba(0, 0, 0, 0export const 5);
  border-radius: 50%;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  padding-bottom: 3export const 5px;
`

export const WorkInProgress = styled(Box)`
  max-width: 600px;
  border-right: 1px solid rgb(230, 236, 240);
  width: 100%;
  font-weight: bold;
  font-size: 17px;
  text-align: center;
  padding-top: 20%;
  color: #657786;
  min-height: 2000px;
`

//   export const dark-mode = styled(Box)`
//     background-color: #1a1919 !important;
//   `

export const AlertWrapper = styled(Box)`
  position: fixed;
  top: 0;
`

export const TweetBtnHolder = styled(Box)`
  margin-left: 10px;
  display: flex;
  align-items: center;
`


export const HeaderBackWrapper = styled(Box)`
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
`

export const NavTweet = styled(Box)`
  display: none !important;
`

export const MoreMenuContent = styled(Box)`
  top: auto !important;
  bottom: 46px !important;
  left: 47% !important;  
  overflow: hidden; 
  height: 154px;   
`

export const MoreItem = styled(Box)`
  display: flex !important;
`