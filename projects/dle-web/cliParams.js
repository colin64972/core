require('dotenv').config()

exports.assets = {
  // dryrun: true,
  srcPath: 'dist',
  s3Path:
    process.env.NODE_ENV === 'staging'
      ? `${process.env.TEST_CDN_BUCKET}/${process.env.CDN_APP_FOLDER}/`
      : `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`,
  excludes: ['*.html', '*.js']
}

exports.bundles = {
  // dryrun: true,
  srcPath: 'dist',
  s3Path:
    process.env.NODE_ENV === 'staging'
      ? `${process.env.TEST_CDN_BUCKET}/${process.env.CDN_APP_FOLDER}/`
      : `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`,
  excludes: ['*.html', '*jpg', '*.png', '*.webp', '*.svg', '*.gif']
}

exports.preRenders = {
  // dryrun: true,
  srcPath: 'distPreRenders',
  s3Path:
    process.env.NODE_ENV === 'staging'
      ? `${process.env.TEST_CDN_BUCKET}/${process.env.CDN_APP_FOLDER}/pre-renders/`
      : `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}/pre-renders/`,
  includes: ['*.html']
}

exports.invalidate = {
  id: process.env.CDN_ID,
  paths: '/*'
}

exports.clear = {
  dryrun: false,
  keyPath:
    process.env.NODE_ENV === 'staging'
      ? `${process.env.TEST_CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`
      : `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`
}
