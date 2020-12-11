require('dotenv').config()

exports.content = {
  // dryrun: true,
  srcPath: 'distContent',
  s3Path:
    process.env.NODE_ENV === 'staging'
      ? `${process.env.CDN_BUCKET_STA}/${process.env.CDN_APP_FOLDER}/`
      : `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}/`,
  excludes: []
}

exports.invalidate = {
  id:
    process.env.NODE_ENV === 'staging'
      ? process.env.STA_CDN_ID
      : process.env.CDN_ID,
  paths: '/*'
}

exports.clear = {
  // dryrun: false,
  keyPath:
    process.env.NODE_ENV === 'staging'
      ? `${process.env.CDN_BUCKET_STA}/${process.env.CDN_APP_FOLDER}`
      : `${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}`
}
