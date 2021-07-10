import { OS, Platform } from '../config/types'

import { config, getProtocol } from '../config'
import { logger } from './logger'

// --- Basic JS Helpers

export function arraysEqual<T>(a: T[], b: T[], comparator?: (i: T, j: T) => boolean): boolean {
  if (a == null && b == null) return true
  if (!a || !b) return false
  if (a.length != b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (comparator) {
      if (!comparator(a[i], b[i])) return false
    } else {
      if (a[i] != b[i]) return false
    }
  }
  return true
}

export function values<T>(obj: { [key: string]: T }): T[] {
  return Object.keys(obj).map(k => obj[k])
}

export function findMax(data) {
  let max, index = -1
  data.forEach((x, i) => {
    if (index == -1 || x > max) {
      max = x
      index = i
    }
  })
  return { max, index }
}

const SHORTWORDS = /^(and|as|but|for|if|nor|or|so|yet|a|an|the|as|at|by|for|in|of|off|on|per|to|up|via)$/i

export function toPascalCase(str: string) {
  return str.match(/[a-z]+/gi)
    .map((word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .join('')
}

export function toTitleCase(str: string, delim?: string) {
  const title = str.replace(/\w\S*/g, function(txt) {
    if (txt.match(SHORTWORDS)) {
      return txt.toLowerCase()
    } else {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    }
  })
  return title.charAt(0).toUpperCase() + title.substr(1)
}

export function emailToName(str: string) {
  if (str.indexOf(' ') > -1) return str

  return str.split('.').map(s => toTitleCase(s)).join(' ')
}

export const timeToString = (seconds: number) => {
  let minutes = Math.floor(seconds / 60)
  let remain = Math.floor(seconds - minutes * 60)
  return `${minutes}:${remain < 10 ? '0' : ''}${remain}`
}

export function setCopyAdd<T>(source: Set<T>, value: T) {
  let newSet = new Set(source)
  newSet.add(value)
  return newSet
}

export function setCopyDelete<T>(source: Set<T>, value: T) {
  let newSet = new Set(source)
  newSet.delete(value)
  return newSet
}

export function setCopyToggle<T>(source: Set<T>, value: T) {
  let newSet = new Set(source)
  source.has(value) ? newSet.delete(value) : newSet.add(value)
  return newSet
}

export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function isFilled(obj: any) {
  if (obj == null && obj == undefined) return false

  if (typeof obj == 'string' || typeof obj == 'number') {
    if (obj != null && obj != '' && obj != undefined) return true
    else return false
  } else if (typeof obj == 'object') {
    if (Array.isArray(obj)) {
      if (obj != null && obj != undefined && obj.length > 0) return true
      else return false
    } else {
      if (obj != null && obj != undefined && Object.keys(obj).length > 0) return true
      else return false
    }
  } else if (typeof obj == 'function') {
    return true
  } else {
    // undefined?
    return false
  }
}

export function isEmpty(obj: any) {
  return !isFilled(obj)
}

// note: gives approximate median; does not average middle two entries
export function distribution(
  arr: number[]
): {
  min: number
  max: number
  avg: number
  p25: number
  med: number
  p75: number
} {
  if (!arr || arr.length == 0) return { min: 0, max: 0, p25: 0, med: 0, p75: 0, avg: 0 }
  const sorted = arr.sort((a, b) => a - b)
  const p25 = sorted[Math.floor(arr.length / 4)]
  const med = sorted[Math.floor(arr.length / 2)]
  const p75 = sorted[Math.floor(arr.length * 0.75)]
  const min = sorted[0]
  const max = sorted[arr.length - 1]
  const avg = arr.reduce((a, b) => a + b, 0) / arr.length
  return { min, max, avg, p25, med, p75 }
}

export function fuzzysearch (needle: string, haystack: string) {
  const hlen = haystack.length;
  const nlen = needle.length;
  if (nlen > hlen) {
    return false;
  }
  if (nlen === hlen) {
    return needle === haystack;
  }
  outer: for (var i = 0, j = 0; i < nlen; i++) {
    const nChar = needle.charCodeAt(i)

    let prevHChar: number = 0
    while (j < hlen) {
      const hChar = haystack.charCodeAt(j)
      if (hChar === nChar && (i !== 0 || prevHChar < 96 || prevHChar > 123)) {
        j++;
        prevHChar = hChar
        continue outer
      } else {
        j++;
        prevHChar = hChar
      }
    }
    return false
  }
  return true
}


// Restrict <tt>val</tt> to [min,max]; if it goes outside that
// range then set it to the min or max value as appropriate
export function clamp(val: number, min: number, max: number) {
    return val > max ? max : val < min ? min : val
}

// --- Audio helpers

export const getAudioContext = () => {
  const w: any = window
  const ContextConstructor = w.AudioContext || w.webkitAudioContext
  let context = (w.audioContext = new ContextConstructor())
  return context
}

export function delay(ms) {
  return new Promise<void>(function(resolve, reject) {
    setTimeout(resolve, ms)
  })
}

// --- Date/time

export function currentTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

// --- Debouncing

export enum DebounceStyle {
  RESET_ON_NEW, // reset wait timer if new events come in
  IMMEDIATE_THEN_WAIT, // invoke function immediately, don't run again until timeout expires
  IGNORE_NEW, // wait, ignoring new requests
  QUEUE_LAST, // invoke function immediately, don't run again until timeout expires, but queue last function and run if it was called
}

export const createScopedDebounce = () => {
  const debounceTimers: { [id: string]: any } = {}

  const debounce = (id: string, func: () => void, wait: number, style: DebounceStyle) => {
    let timer = debounceTimers[id]

    switch (style) {
      case DebounceStyle.IMMEDIATE_THEN_WAIT:
        if (timer) return
        debounceTimers[id] = setTimeout(() => delete debounceTimers[id], wait)
        func()
        return

      case DebounceStyle.QUEUE_LAST:
        if (timer) {
          timer.queued = func
          timer.wait = wait
          return
        }
        debounceTimers[id] = { timer: setTimeout(() => {
          const queued = debounceTimers[id]
          delete debounceTimers[id]
          if (queued.queued) debounce(id, queued.queued, queued.wait, style)
        }, wait) }
        func()
        return


      case DebounceStyle.IGNORE_NEW:
        if (timer) return
        debounceTimers[id] = setTimeout(() => {
          func()
          delete debounceTimers[id]
        }, wait)
        return

      case DebounceStyle.RESET_ON_NEW:
      default:
        clearTimeout(timer)
        debounceTimers[id] = setTimeout(() => {
          func()
          delete debounceTimers[id]
        }, wait)
        return

    }
  }

  const clearDebounce = (id: string) => {
    let timer = debounceTimers[id]

    if (typeof(timer) == 'object') {
      clearTimeout(timer.timer)
    } else {
      clearTimeout(timer)
    }

    delete debounceTimers[id]
    return timer
  }

  const clearAllDebounces = () => {
    const debounceIds = Object.keys(debounceTimers)
    debounceIds.forEach(id => clearDebounce(id))
  }

  return {debounce, clearDebounce, clearAllDebounces}
}

const globalDebounce = createScopedDebounce()
export const debounce = globalDebounce.debounce
export const clearDebounce = globalDebounce.clearDebounce

// --- queue + flush

const MAX_QUEUE_SIZE = 35

export class EventsQueue<T> {
  // ordered from oldest to newest
  queued: T[] = []
  outstanding: T[] = []
  flushFn: (events: T[]) => Promise<any>

  constructor(fn: (events: T[]) => Promise<any>) {
    this.flushFn = fn
  }

  filter = (fn: (item: T) => boolean) => {
    this.queued = this.queued.filter(fn)
  }

  push = (e: T) => {
    this.queued.push(e)
    this.flush()
  }

  flush = async () => {
    if (this.outstanding.length != 0 || this.queued.length == 0) return

    this.outstanding = this.queued
    this.queued = []

    let success = false
    try {
      await this.flushFn(this.outstanding)
      success = true
    } catch (ex) {
      this.queued = this.outstanding.concat(this.queued)
      if (this.queued.length > MAX_QUEUE_SIZE) this.queued = this.queued.slice(0, MAX_QUEUE_SIZE)
    }
    this.outstanding = []

    if (success && this.queued.length != 0) this.flush()
  }
}

// --- user agent processing

// detect operating system
let os: OS = null
export function getOS(): OS {
  if (os) return os

  if (typeof window === 'undefined') {
    // use node.js version of the check
    switch (process.platform) {
      case 'darwin': return os = 'mac'
      case 'win32': return os = 'windows'
      case 'android': return os = 'android'
      default:
        return 'linux'
    }
  }

  if (typeof navigator != 'undefined' && navigator.product == 'ReactNative')
    return os = 'react-native'

  let userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod']

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'mac'
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'ios'
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'windows'
  } else if (/Android/.test(userAgent)) {
    os = 'android'
  } else if (!os && /Linux/.test(platform)) {
    os = 'linux'
  }

  return os
}

let protocol: string = getProtocol(config.env, config.dev, getOS())
config.protocol = protocol

// detect app platform
let platform: Platform = null
export function getPlatform(): Platform {
  if (platform) return platform

  const os = getOS()
  if (os == 'mac') {
    platform = 'mac-web'
  } else if (os == 'windows') {
    platform = 'win-web'
  } else if (os == 'linux') {
    platform = 'lin-web'
  } else if (os == 'android') {
    platform = 'andr-web'
  } else if (os == 'ios') {
    platform = 'ios-web'
  } else {
    platform = 'unknown'
  }

  return platform
}

export const setPlatform = (newPlatform: Platform) => platform = newPlatform

export const isMac = getOS() == 'mac'
export const isMacBigSur = (() => {
  const osInfo = getOSInfo()
  if (osInfo.includes('Mac OS X 10_16') || osInfo.includes('Mac OS X 11')) {
    return true
  }
  return false
})()

export const isWindows = getOS() == 'windows'
export const isLinux = getOS() == 'linux'

export const isMobile: boolean = ['ios', 'android'].indexOf(getOS()) > -1

export const isReactNative = getOS() == 'react-native'

// mac can use dragging on the entire app, but windows/linux cannot receive both drag and click
export const draggingClass = !isMac ? 'app-non-dragging' : 'app-dragging'
export const classes = (classes: string[]) => classes.filter(c => c).join(" ")

export function getOSInfo() {
  if (typeof window === 'undefined') return 'nodejs'
  if (typeof navigator != 'undefined' && navigator.product == 'ReactNative') return navigator.product
  const userAgent = window.navigator.userAgent
  const platform = /[^(]+\(([^)]+)\)/.exec(userAgent)
  return platform[1]
}

export const isWebRTCSupported = () => {
  return true
}

export function getBrowser() {
  if (typeof window === 'undefined') return 'nodejs'
  if (typeof navigator != 'undefined' && navigator.product == 'ReactNative')
    return 'react-native'
  const userAgent = window.navigator.userAgent
  if (userAgent.indexOf('Opera') != -1 || userAgent.indexOf('OPR') != -1) return 'opera'
  else if (userAgent.indexOf('Edge') > -1) return 'edge'
  else if (userAgent.indexOf('Chrome') > -1) return 'chrome'
  else if (userAgent.indexOf('Safari') > -1) return 'safari'
  else if (userAgent.indexOf('Firefox') > -1) return 'firefox'
  else if (userAgent.indexOf('MSIE') > -1) return 'ie'
  return 'unknown'
}

export function getBrowserOS() {
  const os = getOS()
  const browser = getBrowser()
  return os + '-' + browser
}

// --- Wisp-specific helpers

export function unwrapError(error: any, defaultMessage?: string) {
  if (!error) return 'Error'
  if (typeof error == 'string') return error
  if (!defaultMessage) defaultMessage = error.message
  if (error.response) {
    let response = error.response
    if (response.data) logger.info(response.data)
    return response.data && response.data.error
      ? response.data.error.message || response.data.error.toString()
      : defaultMessage
  } else {
    return defaultMessage
  }
}

export const errorHasCode = (error: any, code: number): boolean =>
  error && error.response && error.response.status == code

export const shallowCompare = (obj1: any, obj2: any) =>
  obj1 && obj2 && Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key])

