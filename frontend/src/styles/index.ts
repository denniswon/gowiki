import { m as commonMain, text, themes } from '@gowiki/styles'

import { createGlobalStyle } from 'styled-components'

export { Box, Column, Row, s } from '@gowiki/styles-global'
export type { BoxProps } from '@gowiki/styles-global'

import { primitives } from '@gowiki/web'

import styled, { css } from 'styled-components'
import * as mainStyles from './main'

export const m = {
  ...commonMain,
  ...mainStyles,
  ...primitives,
  themes,
}

export { c } from '@gowiki/styles'

// Global
export const GlobalStyles = createGlobalStyle<{ isLanding?: boolean }>`
  ${text.globalTextStyles}
  ${primitives.globalInputStyles}

  #react-app{ display:flex; flex-direction:column; }
  .app-dragging { -webkit-app-region:drag; user-select:none; }
  .app-non-dragging { -webkit-app-region: no-drag }
  input, button, select, textarea { -webkit-app-region: no-drag; }
  .Toastify__toast--warning { color: #333333 }
  .Toastify__toast-body { white-space: pre-line }

  .ReactModalPortal > * {
    opacity: 0;
  }

  .ReactModal__Overlay { z-index:${mainStyles.zIndex.modal}; }

  .ReactModal__Content{ transform: translateY(50px) !important; }

  .ReactModal__Overlay--after-open{ opacity: 1; }
  .ReactModal__Overlay--before-close{ opacity: 0; }


  .ReactModal__Content--after-open{ transform: translateY(0px) !important; }
  .ReactModal__Content--before-close{ transform: translateY(50px) !important; }

  #script-error { display: none !important; }

`