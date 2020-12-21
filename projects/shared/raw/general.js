const path = require('path')
const crypto = require('crypto')
const { v4 } = require('uuid')

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

exports.createHashId = () => {
  const hash = crypto.createHash('sha256')
  hash.update(v4())
  return hash.digest('hex').substr(0, 10)
}
