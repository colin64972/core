require('dotenv').config()
const path = require('path')
const { setConfig } = require('@cjo3/configs/react')
const {
  setFileOutputPath,
  setFilePublicPath
} = require('@cjo3/shared/raw/general')
const { EnvironmentPlugin } = require('webpack')

const baseConfig = setConfig(
  { src: path.resolve('src', 'index') },
  path.resolve('dist'),
  path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'shared',
    'react',
    'htmlPluginTemplate.pug'
  ),
  {
    title: process.env.TEMPLATE_TITLE
  },
  setFileOutputPath,
  setFilePublicPath
)

baseConfig.plugins.push(
  new EnvironmentPlugin({
    SITE_NAME: process.env.SITE_URL.replace(
      /^\w+:\/{2}(\w+.\w{2,3})(.*)$/i,
      '$1'
    ),
    SITE_URL: process.env.SITE_URL,
    SITE_CONTACT_EMAIL: process.env.SITE_CONTACT_EMAIL,
    COPYRIGHT_ENTITY: process.env.COPYRIGHT_ENTITY
  })
)

exports.config = baseConfig
