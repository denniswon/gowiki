import {
    getLuminance, hslToColorString, parseToHsl, readableColor, rgba, setLightness
} from 'polished'

import { clamp } from '@gowiki/core'

type ThemeColors = {
  background: string
  detailsBackground: string

  ink: string
  detailsInk: string

  highlight: string
  highlightText: string

  bgIdle?: string
  bgHover?: string
  bgPressing?: string
}


export function makeTheme(name: string, themeColors: ThemeColors) {
  const { background, detailsBackground, ink, detailsInk, highlight, highlightText } = themeColors

  // background luminanceFactor
  const blf = getLuminance(background) > 0.5 ? -1 : 1 // -1 light, 1 dark
  const dblf = getLuminance(detailsBackground) > 0.5 ? -1 : 1

  // Main App Colors
  const themedColors = {
    isDark: blf == 1,
    background: background,
    detailsBackground: detailsBackground,

    ...colorVariablesScale(ink, 'ink'),

    tooltipBackground: setLightness(0.2, background),
    popoverBackground: modifyColor(background, { l: 8 }),

    // TODO if background is light or white, darken it with the hue of ink or highlight
    bgIdle: themeColors.bgIdle || modifyColor(background, { s: 4, l: 6*blf }),
    bgHover: themeColors.bgHover || modifyColor(background, { s: 2, l: 9*blf }),
    bgPressing: themeColors.bgPressing || modifyColor(background, { l: 23*blf }),

    highlight: highlight,
    highlightHover: modifyColor(highlight, { l: 5 }),
    highlightPressing: modifyColor(highlight, { l: 10 }),
    highlightText: readableColor(highlight, setLightness(0.05, background), setLightness(0.95, background), false ),
  }

  // Details Pane
  const detailsThemedColors = {
    ...themedColors,

    background: detailsBackground,
    ...colorVariablesScale(detailsInk, 'ink'),

    bgIdle: modifyColor(detailsBackground, { s: 4, l: 6*dblf }),
    bgHover: modifyColor(detailsBackground, { s: 2, l: 9*dblf }),
    bgPressing: modifyColor(detailsBackground, { l: 23*dblf }),

    highlightHover: modifyColor(highlight, { l: 5 }),
    highlightPressing: modifyColor(highlight, { l: 10 }),
  }

  return {
    name: name,
    ...themedColors,

    colors: themedColors,

    detailsTheme: {
      ...detailsThemedColors,
      colors: detailsThemedColors
    }
  }
}


export type Theme = Partial<ThemeColors> & {
  name: string
  isDark: boolean

  highlightHover: string
  highlightPressing: string

  tooltipBackground: string
  popoverBackground: string

  colors: Partial<ThemeColors>,
  detailsTheme: Partial<ThemeColors> & { colors: Partial<ThemeColors> }
} & Partial<InkScale>

export function themeArrayToObject(arr: string[]){
  return {
    background: arr[0],
    detailsBackground: arr[1],
    ink: arr[2],
    detailsInk: arr[3],
    highlight: arr[4],
    highlightText: arr[5],
  }
}

type InkScale = {
  ink95: string
  ink90: string
  ink85: string
  ink80: string
  ink75: string
  ink70: string
  ink65: string
  ink60: string
  ink55: string
  ink50: string
  ink45: string
  ink40: string
  ink35: string
  ink30: string
  ink25: string
  ink20: string
  ink15: string
  ink10: string
  ink05: string
}

export function colorVariablesScale(color: string, name: string, increment: number = 5) {
  const colors = {}

  colors[name] = color

  for (let step = 95; step > 0; step = Math.round(step - increment)) {
    const label = step < 10 ? '0' + step : step
    const opacity = step / 100
    const colorValue = rgba(color, opacity)
    colors[`${name}${label}`] = colorValue
  }

  return colors
}

export function modifyColor(base: string, extra: { h?: number, s?: number, l?: number }){
  const { h, s, l } = extra
  let { hue, saturation, lightness } = parseToHsl(base)
  hue = clamp(hue + (h || 0), 0, 255)
  saturation = clamp(saturation + (s/100 || 0), 0, 1)
  lightness = clamp(lightness + (l/100 || 0), 0, 1)

  return hslToColorString({ hue, saturation, lightness })
}

export function getPropColor(key: string, props) {
  const color = props[key]
  return typeof color === 'string' ? props?.theme?.colors?.[color] || props[key] : color
}