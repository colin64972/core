const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const {
  setFileOutputPath,
  setFilePublicPath
} = require('@cjo3/shared/raw/general')

const localEnv = require('dotenv').config()
const sharedEnv = require('dotenv').config({
  path: path.resolve('..', 'shared', '.env')
})

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    src: path.resolve('src', 'index.ts')
  },
  devServer: {
    contentBase: path.resolve('dist'),
    publicPath: '/',
    compress: true,
    port: 8001,
    hot: true,
    writeToDisk: true,
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  target: 'web',
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.json',
      '.png',
      '.jpg',
      '.svg',
      '.gif'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.pug$/,
        exclude: /(node_modules)/,
        loader: 'pug-loader'
      },
      {
        test: /\.(woff(2)?|jpg|gif|png|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true,
              name: '[folder]/[name].[ext]',
              outputPath: setFileOutputPath,
              publicPath: setFilePublicPath
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist')
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new HtmlWebpackPlugin({
      template: path.resolve('..', 'shared', 'react', 'template.pug'),
      inject: true,
      scriptLoading: 'defer',
      cache: false,
      templateLocals: {
        title: 'Hello'
      }
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 75
          }
        }
      ],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true
    }),
    new EnvironmentPlugin({
      APP_ROOT_PATH: localEnv.parsed.APP_ROOT_PATH,
      APP_NAME: localEnv.parsed.APP_NAME,
      ACCEPTED_FILETYPES: localEnv.parsed.ACCEPTED_FILETYPES,
      EXPORT_PRICE: localEnv.parsed.EXPORT_PRICE,
      USE_MOCKS: localEnv.parsed.USE_MOCKS,
      SITE_CONTACT_EMAIL: localEnv.parsed.SITE_CONTACT_EMAIL,
      SITE_NAME: localEnv.parsed.SITE_NAME,
      SITE_URL: localEnv.parsed.SITE_URL,
      STRIPE_PUBLIC_KEY: localEnv.parsed.STRIPE_PUBLIC_KEY_TEST,
      STRIPE_URL: localEnv.parsed.STRIPE_URL,
      API_URL: localEnv.parsed.API_URL,
      AUTH_SECRET: sharedEnv.parsed.AUTH_SECRET,
      JWT_PRIVATE_KEY: sharedEnv.parsed.JWT_PRIVATE_KEY
    })
  ]
}
