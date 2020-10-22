const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = (slswEntries, addPug = false) => {
  const config = {
    target: 'node',
    mode: 'production',
    entry: slswEntries,
    optimization: { minimize: true },
    performance: { hints: 'warning' },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        node: true
                      },
                      modules: 'commonjs'
                    }
                  ]
                ]
              }
            }
          ]
        }
      ]
    },
    output: {
      libraryTarget: 'commonjs2',
      path: path.resolve('dist'),
      filename: '[name].js'
    }
  }

  if (addPug) {
    config.module.rules.push({
      test: /\.pug$/,
      exclude: /(node_modules)/,
      loader: 'pug-loader'
    })
  }

  return config
}
