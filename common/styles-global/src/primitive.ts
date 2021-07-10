import { css } from 'styled-components'
import { s } from './global-styles'

import * as styledSystem from './styledSystems'
import {
    BoxProps, QuickFlexProps, QuickPositionProps, QuickTypographyProps, QuickUtilityProps
} from './types'

const defaultBreakpoints = [576, 768, 992, 1200]

const quickFlexProps = css<QuickFlexProps>`
	${(p) => (p.jcc ? s.jcc : '')}
	${(p) => (p.jcsa ? s.jcsa : '')}
	${(p) => (p.jcsb ? s.jcsb : '')}
	${(p) => (p.jcfs ? s.jcfs : '')}
	${(p) => (p.jcfe ? s.jcfe : '')}

	${(p) => (p.aic ? s.aic : '')}
	${(p) => (p.aifs ? s.aifs : '')}
	${(p) => (p.aife ? s.aife : '')}
	${(p) => (p.aib ? s.aib : '')}


	${(p) => (p.ass ? s.ass : '')}
	${(p) => (p.asfs ? s.asfs : '')}
	${(p) => (p.asfe ? s.asfe : '')}
	${(p) => (p.asc ? s.asc : '')}

	${(p) => (p.jss ? s.jss : '')}
	${(p) => (p.jsfs ? s.jsfs : '')}
	${(p) => (p.jsfe ? s.jsfe : '')}
  ${(p) => (p.jsc ? s.jsc : '')}

  ${(p) => (p.center ? `${s.aic} ${s.jcc}` : '')}

	${(p) => (p.column || p.col ? s.flxCol : '')}
  ${(p) => (p.row ? s.flxRow : '')}

  ${(p) => (p.hCenter && (p.col || p.column) ? s.aic : '')}
  ${(p) => (p.vCenter && (p.col || p.column) ? s.jcc : '')}

  ${(p) => (p.hCenter && p.row ? s.jcc : '')}
  ${(p) => (p.vCenter && p.row ? s.aic : '')}

	${(p) => (p.flxWrap ? s.flxWrap : '')}
	${(p) => (p.flxOrder ? `display:flex; order:${p.flxOrder};` : '')}
	${(p) => (p.flex && `display:flex; ${typeof p.flex == 'number' && `flex:${p.flex};`}`)}
  ${(p) => (p.flex1 ? `display:flex; flex: 1 1 0%;` : '')}
`

const quickPositionProps = css<QuickPositionProps>`
	${(p) => (p.pabs ? s.pabs : '')}
	${(p) => (p.prel ? s.prel : '')}
	${(p) => (p.pfix ? `position: fixed;` : '')}
`

const quickUtilityProps  = css<QuickUtilityProps>`
  ${(p) => (p.pointer && `cursor:pointer;`)}
  ${(p) => (p.cursor && `cursor:${p.cursor};`)}
`

// Box Props
export const boxProps = css<BoxProps>`
  ${styledSystem.systemBox}
	${quickFlexProps}
  ${quickPositionProps}
  ${quickUtilityProps}
  `

// ------------------------------------------

// TextProps

const quickTypographyProps = css<QuickTypographyProps>`
  ${(p) => (p.light ? `font-weight:300;` : '')}
  ${(p) => (p.regular ? `font-weight:400;` : '')}
  ${(p) => (p.medium ? `font-weight:500;` : '')}
  ${(p) => (p.semi ? `font-weight:600;` : '')}
  ${(p) => (p.bold ? `font-weight:700;` : '')}
  ${(p) => (p.extraBold ? `font-weight:800;` : '')}
  ${(p) => (p.black ? `font-weight:900;` : '')}

  ${(p) => (p.tal ? `text-align:left;` : '')}
  ${(p) => (p.tac ? `text-align:center;` : '')}
  ${(p) => (p.tar ? `text-align:right;` : '')}

  ${(p) => (p.upcase ? `text-transform:uppercase;` : '')}
`
export const textProps = css<styledSystem.TypographyProps & QuickTypographyProps>`
  ${quickTypographyProps}
  ${styledSystem.typography}
`
