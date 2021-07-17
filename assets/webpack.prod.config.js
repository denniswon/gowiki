const path = require('path')
const merge = require('webpack-merge')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { appConfig } = require('./webpack.base.js')

const config = {
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  devtool: 'nosources-source-map',
  plugins: [
    new CleanWebpackPlugin(['static'], { root: path.join(__dirname, '..') }),
    new CopyWebpackPlugin([{ from: path.join(__dirname, 'static') }]),
  ],
}

module.exports = [
  merge(config, appConfig),
]
