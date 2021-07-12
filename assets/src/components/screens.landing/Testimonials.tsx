import React from 'react'

import loveWallImg from 'images/landing/wall-of-love.png'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

type Props = {}

const Testimonials: React.FunctionComponent<Props> = (props: Props) => {
  const {} = props

  return (
    <Column center>
      <TestimonialsWrapper w="100%" overflow="auto">
        <m.Img w={934} h={585} ph={24} src={loveWallImg} style={{ pointerEvents: 'none' }} />
      </TestimonialsWrapper>

      <m.ResponsiveRow hCenter mt={40}>
        <a
          href="https://www.producthunt.com/posts/tandem-1d3ba275-7ccf-4074-bff0-d1ad006ba53b?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-tandem-1d3ba275-7ccf-4074-bff0-d1ad006ba53b"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=160709&theme=dark&period=daily"
            alt="Tandem - A virtual office for remote & distributed teams | Product Hunt Embed"
            style={{ width: 250, height: 54, marginRight: 20 }}
            width="250px"
            height="54px"
          />
        </a>
        <a
          href="https://www.producthunt.com/posts/tandem-1d3ba275-7ccf-4074-bff0-d1ad006ba53b?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tandem-1d3ba275-7ccf-4074-bff0-d1ad006ba53b"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=160709&theme=dark"
            alt="Tandem - A virtual office for remote & distributed teams | Product Hunt Embed"
            style={{ width: 250, height: 54 }}
            width="250px"
            height="54px"
          />
        </a>
      </m.ResponsiveRow>
    </Column>
  )
}

export default Testimonials

const TestimonialsWrapper = styled(Box)`
  ${s.jcc} ${s.media.lg` ${s.jcfs}`}
`
