require('dotenv').config()

exports.web = {
  // dryrun: true,
  srcPath: 'dist',
  s3Path: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`,
  excludes: ['*.html']
}

exports.js = {
  // dryrun: true,
  srcPath: 'dist',
  s3Path: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`,
  excludes: ['*.html', '*jpg', '*.png', '*.webp', '*.svg', '*.gif']
}

exports.preRenders = {
  // dryrun: true,
  srcPath: 'distPreRenders',
  s3Path: `${process.env.PRERENDERS_BUCKET}/${process.env.CDN_APP_FOLDER}`,
  includes: ['*.js']
}

exports.invalidate = {
  id: process.env.CDN_ID,
  paths: '/*'
}
