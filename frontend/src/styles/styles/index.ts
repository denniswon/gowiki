import { createGlobalStyle } from 'styled-components'

import colors, { themedColorVariables, themes } from './colors'
import * as main from './main'
import * as text from './text'

export const m = {
  ...text,
  ...main,
  themes,
}

export type { TextComponentProps } from './text'
export { fontWeights } from './text'
export { text }

// Global
export const GlobalStyles = createGlobalStyle`
  ${text.globalTextStyles}

  .app-dragging { -webkit-app-region:drag; user-select:none; }
  .app-dragging > * { -webkit-app-region: no-drag; cursor:inherit; }
  input, button, select, textarea { -webkit-app-region: no-drag; }
`

export const c = {
  ...colors,
  ...themedColorVariables,
}

export { Box, Column, Row, s } from 'styles-global'
export type { BoxProps } from 'styles-global'

