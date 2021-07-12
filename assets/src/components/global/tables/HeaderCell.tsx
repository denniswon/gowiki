import * as React from 'react'

import { Icon } from '@gowiki/web'

import styled from 'styled-components'
import { BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  left?: boolean
  right?: boolean
  center?: boolean
  title: string
  sortable?: boolean
  style?: any
  className?: string
  size?: number
  bold?: boolean
} & BoxProps

const HeaderCell: React.SFC<Props> = props => {
  const { left, right, center, title, sortable, style, className, size, bold, ...rest } = props

  const sortableIcon = sortable ? <Icon name="arrow_drop_down" /> : null

  return (
    <Wrapper
      vCenter
      jcfs={left}
      hCenter={center}
      jcfe={right}
      style={style}
      className={className}
      sortable={sortable}
      {...rest}
    >
      {right && sortableIcon}
      <m.Text>{title}</m.Text>
      {!right && sortableIcon}
    </Wrapper>
  )
}

export default HeaderCell

const Wrapper = styled(Row)<{ sortable: boolean }>`
  opacity: 0.4;

  ${p => p.sortable && s.anchor}
  &:hover {
    opacity: 1;
    & .dropdown-icon {
      opacity: 0.5;
    }
  }
  &.-sort-asc .dropdown-icon {
    transform: rotate(180deg);
  }
`

HeaderCell.defaultProps = {
  sortable: true
}
