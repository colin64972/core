const path = require('path')
const setReact = require('@northtrend/configs/react')

const webpack = setReact(
  { src: path.resolve('src', 'index') },
  path.resolve('static'),
  path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'shared',
    'webpack',
    'htmlPluginTemplate.pug'
  ),
  {
    title: process.env.npm_package_config_template_title
  }
)

module.exports = webpack
