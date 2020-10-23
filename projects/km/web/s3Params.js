require('dotenv').config()

exports.createParams = {
  bucketName: process.env.CDN_BUCKET,
  region: process.env.S3_REGION,
  acl: 'public-read'
}

exports.syncParams = {
  srcPath: 'dist',
  s3Path: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`,
  // dryrun: false,
  excludes: ['*.html']
}
