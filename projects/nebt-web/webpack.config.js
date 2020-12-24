require('colors')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack')

const localEnv = require('dotenv').config()

const switchPublicPath = () => {
  if (process.env.NODE_ENV === 'production')
    return `${localEnv.parsed.CDN_URL_PRO}/${localEnv.parsed.CDN_APP_FOLDER}/bundles/`
  if (process.env.NODE_ENV === 'staging')
    return `${localEnv.parsed.CDN_URL_STA}/${localEnv.parsed.CDN_APP_FOLDER}/bundles/`
  return '/'
}

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : '',
  performance: {
    hints: 'warning'
  },
  devServer: {
    contentBase: path.resolve('dist'),
    compress: true,
    port: 8001,
    writeToDisk: true,
    historyApiFallback: true
  },
  entry: { src: path.resolve('src') },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.jpg', '.svg', '.gif']
  },
  output: {
    publicPath: switchPublicPath(),
    path: path.resolve('dist'),
    filename:
      process.env.NODE_ENV === 'development'
        ? '[name].[hash].js'
        : '[name].[contenthash].js'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: module => {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1]

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`
          }
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['> 1%', 'last 2 versions']
                  }
                }
              ],
              '@babel/preset-react'
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  absoluteRuntime: false,
                  corejs: false,
                  helpers: true,
                  regenerator: true,
                  useESModules: false,
                  version: '7.0.0-beta.0'
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.pug$/,
        exclude: /(node_modules)/,
        loader: 'pug-loader'
      },
      {
        test: /\.(woff(2)?|jpe?g|gif|png|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              name: '[folder]/[name]-[contentHash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true
    }),
    new HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('..', 'shared', 'react', 'template.pug'),
      inject: true,
      scriptLoading: 'async',
      cache: false,
      templateLocals: {
        title: localEnv.parsed.APP_NAME
      }
    }),
    new EnvironmentPlugin({
      APP_ROOT_PATH: localEnv.parsed.APP_ROOT_PATH,
      APP_NAME: localEnv.parsed.APP_NAME,
      PROFILE_IMG_SRC: localEnv.parsed.PROFILE_IMG_SRC,
      COPYRIGHT_ENTITY: localEnv.parsed.COPYRIGHT_ENTITY,
      SITE_CONTACT_EMAIL: localEnv.parsed.SITE_CONTACT_EMAIL
    })
  ]
}
