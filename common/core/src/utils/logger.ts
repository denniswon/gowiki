import { config } from '../config'

const LS_LOGLEVEL = 'loglevel'

export enum Level {
  TRACE = 0,
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

const LevelMap = {
  'trace': Level.TRACE,
  'debug': Level.DEBUG,
  'info': Level.INFO,
  'warn': Level.WARN,
  'error': Level.ERROR,
}

export const LevelLabels = {
  [Level.TRACE]: 'trace',
  [Level.DEBUG]: 'debug',
  [Level.INFO]: 'info',
  [Level.WARN]: 'warn',
  [Level.ERROR]: 'error',
}

type LogListener = (level: Level, ...args: any[]) => void

const isReactNative = (typeof navigator != 'undefined' && navigator.product == 'ReactNative')

const ConsoleMethodMap = {
  [Level.TRACE]: console.trace,
  [Level.DEBUG]: console.debug,
  [Level.INFO]: console.info,
  [Level.WARN]: console.warn,
  [Level.ERROR]: console.error,
}

const ConsoleLogger: LogListener = (level: Level, ...args: any[]) => {
  ConsoleMethodMap[level](...args)
}

class Logger {

  level: Level
  logListeners: LogListener[] = [ConsoleLogger]
  didNotLogListeners: LogListener[] = []
  allLogListeners: LogListener[] = []

  constructor() {
    const storedLogLevel = typeof localStorage != 'undefined' && localStorage.getItem(LS_LOGLEVEL)
    const level = LevelMap[storedLogLevel]

    if (config.dev) {
      this.level = level || Level.DEBUG
    } else {
      this.level = level || Level.ERROR
    }
  }

  setLevel = (level: Level) => this.level = level

  setLevelString = (level: string) => this.level = LevelMap[level]

  log(level: Level, ...args: any[]) {
    this.allLogListeners.forEach(l => l(level, ...args))
    if (level < this.level) {
      this.didNotLogListeners.forEach(l => l(level, ...args))
      return
    }
    this.logListeners.forEach(l => l(level, ...args))
  }

  saveDefaultLogLevel(level: string) {
    localStorage.setItem(LS_LOGLEVEL, level)
    this.setLevelString(level)
  }

  trace = (...args: any[]) => this.log(Level.TRACE, ...args)
  debug = (...args: any[]) => this.log(Level.DEBUG, ...args)
  info = (...args: any[]) => this.log(Level.INFO, ...args)
  warn = (...args: any[]) => this.log(Level.WARN, ...args)
  error = (...args: any[]) => this.log(Level.ERROR, ...args)

  withPrefix = (prefix: string) => {
    return {
      trace: (...args: any[]) => this.log(Level.TRACE, prefix, ...args),
      debug: (...args: any[]) => this.log(Level.DEBUG, prefix, ...args),
      info:  (...args: any[]) => this.log(Level.INFO, prefix, ...args),
      warn:  (...args: any[]) => this.log(Level.WARN, prefix, ...args),
      error: (...args: any[]) => this.log(Level.ERROR, prefix, ...args),
    }
  }
}

const instance = new Logger()

export const logger = instance

export const loggerWithPrefix = instance.withPrefix
