import React, { useRef } from 'react'
// import YouTube from 'react-youtube'

import { Loader } from '@gowiki/web'

import styled from 'styled-components'
import { Box, c } from 'styles'

const opts = {
  playerVars: {
  autoplay: 1,
  modestbranding: 1,
  loop: 1,
  rel: 0,
  showinfo: 0,
  },
}

type Props = {
  onReady: (event) => void
  onEnd: (event) => void
}

export default function Youtube(props: Props) {
  const { onReady, onEnd } = props

  return (
    <div style={{
      position: 'relative',
      paddingBottom: '56.25%',
      width: '100%',
      height: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <Loader pabs color={c.white} bottom='50%' mt={-20} zi={200} />
      <StyledYouTube /*videoId="w-jalheV2dU" opts={opts} onReady={onReady} onEnd={onEnd}*/ />
    </div>
  )
}

const StyledYouTube = styled(Box)`
  position:absolute; border-radius:6px; top:0; left:0; width:100%; height:100%; z-index:999;
`

