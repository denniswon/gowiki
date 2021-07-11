import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { spaceScale } from '@gowiki/styles-global'
import { CloseButton, Icon } from '@gowiki/web'

import ScreenMeta from 'components/core/ScreenMeta'

import styled, { css } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

interface Props extends BoxProps {
  onClickClose?: (e?: MouseEvent) => void
  backPath?: string
  title: string
  titleComponent?: React.ReactNode
  withBorder?: boolean
  sticky?: boolean
  className?: string
}

export default function ModalHeader(props: Props) {
  const { center, backPath, onClickClose, title, titleComponent, withBorder, sticky, className, ...rest } = props

  const backComponent = !backPath ? null : (
    <Link to={backPath}>
      <m.Pressable p={12}>
        <Icon name='back' mr={4} />
      </m.Pressable>
    </Link>
  )
  return <>
    <Wrapper jcsb sticky={sticky} {...rest} prel>
      <ScreenMeta title={title} />

      <TitleRow prel>
        {backComponent}
        <Box center={center} flex={1} mh={center ? 28 : 0}>
          {titleComponent || <ModalHeaderTitleText tCenter={center}>{title}</ModalHeaderTitleText>}
        </Box>
        {onClickClose && <CloseButton onClick={onClickClose} />}
      </TitleRow>

      {withBorder && (
        <Box prel>
          <BorderBottom />
        </Box>
      )}
    </Wrapper>
  </>
}

export const ModalHeaderTitleText = p => <m.T18 semi {...p} />

const Wrapper = styled(Column)<{ withBorder?: boolean, sticky?: boolean }>`
  user-select: none;
  z-index: 1;
  width: 100%;
  color: ${c.black};
  ${s.media.sm` border-radius:0;`}
  ${p => p.sticky && css`
    position: sticky;
    top: 0;
    &.scrolled {
      border-bottom: 1px solid ${c.black10};
    }
  `}
`
const BorderBottom = styled(m.Divider)` ${s.pabs} left:-${m.units.modal.padding}px; right:-${m.units.modal.padding}px;  `

const TitleRow = styled(Box)`
  padding: ${m.units.modal.padding}px;
  padding-bottom:${m.units.modal.padding/2}px;
  background:white;
  width:100%;
`
