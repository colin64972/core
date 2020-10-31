require('dotenv').config()

exports.web = {
  // dryrun: false,
  srcPath: 'dist',
  s3Path: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`,
  excludes: ['*.html']
}

exports.preRenders = {
  // dryrun: false,
  srcPath: 'distPreRenders',
  s3Path: `${process.env.PRERENDERS_BUCKET}`,
  includes: ['*.js']
}

exports.invalidate = {
  id: process.env.CDN_ID,
  paths: '/*'
}
