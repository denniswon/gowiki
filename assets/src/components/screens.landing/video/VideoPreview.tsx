import React, { useEffect, useRef, useState } from 'react'

import { Icon } from '@gowiki/web'

import LightboxVideo from 'components/screens.landing/video/LightboxVideo'
import videoPreviewMp4 from 'videos/landing_preview.mp4'

// import videoPreviewWebm from 'videos/landing_preview.webm'
import styled, { css } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  smallButton?: boolean
} & BoxProps

const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
}

export default function VideoPreview(props: Props) {
  const { smallButton, ...rest } = props

  return (
    <LightboxVideo>
      {({open}) =>
        <Wrapper prel center onClick={open} {...rest}>
          <VideoElement />
          <Box pabs top={0} right={0} bottom={0} left={0} center>
            <Button vCenter smallButton={smallButton} className='button' p={16} bg='black' br={6} color={c.white} bs='0 0 0 6px rgba(0,0,0,0.2)'>
              <Icon name='play_circle_filled' size={20} color='white' mr={12} prel top={1} />
              <m.Text semi>Watch why teams use Tandem</m.Text>
              <m.Text className='duration' semi op={0.5} ml={8}> 1:55</m.Text>
            </Button>
          </Box>
        </Wrapper>
      }
    </LightboxVideo>
  )
}


// as explained in: https://medium.com/@BoltAssaults/autoplay-muted-html5-video-safari-ios-10-in-react-673ae50ba1f5
const VideoElement = () => {
  const videoParentRef: any = useRef()
  const [shouldUseImage, setShouldUseImage] = useState(false)

  useEffect(() => {
    // check if user agent is safari and we have the ref to the container <div />
    if (isSafari() && videoParentRef.current) {
      // obtain reference to the video element
      const player = videoParentRef.current.children[0]

      // if the reference to video player has been obtained
      if (player) {
        // set the video attributes using javascript as per the
        // webkit Policy
        player.controls = false
        player.playsinline = true
        player.muted = true
        player.setAttribute("muted", "") // leave no stones unturned :)
        player.autoplay = true

        // Let's wait for an event loop tick and be async.
        setTimeout(() => {
          // player.play() might return a promise but it's not guaranteed crossbrowser.
          const promise = player.play()
          // let's play safe to ensure that if we do have a promise
          if (promise.then) {
            promise
              .then(() => {})
              .catch(() => {
                // if promise fails, hide the video and fallback to <img> tag
                if (videoParentRef.current) videoParentRef.current.style.display = "none"
                setShouldUseImage(true)
              })
          }
        }, 0)
      }
    }
  }, [])

  return shouldUseImage ? (
    <img src={videoPreviewMp4} alt="Muted Video" />
  ) : (

    <Video
      ref={videoParentRef}
      dangerouslySetInnerHTML={{
        __html: `
        <video width="100%" height='100%'
          loop
          muted
          autoplay
          playsinline
          preload="metadata"
        >
        <source src="${videoPreviewMp4}" type="video/mp4" />
        </video>`
      }}
    />
  )
}


const Wrapper = styled(Box)` cursor:pointer; transition:250ms all;
  width:100%; max-width:1080px; min-height:40px; padding-bottom:56.2962963%;
  background:#000; border-radius:10px;

  box-shadow: 0px 1.22278px 3.62304px rgba(14, 21, 55, 0.0801346), 0px 3.38082px 10.0172px rgba(14, 21, 55, 0.115), 0px 8.13971px 24.1177px rgba(14, 21, 55, 0.149865), 0px 27px 80px rgba(14, 21, 55, 0.23);

  &:hover{ transform: scale(1.005); transition:250ms all;
    .border{ opacity:1; }
    .button{ transform: scale(1.02); transition:200ms all; background:${c.brand}; }
    box-shadow: 0px 1.22278px 3.62304px rgba(14, 21, 55, 0.1801346), 0px 3.38082px 10.0172px rgba(14, 21, 55, 0.215), 0px 8.13971px 24.1177px rgba(14, 21, 55, 0.249865), 0px 27px 80px rgba(14, 21, 55, 0.33);
  }
`

const Video = styled.div` opacity:0.7; ${s.anim}

  video, img{ position:absolute; top:0; left:0; right:0; bottom:0; background:#000; border-radius:10px; overflow:hidden; }
`

const small = css` ${s.pabs} width:300px; bottom:-20px; .duration{ display:none; } `
const Button = styled(Row)<{ smallButton?: boolean }>` transition:200ms all; z-index:1;
  ${m.t20} line-height:1.3;
  ${s.media.md` font-size:16px; padding:12px; ${s.aic}  `}
  ${s.media.sm` ${small}  `}


  ${p => p.smallButton && ` ${small}
    font-size:16px; padding:12px; ${s.aic}

  `}
`