require('dotenv').config()

exports.invalidate = {
  id: process.env.CF_DIST_NM_ID,
  paths: '/*'
}
