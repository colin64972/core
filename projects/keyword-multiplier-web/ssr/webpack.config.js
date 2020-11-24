const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const { setPreRenderFilePublicPath } = require('@cjo3/shared/raw/general')
const path = require('path')

const localEnv = require('dotenv').config()
const sharedEnv = require('dotenv').config({
  path: path.resolve('..', 'shared', '.env')
})

const babelLoaderPlugins =
  process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : []

module.exports = {
  entry: {
    ThemedApp: path.resolve('src', 'ThemedApp.js'),
    store: path.resolve('src', 'store', 'index.js')
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
      '.svg'
    ]
  },
  externals: ['react', 'react-redux', 'react-router', /@material-ui\/.*/gi],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
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
      API_URL: process.env.API_URL_PRO,
      APP_ROOT_PATH: localEnv.parsed.APP_ROOT_PATH,
      AUTH_SECRET: sharedEnv.parsed.AUTH_SECRET,
      CDN_APP_FOLDER: localEnv.parsed.CDN_APP_FOLDER,
      CDN_URL: localEnv.parsed.CDN_URL,
      COPYRIGHT_ENTITY: localEnv.parsed.COPYRIGHT_ENTITY,
      GA_TAG: process.env.GA_TAG,
      JWT_PRIVATE_KEY: sharedEnv.parsed.JWT_PRIVATE_KEY,
      SITE_CONTACT_EMAIL: localEnv.parsed.SITE_CONTACT_EMAIL,
      SITE_NAME: localEnv.parsed.SITE_URL.replace(
        /^\w+:\/{2}(\w+.\w{2,3})(.*)$/i,
        '$1'
      ),
      SITE_URL: localEnv.parsed.SITE_URL,
      STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY_LIVE
    })
  ]
}
