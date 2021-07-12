import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'

import { Box, BoxProps, Column, Row } from '@gowiki/styles-global'
import { Icon } from '@gowiki/web'

import styled from 'styled-components'
import { c, m } from 'styles'

import ListBadges from './ListBadges'

export const DEFAULT_LIST_ITEM_HEIGHT = 34

export type ListProps = {
  data?: ListItemProps[]
  height?: number,
  maxHeight?: number,
  rowHeight?: number,
  listItemComponent?: React.ReactNode
  style?: React.CSSProperties
}

export default function List(props: ListProps) {
  const {
    data,
    height: heightProp,
    rowHeight: rowHeightProp,
    maxHeight: maxHeightProp,
    listItemComponent: ListItem = VirtualizedListItem,
    style,
  } = props

  const rowHeight = rowHeightProp || DEFAULT_LIST_ITEM_HEIGHT
  const containerHeight = heightProp || (Math.min(Number(maxHeightProp), data.length * rowHeight))

  return (
    <Column style={{ height: containerHeight, ...style }}>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <FixedSizeList height={height} width={width} itemCount={data.length} itemSize={rowHeight} itemData={data}>
              {ListItem}
            </FixedSizeList>
          )
        }}
      </AutoSizer>
    </Column>
  )
}

const VirtualizedListItem = ({ index, data }) => {
  return <ListItem {...data[index]} />
}

export type ListItemProps = {
  item: any
  value?: any
  iconName?: string
  subMessage?: string
  onClick: (item: any) => void
  badges: any
  rowProps?: any
}

export function ListItem(data: ListItemProps) {

  const { rowProps, item, iconName, value, subMessage, badges, onClick } = data

  function handleClick() {
    onClick(item)
  }

  return (
    <Row vCenter pointer onClick={handleClick} h={DEFAULT_LIST_ITEM_HEIGHT} {...rowProps}>
      {iconName ? <Icon name={iconName} mr={7} size={16} color={c.black70} /> : null}
      <m.T14 medium ellipsize>
        {value}
      </m.T14>
      <m.T13 color={c.black40} medium ellipsize  mt={1} ml={6}>
        {subMessage ? subMessage : null}
      </m.T13>
      <Box flex1 />
      <ListBadges badges={badges} ml={8} />
    </Row>
  )
}