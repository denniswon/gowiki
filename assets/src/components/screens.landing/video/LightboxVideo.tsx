// To automatically launch video:
// -> Add ?play=true to  a Tandem URl where this component lives and it will automatically open

import React, { useEffect, useRef, useState } from 'react'
import { tracker } from 'services'

import { Icon } from '@gowiki/web'

import { useEscapeKey } from 'utils/useEscape'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

import LightboxVideoButton from './LightboxVideoButton'
import Youtube from './Youtube'

type Props = {
  children?: any
  noButton?: boolean
}

export default function LightboxVideo(props: Props) {
  const [showVideo, setShowVideo] = useState<boolean>(false)
  const { children, noButton } = props

  const playVideo = () => {
    setShowVideo(true)
    // tracker.explainerVideo('play')
  }

  const playFromUrl = () => {
    setShowVideo(true)
    // tracker.explainerVideo('playFromUrl')
  }

  const stopVideo = () => {
    setShowVideo(false)
  }

  const onEnd = () => {
    // tracker.explainerVideo('end')
  }

  useEffect(() => {
    const search = new URLSearchParams(location.search)
    const autoPlayVideo = search.get('play')
    if (autoPlayVideo) playFromUrl()
  }, [])

  const buttonComponent = <LightboxVideoButton onClick={playVideo} />
  const childrenProps = {
    open: () => playVideo(),
    close: () => stopVideo(),
    button: buttonComponent,
  }

  return <>
    {noButton ? null : typeof children == 'function' ? children(childrenProps) : buttonComponent}
    <Lightbox visible={showVideo} onClose={() => setShowVideo(false)} onEnd={onEnd} />
  </>
}


type LightboxProps = {
  visible: boolean,
  onClose: () => void
  onEnd: () => void
}

const Lightbox = (props: LightboxProps) => {
  const { visible, onClose, onEnd } = props
  useEscapeKey(() => onClose())

  const ref = useRef<any>()

  const checkVideo = () => {
    useEffect(() => {
      if (ref.current){
        if (visible) ref.current.playVideo()
        else ref.current.stopVideo()
      }
    }, [visible, ref])
  }

  const onReady = (event) => {
    ref.current = event.target
    if (!event.target) return
    if (visible) event.target.playVideo()
    else {
      // Trick to make the video play really quickly when the user decide to open it.
      event.target.playVideo()
      event.target.pauseVideo()
    }
  }

  checkVideo()

  return (
    <Wrapper center visible={visible} onClick={onClose}>
      <Box prel center w='100%' maxh='100%' maxw={1020} p={20}>
        <Youtube onReady={onReady} onEnd={onEnd} />
        <Pressable row center p={12} pabs top={-12} right={-12} iconOp={1} zIndex={200}
          bg={c.white} hoverBg={c.white} hoverColor={c.black80} br='100%'
        >
          <Icon name='close' size={24} color={c.black} />
        </Pressable>
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled(Box)<{ visible?: boolean }>` position:fixed; top:0; right:0; bottom:0; left:0; z-index:9999;
  background:rgba(0,0,0,0.9);
  ${p => !p.visible &&`
    opacity:0;
    pointer-events:none;
  `}
`

const Pressable = styled(m.PressableOnBlack)` transition: transform 200ms;
  &:hover{ transform: scale(1.1); transition: transform 200ms; }
`