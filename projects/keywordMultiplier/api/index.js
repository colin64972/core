import { createTrial } from './trials'
import { getMeta, getMetrics } from './keywordsEverywhere'

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

export const getMetaHandler = async (event, context, callback) => {
  // checkAuthorization(event.headers?.Authorization, callback)
  const slsRes = await getMeta(event.queryStringParameters)
  return callback(null, slsRes)
}

export const getMetricsHandler = async (event, context, callback) => {
  const slsRes = await getMetrics(event.body)
  return callback(null, slsRes)
}
