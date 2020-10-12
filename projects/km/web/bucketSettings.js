require('dotenv').config()

exports.createParams = {
  Bucket: process.env.S3_BUCKET_NAME,
  ACL: 'private',
  CreateBucketConfiguration: {
    LocationConstraint: process.env.S3_REGION
  },
  ObjectLockEnabledForBucket: false
}

exports.deleteParams = {
  Bucket: process.env.S3_BUCKET_NAME
}