export const deepCompareIntersection = (obj1: any, obj2: any) =>
  obj1 === obj2 || typeof obj1 === typeof obj2 && typeof obj1 === "object" &&
    Object.keys(obj1).every(key => !obj2.hasOwnProperty(key) || deepCompareIntersection(obj1[key], obj2[key]))

export const placeholderPromise = (shouldResolve: boolean = true, delayMs: number = 1000) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) resolve()
      else reject()
    }, delayMs)
  })
}

export function mapRange(value: number, in_min: number, in_max: number, out_min: number, out_max: number) {
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

export function mapSlices(list: any[], chunk: number, func: (slice: any[], index: number) => any) {
  const buffer = []
  for (let i = 0, j = list.length; i < j; i += chunk) {
    let slice = list.slice(i, i + chunk)
    buffer.push(func(slice, i))
  }
  return buffer
}

export function range(start: number, end: number): number[] {
  const r = []
  for (let i = start; i <= end; i++) r.push(i)
  return r
}

export function apostrophedString(str: string) {
  const stringEndsWithS = str.toLowerCase()[str.length - 1] == 's'
  const apostrophedString = stringEndsWithS ? `${str}'` : `${str}'s`
  return apostrophedString
}

export function objectToGetParams(object: any) {
  return (
    '?' +
    Object.keys(object)
      .filter(key => !!object[key])
      .map(key => `${key}=${encodeURIComponent(object[key])}`)
      .join('&')
  )
}

export function calculateDragOffset(cursorScreenPosition, windowPosition) {
  const { x, y } = cursorScreenPosition
  const windowX = windowPosition[0]
  const windowY = windowPosition[1]
  const dragOffsetX = windowX - x
  const dragOffsetY = windowY - y
  return [dragOffsetX, dragOffsetY]
}

export function updateWindowPosition(cursorScreenPosition, size, dragOffsetX, dragOffsetY, window) {
  if (!window) return
  const { x, y } = cursorScreenPosition
  const bounds = {
    width: size[0],
    height: size[1],
    x: dragOffsetX + x,
    y: dragOffsetY + y
  }
  window.setBounds(bounds)
}

export function offlineMessage(offlineTime: number) {
  const navOffline = navigator.onLine ? 'up' : 'down'
  return ` sock:${Math.round(offlineTime / 1000)}s nav:${navOffline}`
}

export function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function commaAnd(strings: string[]) {
  return strings.slice(0, strings.length - 1).join(", ")
    + (strings.length > 1 ? " and " : "")
    + strings[strings.length - 1]
}

export function timeDuration(time: string): number {
  const groups = time.match(/^(\d+) *(\w+)/)
  if (!groups) return null
  const [_, value, unit] = groups
  const amount = parseInt(value)
  if (unit.startsWith('m')) return amount * 60_000
  if (unit.startsWith('s')) return amount * 1_000
  if (unit.startsWith('h')) return amount * 3600_000
  return null
}

export function fileSize(size: number): string {
  if (size < 1024) return size + 'b'
  size /= 1024
  if (size < 1024) return Math.round(size) + 'kb'
  size /= 1024
  if (size < 1024) return Math.round(size) + 'Mb'
  size /= 1024
  return Math.round(size) + 'Gb'
}

export const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const nounApostrophe = (noun: string) => `${noun}${noun[noun.length-1] == 's' ? `'` : `'s`}`

export const pluralizeWithCount = (noun: string, num: number) => {
  return num + ' ' + pluralize(noun, num)
}

export const pluralize = (noun: string, num: number) => {
  return `${noun}${num == 1 ? '' : 's'}`
}

export function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here")
}

