import { config } from '../config'

/** From '16.0.13' to -> [16, 0, 13] */
/** From '1.0.0 (126)' to -> [1, 0, 0, 126] */
const parseVersion = (version: string): number[] =>
  version.split(/[\s\(\)\.]+/).map(n => parseInt(n, 10)).filter(x => !Number.isNaN(x))

const configVersion = config.appVersion && parseVersion(config.appVersion)
export const minAppVersion = (target: string) => {
  if (!configVersion) return true
  const targetVersion = parseVersion(target)
  const versionDelta = targetVersion.map((tv, i) => configVersion[i] - tv)

  for (let i = 0; i < versionDelta.length; i++) {
    if (versionDelta[i] < 0) return false
    if (versionDelta[i] > 0) return true
  }
  return true
}
