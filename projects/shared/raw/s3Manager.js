const awsCli = require('aws-cli-js')
const colors = require('colors')
const Aws = awsCli.Aws

const aws = new Aws()

const create = async ({ bucketName, region, acl }) => {
  try {
    let params = `s3api create-bucket --bucket ${bucketName} --region ${region} --create-bucket-configuration LocationConstraint=${region} --acl ${acl}`
    const result = await aws.command(params)
    if (!result.raw) throw Error('no raw results')
    console.log('PASS', result.object)
  } catch (error) {
    return process.exit()
  }
}

const rm = async ({ keyPath, dryrun = true }) => {
  try {
    let params = `s3 rm s3://${keyPath} --recursive`
    if (dryrun) {
      params += ' --dryrun'
    }
    const result = await aws.command(params)
    console.log('PASS', result.raw)
  } catch (error) {
    return process.exit()
  }
}

const sync = async ({ srcPath, s3Path, dryrun = false, excludes = [] }) => {
  try {
    let params = `s3 sync ${srcPath} s3://${s3Path}`

    if (excludes.length > 0) {
      excludes.forEach(pattern => (params += ` --exclude "${pattern}"`))
    }

    if (dryrun) {
      params += ' --dryrun'
    }

    const result = await aws.command(params)

    if (!result.raw) throw Error('no raw results')

    console.log('PASS sync'.green, result.raw)
  } catch (error) {
    console.log('FAIL sync'.red, error)
  }
  return process.exit()
}

const invalidate = async ({ id, paths }) => {
  console.log('params'.yellow, id, paths)
  try {
    let params = `cloudfront create-invalidation --distribution-id ${id} --paths "${paths}"`

    const result = await aws.command(params)

    console.log('PASS invalidate'.green, result.raw)
  } catch (error) {
    console.log('FAIL invalidate'.red, error)
  }
  return process.exit()
}

const copy = async ({ dryrun, srcPath, s3Path }) => {
  try {
    let params = `s3 cp ${srcPath} s3://${s3Path}`

    const result = await aws.command(params)

    console.log('PASS copy'.green, result.raw)
  } catch (error) {
    console.log('FAIL copy'.red, error)
  }
  return process.exit()
}

module.exports = {
  create,
  rm,
  sync,
  invalidate,
  copy
}
