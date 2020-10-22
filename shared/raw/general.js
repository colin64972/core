exports.setTemplateLocals = (args = {}) => ({
  ...args,
  noScript: 'Please enable JavaScript to view this webpage'
})

const assetFolderPath = 'media'

exports.setFileOutputPath = (url, resourcePath, context) =>
  `${assetFolderPath}/${url}`

exports.setFilePublicPath = (url, resourcePath, context) =>
  process.env.NODE_ENV === 'production'
    ? `${process.env.CDN_URL}/${process.env.CDN_APP_FOLDER}/${url}`
    : `${assetFolderPath}/${url}`
