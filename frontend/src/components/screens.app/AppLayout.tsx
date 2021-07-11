import * as React from 'react'
import Helmet from 'react-helmet'
import { appService } from 'services'

import { useSettingsStore } from '@gowiki/app'
import {
  isMobile, Themes
} from '@gowiki/core'

import Theme from 'components/global/Theme'
import { DETAILS_PANE_WIDTH, useUIStore } from 'stores/uiStore'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  customControls?: boolean
  children: any
  className?: string
  onMouseLeave?: () => void
} & BoxProps

const AppLayout: React.FunctionComponent<Props> = (props: Props) => {
  const { customControls, children, ...rest } = props
  const [detailsPane, updateDetailPaneWidth] = useUIStore(state => [state.detailsPane, state.actions.updateDetailPaneWidth])
  const userTheme = useSettingsStore(state => state.theme)

  React.useEffect(() => {
    const onResize = () => {
      updateDetailPaneWidth()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [detailsPane])

  const theme = userTheme == Themes.DARK ? m.themes.darkBackground : m.themes.whiteBackground

  if (isMobile) return <Theme theme={theme} h="100%">
    <Wrapper h="100%" w="100%" {...rest}>
      <Helmet title="Tandem" />
      <AppWrapper>
        {children}
      </AppWrapper>
    </Wrapper>
  </Theme>

  return (
    <Theme theme={theme} h="100%">
      <Wrapper h="100%" w="100%" {...rest}>
        <Helmet title="Tandem" />
        <DetailWrapper id='detail-wrapper'>
          <AppWrapper style={{ maxWidth: detailsPane?.baseWidth || '100%',
              flexGrow: detailsPane ? 0 : 1,
              flexBasis: detailsPane?.baseWidth,
          }}>
            <VerticalLine />
            {children}
          </AppWrapper>
        </DetailWrapper>
      </Wrapper>
    </Theme>
  )
}

export default AppLayout

const Wrapper = styled(Column)`
  -webkit-user-select: none;
  overflow: hidden;
`

const DetailWrapper = styled(Row)`
  width: 100%;
  height: 100%;
  background: ${p => p.theme.detailsBackground};
`

const lightShadow = `
  10px 0px 32px 0px rgba(0,0,0,0.05),
  4px 0px 12px 0px rgba(0,0,0,0.05),
  1px 0px 4px 0px rgba(0,0,0,0.05)
`

const AppWrapper = styled(Column)`
  position:relative;
  height: 100%;
  box-shadow: ${lightShadow};
  z-index: 1;
  flex-shrink: 0;
  background: ${p => p.theme.background};
`
const VerticalLine = styled(Box)`
  width:1px;
  height:100%;
  position: absolute;
  top:0;
  bottom:0;
  right:-1px;
  background:${p => p.theme.ink10};
  z-index:1;
`