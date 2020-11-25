require('dotenv').config()

exports.assets = {
  // dryrun: true,
  srcPath: 'dist',
  s3Path: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`,
  excludes: ['*.html', '*.js']
}

exports.bundles = {
  // dryrun: true,
  srcPath: 'dist',
  s3Path: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`,
  excludes: ['*.html', '*jpg', '*.png', '*.webp', '*.svg', '*.gif']
}

exports.renders = {
  // dryrun: true,
  srcPath: 'distRenders',
  s3Path: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}/renders/`,
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
