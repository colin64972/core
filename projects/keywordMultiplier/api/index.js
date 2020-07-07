import { createTrial } from './trials'
import { getKeData } from './keywordsEverywhere'

const checkAuthorization = (authHeader, callback) => {
  if (authHeader !== 'secret')
    return callback(null, {
      statusCode: 401
    })
}

export const createTrialHandler = async (event, context, callback) => {
  // checkAuthorization(event.headers?.Authorization, callback)
  const slsRes = await createTrial(event.body)
  return callback(null, slsRes)
}

export const getKeDataHandler = async (event, context, callback) => {
  // checkAuthorization(event.headers?.Authorization, callback)
  const slsRes = await getKeData(event.queryStringParameters)
  return callback(null, slsRes)
}
