import { lighten, shade } from 'polished'
import * as React from 'react'

import { Loader } from '@gowiki/web'

import styled, { keyframes } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  style?: React.CSSProperties
  onClick?: () => void
  isActive?: boolean
} & BoxProps

type State = {
  isLoading: boolean
  hasUnread: boolean
}

export default class HelpButton extends React.PureComponent<Props, State> {
  state: State = {
    isLoading: false,
    hasUnread: false
  }

  render() {
    const { isActive, ...rest } = this.props
    const { hasUnread } = this.state

    return (
      <Box sz={42} {...rest}>
        <Button onClick={this.onClick} isActive={isActive} center>
          {hasUnread && <m.Circle size={14} pabs right={-2} top={-2} bg={c.red} />}
          {this.state.isLoading ? (
            <Loader color={c.ink} size={18} />
          ) : (
            <m.T18 semi>
              ?
            </m.T18>
          )}
        </Button>
      </Box>
    )
  }

  onClick = () => {
    if (this.props.onClick) return this.props.onClick()
    // intercom.toggle(this.onIntercomShows)
    // if (!intercom.isInitialized) this.setState({ isLoading: true })
    this.setState({ hasUnread: false })
  }

  onIntercomShows = () => {
    this.setState({ isLoading: false })
  }
}

export const CornerHelpButton = (p: Props) => <HelpButton pos='fixed' right={16} bottom={16} {...p} />


const Button = styled(Box)<{ isActive?: boolean }>`
  width: 100%;
  height: 100%;
  ${s.unselectable}
  ${s.anchor} transition:300ms;
  border-radius: 100px;
  background:${p => lighten(0.05, p.theme.background)};
  color: ${p => p.theme.ink};
  transition: 140ms ease-in-out;
  box-shadow: inset 0px 0px 0px 1px ${p => p.theme.ink05}, rgba(0, 0, 0, 0.1) 0px 2px 6px;
  &:hover {
    transform: scale(1.05);
    transition: 100ms;
    background:${p => p.theme.highlight};
    color:${p => p.theme.highlightText};
  }

  ${p => p.isActive && `
    background:${p => p.theme.ink10};
  `}
  transition: box-shadow 100ms ease, border-color 100ms ease, transform 100ms ease;
  ${s.media.md` width:42px; height:42px; right:18px; `}
`
