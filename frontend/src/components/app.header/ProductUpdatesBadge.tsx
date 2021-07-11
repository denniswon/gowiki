import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { API } from '@gowiki/api'
import { appService } from '@gowiki/app'
import { logger } from '@gowiki/core'
import { Icon } from '@gowiki/web'

import ErrorBoundary from 'components/global/ErrorBoundary'
import Popover from 'components/global/Popover'
import PopoverMenu, { PopoverDivider } from 'components/popovers/PopoverMenu'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

const PRODUCT_UPDATES_URL = 'https://blog.tandem.chat/tag/product-updates/'

type Post = {
  title: string
  url: string
  published_at: string
}

const LS_LATEST_READ_UPDATE = 'ls-latest-read-update'

const saveLatestReadTimestamp = (latestReadTimestamp: string) => {
  localStorage.setItem(LS_LATEST_READ_UPDATE, latestReadTimestamp)
}
const getLatestReadFromLocalStorage = (): string => {
  return localStorage.getItem(LS_LATEST_READ_UPDATE)
}


export default function ProductUpdatesBadge() {
  const posts = useGetPosts()
  const [latestReadTimestamp, setLatestReadTimestamp] = useState<string>(getLatestReadFromLocalStorage())

  if (!posts.length) return null

  const unread = latestReadTimestamp ? posts.filter(i => i.published_at > latestReadTimestamp).length : posts.length
  const hasUnreads = unread > 0

  const onSetLatestRead = () => {
    const latestReadDate = posts?.[0].published_at
    setLatestReadTimestamp(latestReadDate)
    saveLatestReadTimestamp(latestReadDate)
  }

  const onHide = () => {
    onSetLatestRead()
  }

  const popoverContent = (
    <PopoverMenu large mh={8} pb={4}>
      <Row>
        <m.T15 semi>Product Updates ✨</m.T15>
      </Row>
      <PopoverDivider mb={4} />

      {posts.map((post, key) => <Item post={post} latestReadTimestamp={latestReadTimestamp} key={key} />)}
      <m.Pressable color={c.highlight} row vCenter p={8} ph={12} pr={6} mh={-12}
        onClick={() => appService.openUrl(PRODUCT_UPDATES_URL)}
      >
        <m.T14 medium>See all</m.T14>
        <Icon size={16} name='chevron_right' ml={4} />
      </m.Pressable>
    </PopoverMenu>
  )

  return (
    <ErrorBoundary silent={!IS_DEV}>
      {/* <SimpleTooltip content='Latest Updates ✨' placement='left'> */}
        <Popover content={popoverContent} placement='bottom' mr={6} onHide={onHide}>
          <m.Pressable row vCenter p={8} br={20}>
            <Badge minw={9} minh={9} p={hasUnreads ? '3px 6px 2px 6px' : ''} read={!hasUnreads}>
              {hasUnreads ? unread : null}
            </Badge>
          </m.Pressable>
        </Popover>
      {/* </SimpleTooltip> */}
    </ErrorBoundary>
  )
}

const Item = ( props: { post: Post, latestReadTimestamp: string} ) => {
  const { post, latestReadTimestamp } = props
  const { url, title, published_at } = post

  const read = new Date(published_at) <= new Date(latestReadTimestamp)
  const relativeDate = moment(published_at).fromNow()

  return <>
    <m.Pressable row vCenter p={8} ph={12} pr={6} mh={-12} onClick={() => appService.openUrl(url)}>
      <Box sz={6} center mr={8} asfs mt={5}>
        <Badge sz={read ? 4 : 6} read={read} />
      </Box>
      <m.T13 medium flex1 mr={12}>{title}</m.T13>
      <m.T12 op={0.4} asfs mt={1} >{relativeDate}</m.T12>
    </m.Pressable>
    <PopoverDivider mv={4} />
  </>
}


const Badge = styled(Box)<{ read?: boolean }>`
  border-radius: 40px;
  color: ${p => p.theme.highlightText};
  ${m.t12} ${m.tBold}
  background:${p => p.read ? p.theme.ink30 : p.theme.highlight};
`

function useGetPosts(): Post[] {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    API.productUpdates().then(response => setPosts(response.posts))
  }, [])

  return posts
}