import { isMac } from '@gowiki/core'
import { Box, parseUnit, s } from '@gowiki/styles-global'

import styled, { css } from 'styled-components'

import c from './colors'

export const resetTextAttributes = css`
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
`

export const tExtraBold = css`
  font-weight: 900;
`
export const tBold = css`
  font-weight: 700;
`
export const tSemi = css`
  font-weight: 600;
`
export const tMedium = css`
  font-weight: 500;
`
export const tRegular = css`
  font-weight: 400;
`

export const t80 = css`
  font-size: 80px;
  line-height: 88px;
  ${tBold}
`
export const t48 = css`
  font-size: 48px;
  line-height: 56px;
  ${tBold}
`
export const t32 = css`
  font-size: 32px;
  line-height: 42px;
  ${tBold}
`
export const t28 = css`
  font-size: 28px;
  line-height: 36px;
  ${tBold}
`
export const t24 = css`
  font-size: 24px;
  line-height: 32px;
  ${tBold}
`
export const t22 = css`
  font-size: 22px;
  line-height: 28px;
  ${tRegular}
`
export const t20 = css`
  font-size: 20px;
  line-height: 24px;
  ${tRegular}
`
export const t18 = css`
  font-size: 18px;
  line-height: 22px;
  ${tRegular} letter-spacing:-0.02em;
`
export const t16 = css`
  font-size: 16px;
  line-height: 19px;
  ${tRegular}
`
export const t15 = css`
  font-size: 15px;
  line-height: 16px;
  ${tRegular}
`
export const t14 = css`
  font-size: 14px;
  line-height: 16px;
  ${tRegular}
`
export const t13 = css`
  font-size: 13px;
  line-height: 15px;
  ${tRegular}
`
export const t12 = css`
  font-size: 12px;
  line-height: 14px;
  ${tRegular}
`
export const t11 = css`
  font-size: 11px;
  line-height: 13px;
  ${tRegular}
`
export const t10 = css`
  font-size: 10px;
  line-height: 12px;
  ${tRegular}
`

const showFontFeatures = isMac && !navigator.userAgent.includes('Mac OS X 10_12')

export const globalTextStyles = css`
  html {
    ${t15} color:${c.black};
    ${showFontFeatures &&
      `
      font-feature-settings: 'calt' 1, 'tnum' 1, 'case' 0, 'ss02' 0;
      -webkit-font-feature-settings: 'calt' 1, 'tnum' 1, 'case' 0, 'ss02' 0;`}
    font-kerning:normal;
    text-rendering:geometricPrecision;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

export type TextComponentProps = {
  // Typography
  size?: number
  fs?: number
  lh?: number
  ls?: number | string

  // Font weight
  weight?: number
  bold?: boolean
  medium?: boolean
  semiMedium?: boolean
  semi?: boolean
  regular?: boolean

  paragraph?: boolean

  // Other Styles
  color?: string
  opacity?: number
  op?: number
  center?: boolean // Depracte, collides with boxProps layout centering
  tCenter?: boolean
  right?: boolean
  upcase?: boolean
  italic?: boolean
  underline?: boolean
  body?: boolean
  ellipsize?: boolean
  multiLineEllipsis?: boolean
  unselectable?: boolean
  inline?: boolean
}

const textProps = css<TextComponentProps>`
  ${p => (p.lh ? `line-height: ${parseUnit(p.lh)};` : '')}
  ${p => (p.ls ? `letter-spacing: ${parseUnit(p.ls)};` : '')}
  ${p => (p.opacity ? `opacity: ${p.opacity};` : '')}
  ${p => (p.op ? `opacity: ${p.op};` : '')}
  ${p => (p.color ? `color: ${p.color};` : '')}
  ${p => (p.center ? `text-align: center;` : '')}
  ${p => (p.tCenter ? `text-align: center;` : '')}
  ${p => (p.right ? `text-align: right;` : '')}
  ${p => (p.upcase ? `text-transform: uppercase;` : '')}
  ${p => (p.italic ? `font-style: italic;` : '')}
  ${p => (p.underline ? `text-decoration: underline;` : '')}
  ${p => (p.body ? `line-height: 140%;` : '')}
  ${p => (p.unselectable && `user-select: none;`)}

  ${p => p.size && textStyles[p.size]}
  ${p => p.fs && `font-size: ${p.fs};`}

  ${p => p.ellipsize && s.ellipsis}
  ${p => p.bold && tBold}
  ${p => p.medium && tMedium}
  ${p => p.semi && tSemi}
  ${p => p.regular && tRegular}
  ${p => p.weight && `font-weight:${p.weight};`}

  ${p => p.inline && `display: inline;`}

  ${p => p.paragraph && `line-height:${p.lh || '150%'};`}

  ${p =>
    p.multiLineEllipsis &&
    ` text-overflow:hidden; overflow:hidden; -webkit-box-orient: vertical; -webkit-line-clamp:${p.multiLineEllipsis}; display: -webkit-box; word-break: break-word;`}
