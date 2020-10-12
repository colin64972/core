const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  apiVersion: '2006-03-01'
})

const create = async params => {
  try {
    const res = await s3.createBucket(params).promise()
    console.log('create', res)
  } catch (error) {
    console.error('create', error)
    return process.exit()
  }
}

const destroy = async params => {
  try {
    const res = await s3.deleteBucket(params).promise()
    console.log('destroy', res)
  } catch (error) {
    console.error('destroy', error)
    return process.exit()
  }
}

const sync = async (src, dest) => {}

module.exports = {
  create,
  destroy
}
