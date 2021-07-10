const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin')
const { merge } = require('webpack-merge')

const currentYear = new Date().getFullYear()
const analyzer = process.env.ANALYZER == 'true'

const commitHash = process.env.BUILD_HASH || require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim()

const mode = process.env.NODE_ENV || 'development'
const isDev = mode == 'development'
const assetHost = process.env.ASSET_HOST || (isDev && !process.env.SERVE_STATIC ? 'http://localhost:9000' : '')

const appEntries = {
  entry: {
    main: ['react-hot-loader/patch', './src/index'],
  }
}

const baseConfig = {
  mode,
  output: {
    chunkFilename: `js/[name].chunk.[contenthash].js`,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, './node_modules/zustand'),
        ],
        exclude: [
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            compact: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                }
              ],
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
              'react-hot-loader/babel',
            ]
          }
        }
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
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(isDev),
      IS_TEST: JSON.stringify(false),
      IS_DESKTOP: JSON.stringify(false),
      HASH: JSON.stringify(commitHash),
      ORIGIN_HOST: JSON.stringify(''),
      ASSET_HOST: JSON.stringify(assetHost)
    }),
    new MomentLocalesPlugin(),
    new MomentTimezoneDataPlugin({
      startYear: currentYear,
      endYear: currentYear,
    })
  ].concat(analyzer ? new BundleAnalyzerPlugin() : []),
  resolve: {
    // Resolve symlinks in path so we compile shared
    symlinks: false,
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
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
    },
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    fallback: {
      dgram: false,
      fs: false,
      net: false,
      tls: false,
      child_process: false
    }
  },
  optimization: {
    moduleIds: 'named',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: false,
          mangle: true
        }
      }),
    ],
  },
  // Adjust webpack watch options
  watchOptions: {
    aggregateTimeout: 300,
    ignored: ['node_modules/**']
  },
}

// modify babel target
const modBabelTarget = (config, targets) => {
  const babelModule = config.module.rules.find(r => r.use.loader == 'babel-loader')
  babelModule.use.options.presets[0][1].targets = targets
}

const appConfig = merge(appEntries, baseConfig)
modBabelTarget(appConfig, "> 0.25%, not dead")

module.exports = {
  appConfig,
  commitHash
}
