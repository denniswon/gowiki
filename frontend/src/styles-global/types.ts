import { CSSProperties, Ref } from 'react'

import { StyledSystemPropsTypes } from './styledSystems'
import { MediaValues } from './utils'

//Partial<{ [Key in MediaValues]: string  }

export interface QuickTypographyProps {
  // Font Weight ---
  /** Font Weight: 300 */
  light?: boolean

  /** Font Weight: 400 */
  regular?: boolean

  /** Font Weight: 500 */
  medium?: boolean

  /** Font Weight: 600 */
  semi?: boolean

  /** Font Weight: 700 */
  bold?: boolean

  /** Font Weight: 800 */
  extraBold?: boolean

  /** Font Weight: 900 */
  black?: boolean

  // Alignment ---

  /** text-align: left */
  tal?: boolean

  /** text-align: right */
  tar?: boolean

  /** text-align: center */
  tac?: boolean

  /** text-transform: uppercase */
  upcase?: boolean
}

export type QuickFlexProps = {
  jcc?: boolean
  jcsa?: boolean
  jcsb?: boolean
  jcfs?: boolean
  jcfe?: boolean

  aic?: boolean
  aifs?: boolean
  aife?: boolean
  ass?: boolean
  asfs?: boolean
  asfe?: boolean
  asc?: boolean
  aib?: boolean

  jss?: boolean
  jsfs?: boolean
  jsfe?: boolean
  jsc?: boolean

  row?: boolean
  column?: boolean
  col?: boolean

  vCenter?: boolean
  hCenter?: boolean

  center?: boolean

  flxWrap?: boolean
  flex?: number | string
  flex1?: boolean
  flxOrder?: number
}

export type QuickPositionProps = {
  /** position: absolute */
  pabs?: boolean

  /** position: relative */
  prel?: boolean

  /** position: fixed */
  pfix?: boolean
}


export type QuickUtilityProps = {
  /** cursor: pointer */
  pointer?: boolean
  cursor?: 'default' | 'pointer'
}

type QuickPropsTypes = QuickTypographyProps &
  QuickFlexProps &
  QuickPositionProps

export type BoxProps = {
  center?: boolean
} & StyledSystemPropsTypes &
  QuickPropsTypes

export type GlobalStyles = {
  /** position: absolute; */
  pabs: string

  /** position: relative; */
  prel: string

  // Flex -----------------

  /** display: flex; */
  flex: string

  /** flex: 1 1 0%; display:flex; */
  flex1: string

  /** flex-direction: row; display:flex; */
  flxRow: string

  /** flex-direction: column; display:flex; */
  flxCol: string

  /** flex-direction: row-reverse; display:flex; */
  flxRowReverse: string

  /** flex-direction: column-reverse; display:flex; */
  flxColReverse: string

  /** */
  flxWrap: string

  // Align Items -----------------
  /** align-items: flex-start */
  aifs: string

  /** align-items: center */
  aic: string

  /** align-items: stretch */
  ais: string

  /** align-items: flex-end */
  aife: string

  /** align-items: baseline */
  aib: string

  // Justify Content -----------------
  /** justify-content: center  */
  jcc: string

  /** justify-content: flext-start */
  jcfs: string

  /** justify-content: flex-end */
  jcfe: string

  /** justify-content: space-between */
  jcsb: string

  /** justify-content: space-around */
  jcsa: string

  asfs: string
  asfe: string
  asc: string
  ass: string

  jsfs: string
  jsfe: string
  jsc: string
  jss: string

  if: string

  tal: string
  tac: string
  tar: string

  ofh: string

  cover: string
  contain: string

  anchor: string

  /** width:100%; height:100%; left:0; top:0; bottom:0; right:0; */
  full: string
  /** text-overflow: ellipsis; overflow: hidden; white-space: nowrap; */
  ellipsis: string
}

export type WebGlobalStyles = {
  size: (s: number) => string

  hideVisually: string
  actionable: string

  unselectable?: string
  untouchable?: string
  anim?: string
  mediaDimensions?: {
    sm: number
    md: number
    lg: number
  }

  media?: {
    sm: any
    md: any
    lg: any
    w: any
  }
}

export type MediaProps = {
  smHide?: boolean
  mdHide?: boolean
  lgHide?: boolean
}
