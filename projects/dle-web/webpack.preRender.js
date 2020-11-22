const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const { setPreRenderFilePublicPath } = require('@cjo3/shared/raw/general')

const localEnv = require('dotenv').config()
const sharedEnv = require('dotenv').config({
  path: path.resolve('..', 'shared', '.env')
})

const babelLoaderPlugins = []
// process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : []

module.exports = {
  entry: {
    [process.env.CDN_APP_FOLDER]: path.resolve('src', 'preRenders')
  },
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve('distPreRenders'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  performance: { hints: 'warning' },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.json',
      '.sass',
      '.css',
      '.png',
      '.jpg',
      '.svg',
      '.gif'
    ]
  },
  externals: ['canvas'],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current'
                  },
                  modules: 'commonjs'
                }
              ]
            ],
            plugins: babelLoaderPlugins
          }
        }
      },
      {
        test: /\.(woff(2)?|jpg|gif|png|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              name: '[folder]/[name].[ext]',
              publicPath: setPreRenderFilePublicPath
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new EnvironmentPlugin({
      IS_SERVER: true,
      ACCEPTED_FILETYPES: localEnv.parsed.ACCEPTED_FILETYPES,
      API_URL: localEnv.parsed.API_URL,
      APP_NAME: localEnv.parsed.APP_NAME,
      APP_ROOT_PATH: localEnv.parsed.APP_ROOT_PATH,
      AUTH_SECRET: sharedEnv.parsed.AUTH_SECRET,
      CDN_APP_FOLDER: localEnv.parsed.CDN_APP_FOLDER,
      EXPORT_PRICE: localEnv.parsed.EXPORT_PRICE,
      JWT_PRIVATE_KEY: sharedEnv.parsed.JWT_PRIVATE_KEY,
      SITE_CONTACT_EMAIL: localEnv.parsed.SITE_CONTACT_EMAIL,
      SITE_NAME: localEnv.parsed.SITE_NAME,
      SITE_URL: localEnv.parsed.SITE_URL,
      // STRIPE_PUBLIC_KEY: localEnv.parsed.STRIPE_PUBLIC_KEY_LIVE,
      STRIPE_PUBLIC_KEY: localEnv.parsed.STRIPE_PUBLIC_KEY_TEST,
      STRIPE_URL: localEnv.parsed.STRIPE_URL
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
    })
  ]
}
