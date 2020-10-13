require('dotenv').config()

exports.createParams = {
  bucketName: process.env.CDN_BUCKET,
  region: process.env.S3_REGION,
  acl: 'private'
}

exports.deleteParams = {
  bucketName: process.env.CDN_BUCKET,
  region: process.env.S3_REGION
}

exports.syncParams = {
  srcPath: process.env.MEDIA_FOLDER_PATH,
  s3Path: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`,
  dryrun: true
}
