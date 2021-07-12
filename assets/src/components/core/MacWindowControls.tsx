import { darken } from 'polished'
import * as React from 'react'

import { getOS, getPlatform } from '@gowiki/core'

import { alpha } from 'utils/colorize'

import styled, { css } from 'styled-components'
import { BoxProps, c, m, Row, s } from 'styles'

const colors = {
  close: '#FC615D',
  closeDark: '#4C0102',
  minimize: '#FEC041',
  minimizeDark: '#985712',
  maximize: '#34C84A',
  maximizeDark: '#0A640C'
}

type Props = {
  closeClick?: () => void
  fullscreenClick?: () => void
  colored?: boolean
} & BoxProps

type State = {
  altIsPressed: boolean
}

export default class MacWindowControls extends React.PureComponent<Props, State> {
  state: State = {
    altIsPressed: false
  }

  render() {
    const { colored } = this.props
    if (getPlatform() != 'mac-app') return null

    const { altIsPressed } = this.state
    return (
      <Wrapper pabs mb={4} ml={m.units.sidebar.padding-2} colored={colored} {...this.props}>
        <Circle className="closeWindow" mr={8} onClick={this.close}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* tslint:disable-next-line:max-line-length */}
            <path
              d="M7.18198 1.52512L6.47487 0.818016L4 3.29288L1.52513 0.818016L0.818024 1.52512L3.29289 3.99999L0.818008 6.47487L1.52512 7.18198L4 4.70709L6.47488 7.18198L7.18199 6.47487L4.70711 3.99999L7.18198 1.52512Z"
              fill={colors.closeDark}
            />
          </svg>
        </Circle>

        <Circle className="minimize" mr={8} onClick={this.minimze}>
          <svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5H0V0.5H8V1.5Z" fill={colors.minimizeDark} />
          </svg>
        </Circle>

        <Circle className="maximize" onClick={this.maximize}>
          {altIsPressed ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* tslint:disable-next-line:max-line-length */}
              <path
                d="M5.50001 1.18199H4.5V4.68198H1.00001V5.68198H4.5L4.5 9.18199H5.5V5.68198H9.00001V4.68197L5.50001 4.68198V1.18199Z"
                fill={colors.maximizeDark}
              />
            </svg>
          ) : (
              <svg width="6" height="6" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3L9 12H2C0.89543 12 0 11.1046 0 10V3Z" fill={colors.maximizeDark} />
                <path d="M12 9L3 0H10C11.1046 0 12 0.895431 12 2V9Z" fill={colors.maximizeDark} />
              </svg>
            )}
        </Circle>
      </Wrapper>
    )
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  }

  handleKeyDown = e => {
    const { altIsPressed } = this.state
    if (!altIsPressed && e.altKey) this.setState({ altIsPressed: true })
  }

  handleKeyUp = e => {
    const { altIsPressed } = this.state
    if (altIsPressed && !e.altKey) this.setState({ altIsPressed: false })
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  close = () => {
    if (this.props.closeClick) return this.props.closeClick()
  }

  minimze = () => {}

  maximize = e => {
    if (this.props.fullscreenClick) return this.props.fullscreenClick()
  }
}

const coloredStyles = css`
  .closeWindow {
    background: ${colors.close};
    box-shadow: inset 0 0 0 0.5px ${darken(0.15, colors.close)};
  }
  .minimize {
    background: ${colors.minimize};
    box-shadow: inset 0 0 0 0.5px ${darken(0.15, colors.minimize)};
  }
  .maximize {
    background: ${colors.maximize};
    box-shadow: inset 0 0 0 0.5px ${darken(0.15, colors.maximize)};
  }
`

const Wrapper = styled(Row)<{ colored?: boolean }>`
  user-select: none;
  top:8px;
  left: 0;
  ${p => p.colored && coloredStyles}
  &:hover {
    ${coloredStyles}
    svg {
      display: block;
    }
  }
`

const Circle = styled(m.Circle).attrs({ size: 12, center: true })`
  box-shadow: inset 0 0 0 1px ${p => (p.theme ? p.theme.ink05 : c.black05)};
  background: ${p => (p.theme ? p.theme.ink10 : c.black10)};
  svg {
    display: none;
  }
`
