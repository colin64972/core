require('dotenv').config()

exports.assets = {
  // dryrun: true,
  srcPath: 'dist',
  s3Path: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`,
  excludes: ['*.html', '*.js', '*.json']
}

exports.bundles = {
  // dryrun: true,
  srcPath: 'dist',
  s3Path: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}/bundles/`,
  excludes: ['*.html', '*jpg', '*.png', '*.webp', '*.svg', '*.gif', '*.json']
}

exports.preRenders = {
  // dryrun: true,
  srcPath: 'distPreRenders',
  s3Path: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}/pre-renders/`,
  includes: ['*.html']
}

exports.invalidate = {
  id: process.env.CDN_ID,
  paths: '/*'
}

exports.clear = {
  dryrun: false,
  keyPath: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`
}
