require('dotenv').config()
const path = require('path')
const { setWebConfig, setPreRenderConfig } = require('@cjo3/configs/react')
const {
  setFileOutputPath,
  setFilePublicPath,
  setPreRenderFilePublicPath
} = require('@cjo3/shared/raw/general')
const { EnvironmentPlugin } = require('webpack')

const webConfig = setWebConfig(
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

const preRendersConfig = setPreRenderConfig(
  {
    preRenders: path.resolve('src', 'preRenders')
  },
  path.resolve('distPreRenders'),
  setPreRenderFilePublicPath
)

const envVars = new EnvironmentPlugin({
  CDN_BUCKET: process.env.CDN_BUCKET,
  CDN_APP_FOLDER: process.env.CDN_APP_FOLDER,
  COPYRIGHT_ENTITY: process.env.COPYRIGHT_ENTITY
})

webConfig.plugins.push(envVars)
preRendersConfig.plugins.push(envVars)

exports.webConfig = webConfig
exports.preRendersConfig = preRendersConfig
