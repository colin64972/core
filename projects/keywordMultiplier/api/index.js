import { createTrial } from './trials'
import { getMeta, orderMetrics } from './keywordsEverywhere'

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

export const orderMetricsHandler = async (event, context, callback) => {
  const slsRes = await orderMetrics(event.body)
  return callback(null, slsRes)
}
