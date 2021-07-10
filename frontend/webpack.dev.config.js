const path = require('path')
const os = require('os')
const { merge } = require('webpack-merge')

const { appConfig } = require('./webpack.base.js')

const config = {
  output: {
    path: path.join(__dirname, '../priv/static'),
    filename: 'js/[name].js',
    publicPath: `http://${os.hostname}:9000/`
  },
  devtool: 'eval-cheap-module-source-map',
  optimization: null,
  plugins: [
  ],
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

module.exports = [
  merge(config, appConfig),
]