`

export const T80 = styled(Box)<TextComponentProps>`
  ${t80} ${textProps}
`
export const T48 = styled(Box)<TextComponentProps>`
  ${t48} ${textProps}
`
export const T32 = styled(Box)<TextComponentProps>`
  ${t32} ${textProps}
`
export const T28 = styled(Box)<TextComponentProps>`
  ${t28} ${textProps}
`
export const T24 = styled(Box)<TextComponentProps>`
  ${t24} ${textProps}
`
export const T18 = styled(Box)<TextComponentProps>`
  ${t18} ${textProps}
`
export const T20 = styled(Box)<TextComponentProps>`
  ${t20} ${textProps}
`
export const T16 = styled(Box)<TextComponentProps>`
  ${t16} ${textProps}
`
export const T15 = styled(Box)<TextComponentProps>`
  ${t15} ${textProps}
`
export const T14 = styled(Box)<TextComponentProps>`
  ${t14} ${textProps}
`
export const T13 = styled(Box)<TextComponentProps>`
  ${t13} ${textProps}
`
export const T12 = styled(Box)<TextComponentProps>`
  ${t12} ${textProps}
`
export const T11 = styled(Box)<TextComponentProps>`
  ${t11} ${textProps}
`
export const T10 = styled(Box)<TextComponentProps>`
  ${t10} ${textProps}
`
export const BaseText = styled(Box)`
  ${textProps}
`

export const textStyles = {
  10: t10,
  12: t12,
  13: t13,
  14: t14,
  15: t15,
  16: t16,
  18: t18,
  20: t20,
  24: t24,
  28: t28,
  32: t32,
  48: t48,
  80: t80
}
export const textTags = {
  10: T10,
  12: T12,
  13: T13,
  14: T14,
  15: T15,
  16: T16,
  18: T18,
  20: T20,
  24: T24,
  28: T28,
  32: T32,
  48: T48,
  80: T80
}

export const Text = styled(Box).attrs({ className: 'text' })<TextComponentProps>`
  ${s.boxProps}
  ${textProps}

  strong {
    ${tBold}
  }
  em {
    font-style: italic;
  }
`

export const Strong = styled.strong<TextComponentProps>` ${s.boxProps} ${textProps} ${tBold} `

export const Code = styled.code` ${s.boxProps}
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
`
export const linkStyle = css`
  color: ${p => p.color || c.brand};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export const Anchor = styled.a`
  ${s.boxProps}
  ${linkStyle}
`

export const AnchorUnderline = styled.a`
  ${s.boxProps}
  text-decoration: underline; cursor: pointer;
  &:hover { opacity: 0.8 }
`

export const fontWeights = {
  regular: 400,
  medium: 500,
  semi: 600,
  bold: 700,
}