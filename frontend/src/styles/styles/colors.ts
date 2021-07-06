import { lighten, mix, rgba, setLightness, transparentize } from 'polished'

import { makeTheme, Theme, themeArrayToObject, Themes } from './theme'

const black = '#151C48'
const bodyBlack = '#282D36'
const white = 'white'

const baseColors = {
  rootBackground: black,
  beige: '#F3F0EC',
  pureBlack: '#000000',
  superBlack: '#0A0B0D',
  foreground: '#EEEEEE',
  largeCallBoxBackground: '#0A0A0B',
  callBoxBackground: '#101012',
  cornerCallBoxBackground: '#171719',
  callBoxPopoverBackground: '#27272A',
  darkGrey: '#212121',
  speakingColor: '#43b581',

  brand: '#4341DC',
  brand2: '#00B6B6',
  brandWordMark: '#364372',

  green: '#67C202',
  darkGreen: '#38ad00', // Used for green text on white
  darkPurple: '#431c53',
  greenOnBlack: '#35BA67', // Used for green text on white
  greenOnGreen: '#58ff97', // Used for green text on dim Green

  red: '#FF4C3B',
  redBadgeOnWhite: '#e23939',
  blue: '#307BFF',
  yellow: '#FFB930',
  orange: '#F29D1D',
  mustard: '#FFA722',

  transparent: rgba(black, 0.001),

  black: black,
  black95: rgba(black, 0.95),
  black90: rgba(black, 0.9),
  black85: rgba(black, 0.85),
  black80: rgba(black, 0.8),
  black70: rgba(black, 0.7),
  black65: rgba(black, 0.65),
  black60: rgba(black, 0.6),
  black50: rgba(black, 0.5),
  black40: rgba(black, 0.4),
  black35: rgba(black, 0.35),
  black30: rgba(black, 0.3),
  black20: rgba(black, 0.2),
  black15: rgba(black, 0.15),
  black10: rgba(black, 0.1),
  black05: rgba(black, 0.05),

  white0: rgba(white, 0),
  white05: rgba(white, 0.05),
  white10: rgba(white, 0.1),
  white15: rgba(white, 0.15),
  white20: rgba(white, 0.2),
  white25: rgba(white, 0.25),
  white30: rgba(white, 0.3),
  white40: rgba(white, 0.4),
  white50: rgba(white, 0.5),
  white60: rgba(white, 0.6),
  white70: rgba(white, 0.7),
  white80: rgba(white, 0.8),
  white90: rgba(white, 0.9),
  white: white,

  facebook: '#1877F2',
  twitter: '#1DA1F2',
  linkedin: '#0077B5',
  reddit: '#FF4500'
}

