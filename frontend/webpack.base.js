const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin')
const merge = require('webpack-merge')

const currentYear = new Date().getFullYear()
const analyzer = process.env.ANALYZER == 'true'

const commitHash = process.env.BUILD_HASH || require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim()

const repoRoot = '..'
const srcRoot = '.'
const commonRoot = '../common'

const mode = process.env.NODE_ENV || 'development'
const isDev = mode == 'development'
const assetHost = process.env.ASSET_HOST || (isDev && !process.env.SERVE_STATIC ? 'http://localhost:9000' : '')

const appEntries = {
  entry: {
    landing: ['react-hot-loader/patch', './src/landing'],
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
          path.join(__dirname, '../node_modules/zustand'),
          path.join(__dirname, '../common'),
        ],
        exclude: [
          path.join(__dirname, '../common/styles-global/node_modules'),
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
                  corejs: 2,
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
          path.join(__dirname, '../common'),
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
          path.join(__dirname, '../common'),
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
          path.join(__dirname, '../common'),
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
    new webpack.NamedModulesPlugin(),
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
      '@gowiki/api': path.resolve(__dirname, commonRoot, 'api/src'),
      '@gowiki/app': path.resolve(__dirname, commonRoot, 'app/src'),
      '@gowiki/core': path.resolve(__dirname, commonRoot, 'core/src'),
      '@gowiki/sounds': path.resolve(__dirname, commonRoot, 'sounds/src'),
      '@gowiki/styles-global': path.resolve(__dirname, commonRoot, 'styles-global/src'),
      '@gowiki/styles': path.resolve(__dirname, commonRoot, 'styles/src'),
      '@gowiki/web': path.resolve(__dirname, commonRoot, 'web/src'),

      api: path.resolve(__dirname, srcRoot, 'src/api/'),
      components: path.resolve(__dirname, srcRoot, 'src/components/'),
      config: path.resolve(__dirname, srcRoot, 'src/config/'),
      fonts: path.resolve(__dirname, srcRoot, 'src/fonts/'),
      images: path.resolve(__dirname, srcRoot, 'src/images/'),
      videos: path.resolve(__dirname, srcRoot, 'src/videos/'),
      models: path.resolve(__dirname, srcRoot, 'src/models/'),
      services: path.resolve(__dirname, srcRoot, 'src/services/'),
      sounds: path.resolve(__dirname, srcRoot, 'src/sounds'),
      static: path.resolve(__dirname, srcRoot, 'static/'),
      store: path.resolve(__dirname, srcRoot, 'src/store/'),
      stores: path.resolve(__dirname, srcRoot, 'src/stores/'),
      styles: path.resolve(__dirname, srcRoot, 'src/styles/'),
      utils: path.resolve(__dirname, srcRoot, 'src/utils/'),

      react: path.resolve(__dirname, repoRoot, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, repoRoot, 'node_modules/react-dom')
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
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // Adjust webpack watch options
  watchOptions: {
    aggregateTimeout: 300,
    ignored: ['backend/**/*.go', 'node_modules/**']
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
