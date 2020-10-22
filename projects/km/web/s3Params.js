require('dotenv').config()

exports.createMedia = {
  bucketName: process.env.CDN_BUCKET,
  region: process.env.S3_REGION,
  acl: 'private'
}

exports.createStatic = {
  bucketName: process.env.S3_STATIC_SITE_BUCKET,
  region: process.env.S3_REGION,
  acl: 'public-read'
}

exports.deleteStatic = {
  bucketName: process.env.S3_STATIC_SITE_BUCKET,
  region: process.env.S3_REGION
}

exports.deleteMedia = {
  bucketName: process.env.CDN_BUCKET,
  region: process.env.S3_REGION
}

exports.syncMedia = {
  srcPath: process.env.MEDIA_FOLDER_PATH,
  s3Path: `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`,
  dryrun: false
}

exports.syncStatic = {
  srcPath: 'dist',
  s3Path: `${process.env.S3_STATIC_SITE_BUCKET}`,
  dryrun: false,
  recursive: false,
  includes: ['*.js', '*.html'],
  excludes: ['*']
}
