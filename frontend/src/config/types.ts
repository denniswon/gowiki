export type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K]
}

export type FunctionArgs<T> = T extends (...args: infer U) => any ? U : never
export type FunctionReturnType<T> = T extends (...args: any) => infer U ? U : never

export type Size = {
  width: number,
  height: number,
}

export enum SocketStatus {
  CONNECTED,
  DISCONNECTED
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

export type OS = 'windows' | 'mac' | 'linux' | 'android' | 'ios' | 'react-native'

export type Platform = 'win-web' | 'lin-web' | 'mac-web' | 'ios-web' | 'andr-web' |
  'win-app' | 'mac-app' | 'lin-app' | 'ios-app' | 'andr-app' | 'unknown'
