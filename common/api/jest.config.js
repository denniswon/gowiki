const baseConfig = require('../../jest.config.base.js')

module.exports = {
  ...baseConfig,
  displayName: 'api',
  setupFilesAfterEnv: [__dirname + "/jestTestsSetup.ts"],
}
