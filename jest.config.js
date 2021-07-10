const baseConfig = require('./jest.config.base.js')

module.exports = {
  ...baseConfig,

  projects: [
    '<rootDir>/assets/jest.config.js',
    '<rootDir>/common/*/jest.config.js',
    // '<rootDir>/desktop/jest.config.js',
  ],

  // coverage configuration
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/components/screens.analytics/**/*.*',
    '!<rootDir>/src/components/screens.admin/**/*.*',
    '!<rootDir>/src/components/screens.debug/**/*.*',
  ],

};