export function humanizeNumber(value) {
  const absValue = Math.abs(value)
  if (absValue > 1_000_000) return Math.round(value * 100 / 1_000_000) / 100 + 'M'
  if (absValue > 1_000) return Math.round(value * 100 / 1_000) / 100 + 'k'
  if (absValue > 1) return Math.round(value * 100) / 100
  return Math.round(value * 1000) / 1000
}

export function performanceNow() {
  return typeof performance != 'undefined' ? performance.now() : Date.now()
}

export function debugCloneNodeWithAttrs(elem: HTMLElement) {
  bfsTraverseElem(elem, (el) => {
    try {
      el.className += ` h_${el.clientHeight}`
    } catch (e) {}
  })

  return elem.cloneNode(true)
}

export function bfsTraverseElem(elem: HTMLElement, fn: (elem: HTMLElement) => void) {
  let queue = [elem]
  while (queue.length) {
    const el = queue.shift()
    fn(el)

    const children = Array.from(el.children) as HTMLElement[]
    if (children.length) {
      queue.push(...children)
    }
  }
}

export function getCircularReplacer() {
  const seen = new WeakSet()
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}

export function renderTimeString(duration: number) {
  const hrs = Math.floor(duration / 3600_000)
  duration = duration - hrs * 3600_000
  const mins = Math.floor(duration / 60_000)
  duration = duration - mins * 60_000
  const secs = Math.floor(duration / 1000)

  const hrsString = hrs > 0 ? hrs.toString() + ':' : ''
  const minString = Math.min(mins, 59).toString().padStart(2, '0')
  const secString = Math.min(secs, 59).toString().padStart(2, '0')

  return `${hrsString}${minString}:${secString}`
}
