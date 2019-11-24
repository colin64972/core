const path = require('path')
const setReact = require('@colin30/configs/react')
const { setTemplateLocals } = require('@colin30/web-shared/helpers')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const base = setReact(
  { src: path.resolve('src', 'index') },
  path.resolve('.dist'),
  'assets'
)

base.plugins.push(
  new CleanWebpackPlugin({ verbose: true }),
  new HtmlWebpackPlugin({
    template: path.resolve('..', 'shared', 'template.pug'),
    inject: true,
    scriptLoading: 'defer',
    templateLocals: setTemplateLocals([
      process.env.npm_package_config_template_title
    ])
  })
)

module.exports = base
