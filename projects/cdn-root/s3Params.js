require('dotenv').config()

exports.webParams = {
  // dryrun: false,
  srcPath: 'dist',
  s3Path: `${process.env.CDN_BUCKET}`
}
