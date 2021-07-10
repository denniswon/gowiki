// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  preset: "ts-jest",

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],

  // Indicates which provider should be used to instrument code for coverage
  // coverageProvider: "babel",

  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,

  // A set of global variables that need to be available in all test environments
  globals: {
    "IS_DEV": false,
    "IS_TEST": true,
    "IS_DESKTOP": false,
    "VERSION": "dev",
    "HASH": "dev",
    "ORIGIN_HOST": "http://localhost:5000",
    "ASSET_HOST": "http://localhost:5000",
    "ts-jest": {
      isolatedModules: true
    },
  },

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: [
    "src",
    "node_modules",
    __dirname + "/node_modules"
  ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$": __dirname + "/__mocks__/fileMock.js",
    "static/version.json": "identity-obj-proxy",
    "^src(.*)$": "<rootDir>/src/$1",
    "^react/(.*)$": __dirname + "/node_modules/react/$1",
    "^react-dom/(.*)$": __dirname + "/node_modules/react-dom/$1"
  },

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],

};
