const path = require('path')

exports.setTemplateLocals = (args = {}) => ({
  ...args,
  noScript: 'Please enable JavaScript to view this webpage'
})

exports.setFileOutputPath = (url, resourcePath, context) => `/${url}`

exports.setFilePublicPath = (url, resourcePath, context) => {
  console.log('LOG XXX'.yellow, process.env.NODE_ENV, url)
  process.env.NODE_ENV === 'production'
    ? `${process.env.CDN_URL}/${process.env.CDN_APP_FOLDER}/${url}`
    : `/${url}`
}
