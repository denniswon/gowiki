import { EventType, tracker } from '@gowiki/api'

/**
 * Settings tracking
 */
class TrackerSettings {

  /**
   * Setting was changed
   * @param {string} value1 setting name
   * @param {string} value2 new value
   */
  appToggleSetting(key: string, setting: boolean | string) {
    const value: string = typeof setting === 'boolean' ? (setting ? 'true' : 'false') : setting
    tracker.event(EventType.ACTION, 'appToggleSetting', key, value)
  }

  /**
   * Hotkey was set
   * @param {string} value1 hotkey value
   * @param {string} value2 setting name
   */
  appUpdateHotkey(key: string, setting: string) {
    tracker.event(EventType.ACTION, 'appUpdateHotkey', key, setting)
  }

}

export const trackerSettings = new TrackerSettings()
