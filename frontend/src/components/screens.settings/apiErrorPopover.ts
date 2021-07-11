import { logger, unwrapError } from '@gowiki/core'

import { tracker } from 'services'
import { uiApi } from 'stores/uiStore'

const { showPopover, clearPopover } = uiApi.getState().actions

export default async <T>(fn: () => Promise<T>, defaultMessage: string): Promise<T> => {
  try {
    const result = await fn()
    return result
  } catch (e) {
    logger.info(e)
    const message = unwrapError(e, defaultMessage)
    tracker.logApiError(message, defaultMessage)
    showPopover(message, null, async () => {
      clearPopover()
    }, ["OK"])
  }
}
