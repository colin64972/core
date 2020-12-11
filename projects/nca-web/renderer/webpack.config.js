require('colors')
const path = require('path')
const { EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack')
const nodeExternals = require('webpack-node-externals')

const localEnv = require('dotenv').config()
const sharedEnv = require('dotenv').config({
  path: path.resolve('..', 'shared', '.env')
})

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    renderer: path.resolve('renderer', 'index.js')
  },
  output: {
    path: path.resolve('distRenderer'),
    filename: '[name].js'
  },
  target: 'node',
  resolve: {
    // alias: {
    //   modernizr$: path.resolve('.modernizrrc.js')
    // },
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
  externals: [nodeExternals()],
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
            ]
          }
        }
      },
      // {
      //   loader: 'webpack-modernizr-loader',
      //   test: /\.modernizrrc\.js$/
      // },
      {
        test: /\.(woff(2)?|jpg|gif|png|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              name: '[folder]/[name]-[contentHash].[ext]',
              publicPath: url => url
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HashedModuleIdsPlugin(),
    new EnvironmentPlugin({
      IS_SERVER: true,
      BUILD_ENV: localEnv.parsed.BUILD_ENV,
      APP_NAME: localEnv.parsed.APP_NAME,
      SITE_NAME: localEnv.parsed.SITE_NAME,
      SITE_URL: localEnv.parsed.SITE_URL,
      SITE_CONTACT_EMAIL: localEnv.parsed.SITE_CONTACT_EMAIL,
      RESUME_FILENAME: localEnv.parsed.RESUME_FILENAME,
      CDN_APP_FOLDER: localEnv.parsed.CDN_APP_FOLDER,
      CDN_URL_STA: localEnv.parsed.CDN_URL_STA,
      CDN_URL_PRO: localEnv.parsed.CDN_URL_PRO,
      JWT_PRIVATE_KEY: sharedEnv.parsed.JWT_PRIVATE_KEY,
      AUTH_SECRET: sharedEnv.parsed.AUTH_SECRET,
      API_URL: localEnv.parsed.API_URL_DEV
    })
  ]
}
