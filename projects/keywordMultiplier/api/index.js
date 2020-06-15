import { createOne } from './trials'
import { fetchKeMeta } from './keywordsEverywhere'

const checkAuthorization = (authHeader, callback) => {
  if (authHeader !== 'secret')
    return callback(null, {
      statusCode: 401
    })
}

export const postTrial = async (event, context, callback) => {
  // checkAuthorization(event.headers?.Authorization, callback)
  const slsRes = await createOne(event.body)
  return callback(null, slsRes)
}

export const getMeta = async (event, context, callback) => {
  // checkAuthorization(event.headers?.Authorization, callback)
  const slsRes = await fetchKeMeta(event.queryStringParameters)
  return callback(null, slsRes)
}
