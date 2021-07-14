const path = require('path')
const os = require('os')
const webpack = require('webpack')
const merge = require('webpack-merge')
const fs = require('fs-extra')

const { appConfig } = require('./webpack.base.js')

// since dev is served out of webpack-dev-server, we need to copy static files manually
fs.copy(path.join(__dirname, 'static'), path.join(__dirname, '../priv/static'))

const devtool = process.env.DEVTOOL || 'eval-cheap-source-map'

const config = {
  output: {
    path: path.join(__dirname, '../priv/static'),
    filename: 'js/[name].js',
    publicPath: `http://${os.hostname}:9000/`,
    sourceMapFilename: `http://${os.hostname}:9000/[name].js.map`
  },
  devtool: devtool + ' ./src',
  optimization: null,
  plugins: [
    new webpack.DefinePlugin({
      DEVTOOL: JSON.stringify(devtool)
    })
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: 'react-hot-loader/webpack',
        include: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'static'),
    compress: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 9000,
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      // Uncomment this for profiling
      // 'react-dom$': 'react-dom/profiling',
      // 'scheduler/tracing': 'scheduler/tracing-profiling',
    },
  },
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/
  }
}

const mergedConfig = merge(config, appConfig)

Object.keys(mergedConfig.entry).forEach(k => {
  mergedConfig.entry[k].unshift('./node_modules/react-hot-loader/patch')
  mergedConfig.entry[k].unshift('./src/devtool')
})

// on dev builds, remove desktop chunk so we can merge web & assets
// mergedConfig.entry.desktop = '@babel/polyfill'
mergedConfig.optimization = {}

module.exports = mergedConfig