const c = {
  ...baseColors,

  speakingIndicator: '#FBFF4B',

  inCallChatBackground: baseColors.callBoxBackground,
  tooltipBackground: '#383847',

  status: {
    available: baseColors.green,
    inConversation: baseColors.blue,
    recording: baseColors.red,
    unavailable: {
      onBlack: baseColors.white30,
      onWhite: baseColors.black30
    }
  },

  matteBlack: amount => lighten(1 - amount, '#000'),

  body: {
    black: bodyBlack,
    black90: rgba(bodyBlack, 0.9),
    black80: rgba(bodyBlack, 0.8),
    black70: rgba(bodyBlack, 0.7),
    black60: rgba(bodyBlack, 0.6),
    black50: rgba(bodyBlack, 0.5),
    black40: rgba(bodyBlack, 0.4),
    black30: rgba(bodyBlack, 0.3),
    black20: rgba(bodyBlack, 0.2),
    black10: rgba(bodyBlack, 0.1)
  },

  sidebarBlack: baseColors.black60,

  purple: baseColors.brand,

  blue10: transparentize(0.9, baseColors.blue),
  blue15: transparentize(0.85, baseColors.blue),
  blue20: transparentize(0.8, baseColors.blue),
  blue30: transparentize(0.7, baseColors.blue),
  lightBlue: transparentize(0.88, baseColors.blue),
  lightPurple: transparentize(0.88, baseColors.brand),
  lightPurpleOpaque: '#E8E8FB', // TODO create a method that returns a non alpha color based on a background and amount
  lightGreen: transparentize(0.8, baseColors.green),
  lightTeal: transparentize(0.9, baseColors.brand2),
  lightYellow: transparentize(0.4, '#FFEB82'),
  darkYellow: '#7C4B00',

  getBlack: (amount: number) => transparentize(1 - amount / 100, baseColors.black),
  getBlue: (amount: number) => transparentize(1 - amount / 100, baseColors.blue),
  getRed: (amount: number) => transparentize(1 - amount / 100, baseColors.red),
  getGreen: (amount: number) => transparentize(1 - amount / 100, baseColors.green),
  getBrand: (amount: number) => transparentize(1 - amount / 100, baseColors.brand),
  getPurple: (amount: number) => transparentize(1 - amount / 100, baseColors.brand),
  getColor: (color: string, amount: number) => transparentize(1 - amount / 100, color),
  get: (color: string, amount: number) => transparentize(1 - amount / 100, color),

  getOpaqueOnWhite: (color: string, amount: number) => mix(amount / 100, color, 'white' ),
  getOpaqueOnBlack: (color: string, amount: number) => mix(amount / 100, color, baseColors.largeCallBoxBackground ),

  orange20: transparentize(0.8, baseColors.orange),
  orange40: transparentize(0.4, baseColors.orange),
  darkOrangeOnOrange20: '#D3770B',

  warning: baseColors.orange,
  error: baseColors.red,
  info: transparentize(0.9, baseColors.brand2),
  inputFocus: transparentize(0.8, baseColors.blue)
}

export const themedColorVariables = {
  ink:   'ink', 
  ink95: 'ink95', 
  ink90: 'ink90', 
  ink85: 'ink85', 
  ink80: 'ink80', 
  ink75: 'ink75', 
  ink70: 'ink70', 
  ink65: 'ink65', 
  ink60: 'ink60', 
  ink55: 'ink55', 
  ink50: 'ink50', 
  ink45: 'ink45', 
  ink40: 'ink40', 
  ink35: 'ink35', 
  ink30: 'ink30', 
  ink25: 'ink25', 
  ink20: 'ink20', 
  ink15: 'ink15', 
  ink10: 'ink10', 
  ink05: 'ink05',

  background: 'background',
  popoverBackground: 'popoverBackground',

  bgIdle: 'bgIdle',
  bgHover: 'bgHover',
  bgPressing: 'bgPressing',

  highlight: 'highlight',
  highlightText: 'highlightText',
  highlightHover: 'highlightHover',
  highlightPressing: 'highlightPressing',
}


const customThemes = {
  // Light Themes
  snow: ['#ffffff', '#F0F0F4', c.black, setLightness(0.10, c.black), c.brand, '#ffffff'],
  ochin: ['#fff', '#323E4C', c.black, setLightness(0.90, '#323E4C'), '#6698C8', '#ffffff'],

  // Dark Themes
  superBlack: ['black', 'black', setLightness(0.90, 'black'), setLightness(0.80, 'black'), 'white', '#000'],
  dark: ['#161618', '#0E0E11', setLightness(0.90, '#161618'), setLightness(0.80, '#161618'), c.brand, '#ffffff'],
  lushForest: ['#1F2929', '#161D1D', '#E2E9E9', '#C5D3D3', '#F9835A', '#4D2011'],
}

const defaultTheme = makeTheme(Themes.LIGHT, {
  background: c.white ,
  ink: c.black,

  detailsBackground: '#212125',
  detailsInk: c.white80,

  highlight: c.brand,
  highlightText: c.white ,

  bgIdle: '#F3F3F7',
  bgHover: '#DFE1EC',
  bgPressing: '#C8CCDF',
})

const darkTheme = makeTheme(Themes.DARK, themeArrayToObject(customThemes.dark))

export const themes: { whiteBackground: Theme, darkBackground: Theme } = {
  whiteBackground: defaultTheme,
  darkBackground: darkTheme,
}

export default {
  ...c,
  ...themedColorVariables,
}