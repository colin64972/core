require('dotenv').config()

exports.createParams = {
  // dryrun: false,
  bucketName: process.env.CDN_BUCKET,
  region: process.env.S3_REGION,
  acl: 'public-read'
}

exports.webParams = {
  // dryrun: false,
  srcPath: 'dist',
  s3Path: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`,
  excludes: ['*.html']
}

exports.deleteParams = {
  // dryrun: false,
  keyPath: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`
}

exports.preRendersParams = {
  // dryrun: false,
  srcPath: 'distPreRenders',
  s3Path: `${process.env.PRERENDERS_BUCKET}`,
  includes: ['*.js']
}
