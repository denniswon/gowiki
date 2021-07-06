import path from 'path'
import os from 'os'

import webpack, { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer'
import MomentTimezoneDataPlugin from 'moment-timezone-data-webpack-plugin'

const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const currentYear = new Date().getFullYear()
const analyzer = process.env.ANALYZER == 'true'

const commitHash = process.env.BUILD_HASH || require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim()

const mode = process.env.NODE_ENV || 'development'
const isDev = mode == 'development'
const assetHost = process.env.ASSET_HOST || (isDev && !process.env.SERVE_STATIC ? 'http://localhost:9000' : '')

const rules = [
  {
    test: /\.(ts|js)x?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        babelrc: false,
        compact: true,
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          '@babel/preset-react'
        ],
        plugins: [
          ['@babel/plugin-proposal-decorators', { "legacy": true }],
          ['@babel/plugin-proposal-class-properties', { "loose": true }],
          '@babel/plugin-transform-spread',
          '@babel/proposal-object-rest-spread',
          '@babel/plugin-proposal-numeric-separator',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-proposal-nullish-coalescing-operator',
        ]
      }
    },
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      {
        loader: 'postcss-loader',
        options: { zindex: false }
      }
    ]
  },
  {
    test: /\.(m4a|mp4)$/,
    include: [
      path.join(__dirname, 'src'),
    ],
    loader: 'file-loader',
    options: {
      name: 'sounds/[name].[ext]',
    }
  },
  {
    test: /\.(woff|woff2|eot|ttf)$/,
    include: [
      path.join(__dirname, 'src'),
    ],
    exclude: /node_modules/,
    loader: 'file-loader',
    options: {
      name: 'fonts/[name].[ext]',
    }
  },
  {
    test: /\.(png|jpg|gif|svg)$/,
    include: [
      path.join(__dirname, 'src'),
    ],
    exclude: /node_modules/,
    loader: 'url-loader',
    options: {
      name: 'images/[name].[ext]',
      limit: 8192
    }
  }
]

const config: Configuration = {
  entry: './src/index.tsx',
  module: {
    rules
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      api: path.resolve(__dirname, 'src/api/'),
      components: path.resolve(__dirname, 'src/components/'),
      config: path.resolve(__dirname, 'src/config/'),
      fonts: path.resolve(__dirname, 'src/fonts/'),
      images: path.resolve(__dirname, 'src/images/'),
      videos: path.resolve(__dirname, 'src/videos/'),
      models: path.resolve(__dirname, 'src/models/'),
      public: path.resolve(__dirname, 'public/'),
      services: path.resolve(__dirname, 'src/services/'),
      sounds: path.resolve(__dirname, 'src/sounds'),
      stores: path.resolve(__dirname, 'src/stores/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      'styles-global': path.resolve(__dirname, 'src/styles-global/'),
      utils: path.resolve(__dirname, 'src/utils/'),
    }
  },
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'js/[name].js',
    publicPath: `http://${os.hostname}:9000/`
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
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
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(isDev),
      HASH: JSON.stringify(commitHash),
      ORIGIN_HOST: JSON.stringify(''),
      ASSET_HOST: JSON.stringify(assetHost)
    }),
    new MomentLocalesPlugin(),
    new MomentTimezoneDataPlugin({
      startYear: currentYear,
      endYear: currentYear,
    }),
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin()
  ],
  optimization: isDev ? undefined : {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: false,
          mangle: true
        }
      }),
    ],
  }
}

export default config
