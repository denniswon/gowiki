module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 2,
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-transform-spread",
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-optional-chaining",
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ],
    "react-hot-loader/babel"
  ]
}
