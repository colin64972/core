const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const { setPreRenderFilePublicPath } = require('@cjo3/shared/raw/general')
const path = require('path')

const localEnv = require('dotenv').config()
const sharedEnv = require('dotenv').config({
  path: path.resolve('..', 'shared', '.env')
})

const babelLoaderPlugins = []
// process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : []

module.exports = {
  entry: {
    ThemedApp: path.resolve('src', 'ThemedApp.ts'),
    store: path.resolve('src', 'store', 'index.ts')
  },
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
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
      '.css',
      '.gif',
      '.jpg',
      '.js',
      '.json',
      '.jsx',
      '.png',
      '.sass',
      '.svg',
      '.ts',
      '.tsx'
    ]
  },
  externals: [
    'canvas',
    'react',
    'react-redux',
    'react-router',
    /@material-ui\/.*/gi
  ],
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
      IS_NOT_SERVER: false,
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
      STRIPE_URL: localEnv.parsed.STRIPE_URL,
      PAYMENT_DISABLED: localEnv.parsed.PAYMENT_DISABLED
    })
  ]
}
