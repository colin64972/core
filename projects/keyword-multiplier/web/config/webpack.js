require('dotenv').config()
const path = require('path')
const { setWebConfig, setNodeConfig } = require('@cjo3/configs/react')
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

const nodeConfig = setNodeConfig(
  {
    index: path.resolve('src', 'preRenders')
  },
  path.resolve('distPreRenders'),
  setPreRenderFilePublicPath
)

const envVars = new EnvironmentPlugin({
  SITE_NAME: process.env.SITE_URL.replace(
    /^\w+:\/{2}(\w+.\w{2,3})(.*)$/i,
    '$1'
  ),
  SITE_URL: process.env.SITE_URL,
  SITE_CONTACT_EMAIL: process.env.SITE_CONTACT_EMAIL,
  COPYRIGHT_ENTITY: process.env.COPYRIGHT_ENTITY,
  CDN_URL: process.env.CDN_URL,
  CDN_APP_FOLDER: process.env.CDN_APP_FOLDER,
  APP_ROOT_PATH: process.env.APP_ROOT_PATH
})

webConfig.plugins.push(envVars)
nodeConfig.plugins.push(envVars)

exports.webConfig = webConfig
exports.nodeConfig = nodeConfig
