require('dotenv').config()

exports.assets = {
  // dryrun: true,
  srcPath: 'dist',
  s3Path:
    process.env.NODE_ENV === 'staging'
      ? `${process.env.CDN_BUCKET_STA}/${process.env.CDN_APP_FOLDER}/`
      : `${process.env.CDN_BUCKET_PRO}/${process.env.CDN_APP_FOLDER}/`,
  excludes: ['*.html', '*.js', '*.json']
}

exports.bundles = {
  // dryrun: true,
  srcPath: 'dist',
  s3Path:
    process.env.NODE_ENV === 'staging'
      ? `${process.env.CDN_BUCKET_STA}/${process.env.CDN_APP_FOLDER}/bundles/`
      : `${process.env.CDN_BUCKET_PRO}/${process.env.CDN_APP_FOLDER}/bundles/`,
  excludes: ['*.html', '*jpg', '*.png', '*.webp', '*.svg', '*.gif', '*.json']
}

exports.content = {
  // dryrun: true,
  srcPath: 'distContent',
  s3Path:
    process.env.NODE_ENV === 'staging'
      ? `${process.env.CDN_BUCKET_STA}/${process.env.CDN_APP_FOLDER}/`
      : `${process.env.CDN_BUCKET_PRO}/${process.env.CDN_APP_FOLDER}/`,
  excludes: []
}

exports.preRenders = {
  // dryrun: true,
  srcPath: 'distPreRenders',
  s3Path:
    process.env.NODE_ENV === 'staging'
      ? `${process.env.CDN_BUCKET_STA}/${process.env.CDN_APP_FOLDER}/pre-renders/`
      : `${process.env.CDN_BUCKET_PRO}/${process.env.CDN_APP_FOLDER}/pre-renders/`,
  includes: ['*.html']
}

exports.invalidate = {
  id:
    process.env.NODE_ENV === 'staging'
      ? process.env.CDN_ID_STA
      : process.env.CDN_ID_PRO,
  paths: '/*'
}

exports.clear = {
  // dryrun: false,
  keyPath:
    process.env.NODE_ENV === 'staging'
      ? `${process.env.CDN_BUCKET_STA}/${process.env.CDN_APP_FOLDER}`
      : `${process.env.CDN_BUCKET_PRO}/${process.env.CDN_APP_FOLDER}`
}
