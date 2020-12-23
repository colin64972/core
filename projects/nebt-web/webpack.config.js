require('colors')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')

const localEnv = require('dotenv').config()

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
    hot: true,
    writeToDisk: true,
    historyApiFallback: true
  },
  entry: { src: path.resolve('src') },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.jpg', '.svg', '.gif']
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff(2)?|jpe?g|gif|png|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true
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
    new HtmlWebpackPlugin({
      template: path.resolve('..', 'shared', 'react', 'template.pug'),
      inject: true,
      publicPath: '/',
      scriptLoading: 'async',
      cache: false,
      templateLocals: {
        title: localEnv.parsed.APP_NAME
      }
    }),
    new EnvironmentPlugin({
      IS_SERVER: false,
      APP_NAME: localEnv.parsed.APP_NAME,
      PROFILE_IMG_SRC: localEnv.parsed.PROFILE_IMG_SRC,
      COPYRIGHT_ENTITY: localEnv.parsed.COPYRIGHT_ENTITY,
      SITE_CONTACT_EMAIL: localEnv.parsed.SITE_CONTACT_EMAIL,

      APP_ROOT_PATH:
        process.env.NODE_ENV === 'development'
          ? '/'
          : `https://${
              process.env.COPYRIGHT_ENTITY
            }/apps/${process.env.APP_NAME.toLowerCase().replace(/\s+/gi, '')}/`
    })
  ]
}
