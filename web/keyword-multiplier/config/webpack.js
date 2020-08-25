const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const setReact = require('@colin30/configs/react')
const { setTemplateLocals } = require('@colin30/web-shared/helpers')

const webpack = setReact(
  { src: path.resolve('src', 'index') },
  path.resolve('static')
)

webpack.plugins.push(
  new CleanWebpackPlugin({ verbose: true }),
  new HtmlWebpackPlugin({
    template: path.resolve('..', 'shared', 'template.pug'),
    inject: true,
    scriptLoading: 'defer',
    cache: false,
    templateLocals: setTemplateLocals({
      title: process.env.npm_package_config_template_title
    })
  })
)

module.exports = webpack
