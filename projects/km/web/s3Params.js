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

exports.nodeParams = {
  // dryrun: false,
  srcPath: 'distNode',
  s3Path: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}/node`,
  excludes: ['*.html']
}

exports.deleteParams = {
  // dryrun: false,
  keyPath: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`
}
