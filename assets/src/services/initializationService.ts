import { authApi, tracker } from '@gowiki/api'
import { settingsActions } from '@gowiki/app'
import { logger, PubSubAction, Team } from '@gowiki/core'

import { uiActions } from 'stores/uiStore'

// a central place for initialization
class InitializationService {

  onSwitchTeam(team: Team) {
    tracker.onChangeTeam(team)
  }

  initMainWindow(switchTeam?: boolean) {
    const { clientId, token, user, team, actions: { initMainWindow } } = authApi.getState()
    if (!user) return

    // step 1. initialize settings
    settingsActions.initSettings(user, team)

    // step 2. initialize socket
    logger.info('INITIALIZATION', user, team)
    if (switchTeam) this.onSwitchTeam(team)

    // step 4. initialize subsystems
    uiActions.initUIStore()
  
    if (!switchTeam) {
      PubSub.subscribe(PubSubAction.SWITCH_TEAM, () => {
        this.initMainWindow(true)
      })
    }
  }

  initSettingsScreen(switchTeam?: boolean) {
    const { user, team } = authApi.getState()
    if (!user || !team) return logger.warn('INITIALIZATION - no user or team')

    settingsActions.initSettings(user, team)

    if (switchTeam) this.onSwitchTeam(team)

    if (!switchTeam) {
      PubSub.subscribe(PubSubAction.SWITCH_TEAM, () => this.initSettingsScreen(true))
    }
  }

}

export default new InitializationService()
