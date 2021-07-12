import customProtocolCheck from 'custom-protocol-check'

import { config, logger, paths } from '@gowiki/core'

export const openTandem = ({ token, path, fallback }: { token?: string, path?: string, fallback?: string }) => {
  const appPath = path || (`app/main${token ? `?token=${encodeURIComponent(token)}` : ''}`)
  const url = `/${path}`

  customProtocolCheck(url,
    () => {
      logger.info(`Desktop app missing`)
      window.location.href = '/'
    },
    () => {
      logger.info(`Desktop app launched`)
    },
    1000
  )
}
