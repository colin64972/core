const path = require('path')

exports.setTemplateLocals = (args = {}) => ({
  ...args,
  noScript: 'Please enable JavaScript to view this webpage'
})

exports.setFileOutputPath = (url, resourcePath, context) => `assets/${url}`

exports.setFilePublicPath = (url, resourcePath, context) =>
  process.env.NODE_ENV === 'production'
    ? `${process.env.CDN_URL}/${process.env.CDN_APP_FOLDER}/assets/${url}`
    : `/assets/${url}`

exports.setPreRenderFilePublicPath = (url, resourcePath, context) =>
  `${process.env.CDN_URL}/${process.env.CDN_APP_FOLDER}/assets/${url}`
