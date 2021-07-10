export type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K]
}

export type FunctionArgs<T> = T extends (...args: infer U) => any ? U : never
export type FunctionReturnType<T> = T extends (...args: any) => infer U ? U : never

export type OverlayingProps = {
  level?: "normal" | "floating" | "torn-off-menu" | "modal-panel" | "main-menu" | "status" | "pop-up-menu" | "screen-saver",
  relativeLevel?: 0|1|2|3|4|5|6|7,
  fullscreenable?: boolean
}

export type Display = {
  bounds: Rectangle,
  id: number,
}

export type Size = {
  width: number,
  height: number,
}

export enum PubSubAction {
  WINDOW_UNLOAD = 'unload',
  WINDOW_FOCUS = 'focus',
  FIND_IN_PAGE = 'find',
  FIND_FOCUS = 'find_focus',
  CLEAR_SEARCH = 'find_clear',

  SWITCH_TEAM = 'switch_team',
  UPDATE_TEAM = 'update_team',
  UPDATE_USER = 'update_user',

  EXPAND_OR_COLLAPSE = 'expand-or-collapse',
  OPENED_URL = 'opened-url',
}

export type OS = 'windows' | 'mac' | 'linux' | 'android' | 'ios' | 'react-native'

export type Platform = 'win-web' | 'lin-web' | 'mac-web' | 'ios-web' | 'andr-web' |
  'win-app' | 'mac-app' | 'lin-app' | 'ios-app' | 'andr-app' | 'unknown'

export enum AuthIntent {
  LOG_IN_ONLY,
  SIGN_UP_ONLY,
  LOG_IN_OR_SIGN_UP_WITH_INVITE
}

export enum OAuthProvider {
  GOOGLE = 'google',
  APPLE = 'apple'
}

export type OAuthPayload = {
  provider: OAuthProvider
  token: string
  email: string
  invite?: string
  teamname?: string // for team creation
}

export type UserLite = {
  id: string
  name: string
}

export type FileInfo = {
  name: string
  size: number
  type: string
  lastModified: number
  index: number
}

export enum Role {
  ADMIN = 'admin',
  MEMBER = 'member',
  GUEST = 'guest'
}

export type OSInfo = {
  arch: string
  cpus: number
  cpu: any
  freemem: number
  totalmem: number
  loadavg: number[]
  os: string
  platform: string
  uptime: number
}

export type ApiError = {
  error: {
    message: string,
    resend: boolean
  }
}

export enum CommandEventType {
  TRIGGERED = 'TRIGGERED',
  ON_WINDOW_BLURRED = 'ON_WINDOW_BLURRED',
  ON_ESC_PRESSED = 'ON_ESC_PRESSED',
  HIDE = 'HIDE',
  SHOW = 'SHOW',
  COMMAND_CHOSEN = 'COMMAND_CHOSEN',
  ON_CLICK_LOGO = 'ON_CLICK_LOGO',
  FULL_HIDE = 'FULL_HIDE',
  TOGGLE_WINDOW_PINNING = 'TOGGLE_WINDOW_PINNING',
}

export type CommandEventData = {
  type: CommandEventType,
  payload?: any
}

export enum SettingsSource {
  SETTINGS_MENU = "settingsMenu"
}

export type Rectangle = {
  x: number, y: number, width: number, height: number
}

export type Point = {
  x: number, y: number,
}

export type WindowMoveEvent = Rectangle & {
  xDelta: number,
  yDelta: number
}

export type WindowFlags = {
  window: Window
  alwaysOnTop?: boolean
  visibleOnAllWorkspaces?: boolean
  hasShadow?: boolean
  ignoreMouseEvents?: boolean
  movable?: boolean
  resizable?: boolean
  opacity?: number
  minWidth?: number
  minHeight?: number
  background?: string
  visible?: boolean
}

export type GoogleResponse = {
  access_token: string,
  expires_in: number,
  scope: string,
  token_type: string

  id_token?: string,
  refresh_token?: string,
  code?: string,
}

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}
