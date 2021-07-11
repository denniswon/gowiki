import create, { GetState, SetState } from 'zustand'

import { authActions, authApi } from '@gowiki/api'
import {
  emailToName, isMac, logger, Team, Themes, User
} from '@gowiki/core'
import sounds from '@gowiki/sounds'

import { appService } from './appService'
import { trackerSettings } from './trackerSettings'

// check for a new server version interval
export const REFRESH_CHECK_EVERY = 15 * 60 * 1000

// if client has been open for this much time, refresh
export const AUTO_REFRESH_TIME = 24 * 3600 * 1000

// moment.js formatting/parsing for DND start/end
export const DND_START_FORMAT = 'HH:mm'

export const VIDEOS_PER_PAGE_AUTO = -1

export type CallServiceOptions = {
  ionHost?: string
  sfuHost?: string
}

export enum NameDisplayOption {
  DEFAULT = '',
  SHOW_FULL_NAME = 'SHOW_FULL_NAME',
  SHOW_DISPLAY_NAME_ONLY = 'SHOW_DISPLAY_NAME_ONLY',
}

export enum AutoExpandOption {
  NEVER = 'never',
  MEETINGS = 'meetings',
  ALWAYS = 'always',
}

export class Settings {
  theme: Themes
  nameDisplayOption?: NameDisplayOption
  soundsDisabled?: boolean
  notification?: boolean
}

export class SettingsStore extends Settings {
  actions: SettingsActions
}

const SETTING_TO_USER_FLAG: { [key: string]: { meta: string; default: any } } = {
  nameDisplayOption: { meta: 'ndisp', default: NameDisplayOption.DEFAULT },
  theme: { meta: 'th', default: Themes.LIGHT },
  soundsDisabled: { meta: 'sdis', default: false },
  notification: { meta: 'rn', default: true },
}

class SettingsActions {
  constructor(public set: SetState<SettingsStore>, public get: GetState<SettingsStore>) {}

  // --- initialization

  initSettings = (user: User, team?: Team) => {
    const initialSettings: Partial<Settings> = {}
    const meta = User.meta(user)
    const teamMeta = Team.meta(team)
    // tslint:disable-next-line: forin
    for (let key in SETTING_TO_USER_FLAG) {
      const value = SETTING_TO_USER_FLAG[key]
      const def = teamMeta[key] === undefined ? value.default : teamMeta[value.meta]
      initialSettings[key] = meta[value.meta] === undefined ? def : meta[value.meta]
    }
    this.set(_ => initialSettings)
    if (initialSettings.soundsDisabled) sounds.setSoundsDisabled(true)
  }

  // --- settings

  toggleSetting = (key: keyof Settings, toggle?: boolean): boolean => {
    return this.updateSetting(key, toggle === undefined ? !this.get()[key] : toggle)
  }

  updateSetting = <T>(key: keyof Settings, setting: T): T => {
    const metaProp = SETTING_TO_USER_FLAG[key]
    if (!metaProp) throw 'Unknown setting: ' + key
    logger.info(`UI —— updateSetting`, key, metaProp, setting)

    this.set(_ => ({ [key]: setting }))

    trackerSettings.appToggleSetting(key, setting as any)
    authActions.updateUser({ meta: { [metaProp.meta]: setting } })
    appService.updateSettings({ updates: { [key]: setting } })
    return setting
  }

  // Notif
  toggleSoundsDisabled = (toggle?: boolean) => this.toggleSetting('soundsDisabled', toggle)
  toggleRoomNotification = (toggle?: boolean) => this.toggleSetting('notification', toggle)
  setNameDisplayOption = (option: NameDisplayOption) => this.updateSetting('nameDisplayOption', option)
  toggleDarkMode = () => {
    const newTheme = this.get().theme == Themes.DARK ? Themes.LIGHT : Themes.DARK
    this.updateSetting('theme', newTheme)
  }

  computeDisplayNameSetting = () => {
    const setting = this.get().nameDisplayOption
    if (setting == NameDisplayOption.DEFAULT) {
      const teamSize = Object.keys(authApi.getState().members).length
      const newSetting = (teamSize > 50) ? NameDisplayOption.SHOW_FULL_NAME : NameDisplayOption.SHOW_DISPLAY_NAME_ONLY
      this.set(_ => ({ nameDisplayOption: newSetting }))
      return newSetting
    }
    return setting
  }

}

export const [useSettingsStore, settingsApi] = create<SettingsStore>((set, get) => ({
  theme: Themes.LIGHT,

  actions: new SettingsActions(set, get as any)
}))

export const settingsActions = settingsApi.getState().actions

// NOTE: not using settingsStore don't respond to store changes.
// But settings change less frequently than ex. AuthStore, so used in react components.

export const getNameDisplayOption = () => {
  return settingsApi.getState().nameDisplayOption
}

export const userDisplayName = (user: {nickname?: string, name?: string}) => {
  if (!user) return 'User'

  const name = emailToName(user.name || 'User')
  const nickname = user.nickname
  const setting = settingsActions.computeDisplayNameSetting()

  return setting === NameDisplayOption.SHOW_FULL_NAME
    ? name
    : nickname || name
}
