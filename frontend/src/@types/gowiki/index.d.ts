declare const str = ''

declare module '*.css' {
  export default str
}
declare module '*.png' {
  export default str
}
declare module '*.jpg' {
  export default str
}
declare module '*.svg' {
  export default str
}
declare module '*.m4a' {
  export default str
}
declare module '*.mp4' {
  export default str
}
declare module '*.gif' {
  export default str
}

// set by webpack
declare var IS_TEST: boolean
declare var IS_DEV: boolean
declare var HASH: string
declare var ORIGIN_HOST: string
declare var ASSET_HOST: string

interface Store {
  name?: string
  delete(key: string): void
  get(key: string): any
  set(key: string, data: any): void
}

// set by electron preload
interface Window {
  isDesktop?: boolean
  appVersion?: string
  appVersionString?: string
  authToken?: string
  clientId?: string
  store?: Store
  displays: Electron.Display[]
  displayInfo?: Rectangle
  getWindowIds: () => { [key: number]: boolean } | undefined

  electronSubscribe?: (message: ElectronTopic, callback: (message: string, ...args?: any[]) => void) => void
  electronUnsubscribe?: (message: ElectronTopic, callback?: (message: string, ...args?: any[]) => void) => void
  electronPublish?: (message: ElectronTopic, ...args?: any[]) => void

  getScreenMedia?: (callback: (error: Error, sources: Electron.DesktopCapturerSource[]) => void, options?: Electron.SourcesOptions) => void
}

// enable common code that references window
declare module NodeJS {
  interface Global {
    window?: Window
    windowIds?: { [key: number]: boolean }
  }
}

