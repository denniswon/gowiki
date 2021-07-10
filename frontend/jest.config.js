const baseConfig = require('../jest.config.base.js')

process.env.TZ = 'UTC'

module.exports = {
  ...baseConfig,
  displayName: 'assets',
  setupFilesAfterEnv: ["./jestTestsSetup.ts"],
  testEnvironment: "jest-environment-jsdom-sixteen"
}
