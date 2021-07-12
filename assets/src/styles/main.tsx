import * as React from 'react'

import 'tippy.js/dist/themes/light.css'

import { c, m, text as t, themes } from '@gowiki/styles'
import { Box, BoxProps, Column, Row, s } from '@gowiki/styles-global'
import { primitives } from '@gowiki/web'

import { textarea } from './textarea'

import styled from 'styled-components'

/** Spacing/Dimension variables for the ui */
export const units = {
  app: {
    padding: 20,
  },
  osBorderRadius: 4.5,
  avatarRounding: 4,
  borderRadius: {
    contactRow: 4,
  },
  videoRounding: 4,
  appHeader: 78,
  landing: {
    width: 1080
  },
  settings: {
    padding: 20
  },
  auth: {
    width: 1080
  },
  callBox: {
    padding: 8,
    rounding: 4.5
  },
  sidebar: {
    /** @deprecated use units.app.padding */
    padding: 20,
    width: 280,
    icon: 20,
    iconBox: 18,
    iconPadding: 6,
    headingOp: 0.45,
    labelOp: 0.9,
    roomSpace: 8
  },
  doc: {
    width: 700
  },
  rounding: 6,
  tooltip: {
    borderRadius: 6
  },
  popover: {
    icon: 18,
    iconPadding: 8,
    padding: {
      default: 8,
      large: 16,
    }
  },
  modal: {
    padding: 16,
  },
  detailsPane: {
    padding: 20
  }
}

export const zIndex = {
  default: 0,
  onTopOfDoc: 2,
  callPanelMini: 2,
  docLoader: 5,
  contactAction: 50,
  fullscreenOverlay: 90,
  callPanel: 100,
  intercom: 150,
  helpButton: 200,
  bottomModal: 250,
  callFeedback: 300,
  modal: 500,
  popover: 1000,
  rockets: 10000,
  call: {
    reactions: 100,
  }
}

export const shadows = {
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
}
export const callPanelShadow = `0px 2px 20px rgba(0, 0, 0, 0.15), 0px 1px 6px rgba(0, 0, 0, 0.2)`
export const layerShadow = `0px 8px 16px rgba(0, 0, 0, 0.25);`

//Layout
export const Overlay = styled(Box).attrs({ className: 'overlay' })<{ zIndex?: number; touchable?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, ${p => p.op || 1});
  opacity: 1;
  z-index: ${p => p.zIndex || zIndex.default};
  pointer-events: ${p => (p.touchable ? 'auto' : 'none')};
`

export const AuthCard = styled(Column)`
  padding: ${p => p.p || 40};
  background: ${c.white};
  border-radius: 8px;
  border: 1px solid ${c.black10};
  ${s.media.sm` padding:20px; `}
`

// Sidebar

export const SideBarHeading = styled(t.T12).attrs<BoxProps>({ upcase: true, op: units.sidebar.headingOp, multiLineEllipsis: 2 })`
  font-weight: 650;
  letter-spacing: 0.04em;
`

export const SideBarSubHeading = styled(t.T13).attrs({})<BoxProps>`
  ${t.tMedium}
  display: block;
  opacity: 0.4;
`

export const SideBarItemText = styled(t.T14).attrs({})<BoxProps>`
  transition-property: opacity display;
  display: block;
  ${t.tMedium}
`

export const Ellipsize = styled(Box)`
  ${s.ellipsis}
`

export const SidebarIconBox = p => (
  <Box w={units.sidebar.iconBox} minw={units.sidebar.iconBox} center mr={units.sidebar.iconPadding} {...p} />
)

export const SidebarActionText = styled(t.T14).attrs({ semi: true })<BoxProps>``

export const Heading = styled(t.T16).attrs({ pl: units.sidebar.padding })`
  ${t.tMedium} opacity:0.6;
  user-select: none;
`

export const RecordingTimeStamp = styled(t.T14)`
  ${t.tMedium}
`

export const RadialSkrim = styled(Box)`
  ${s.pabs} ${s.full}
  background:radial-gradient( circle  at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.2) 100%);
  user-select: none;
`

export const ResponsiveRow = styled(Box).attrs({ display: 'flex', flexDirection: ['column', 'row'] })``

export const EnvironmentRibbon = styled(Box)`
  width: 100%;
  height: 36px;
  ${s.pabs} top:0;
  left: 0;
  right: 0;
  pointer-events: none;
  background: repeating-linear-gradient(45deg, ${p => p.color}, ${p => p.color} 10px, ${c.black} 10px, ${c.black} 20px);
  opacity: 0.4;
`

export const Badge = styled(t.T10)`
  ${t.tBold};
  padding: 2px 4px;
  background: ${p => p.color};
  border-radius: 2px;
  color: ${c.white};
`
/**
 * @deprecated Use PopoverOption instead
 */
export const PopoverPressable = styled(primitives.Pressable).attrs((p: {
  pl?: number, pr?: number, ph?: number, pv?: number, minh?: number, iconOp?: number, br?: number, disabled?: boolean
}) => ({
  vCenter: true,
  row: true,
  pl: p.pl || p.ph || 8,
  pr: p.pr || p.ph || 8,
  minh: p.minh || 34,
  pv: p.pv || 6,
  iconOp: p.iconOp || 1,
  br: p.br || 4,
  disabled: p.disabled || false,
  hoverBg: c.ink10,
  ...p,
}))`
  .icon{ color:${p => p.color || p.theme.ink70}; }
  .text{ ${t.t14} ${t.tMedium} color: ${p => p.color || p.theme.ink90};  }
`

// Settings
export const SettingsTitle = styled(t.T15).attrs({ semi: true })`
  line-height: 130%;
`
export const SettingsDesc = styled(t.T14).attrs({ op: 0.6, mt: 4, lh: 20 })`
  line-height: 130%;
`

export const WindowFrame = styled(Box)` ${s.pabs} ${s.full}
  pointer-events:none;
  box-shadow:inset 0 0 0 0.5px black, inset 0 0 0 1px ${c.getColor(c.white, 15)};
  border-radius: ${units.osBorderRadius+1}px;
`

export const InputLabel = styled.label.attrs({ mb: 8 })` ${s.boxProps} ${s.flex}
  ${t.t15} ${t.tSemi} opacity:0.8;
  cursor: pointer;
`

export const Label = styled.label` ${s.boxProps} `

export const Sticky = styled(Box)` position: sticky; ${s.boxProps} `

export const Textarea = textarea
