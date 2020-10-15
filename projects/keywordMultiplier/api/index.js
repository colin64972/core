import { createTrial } from './trials'
import {
  getMeta,
  preOrder,
  getVolumes,
  alertLowCredits
} from './keywordsEverywhere'

const checkAuthorization = (authHeader, callback) => {
  if (authHeader !== 'secret')
    return callback(null, {
      statusCode: 401
    })
}

const addCorsHeaders = res => ({
  ...res,
  'Access-Control-Allow-Origin': [process.env.LOCAL_ORIGIN],
  'Access-Control-Allow-Credentials': true
})

export const createTrialHandler = async (event, context, callback) => {
  checkAuthorization(event.headers?.authorization, callback)
  let slsRes = await createTrial(event.body)
  slsRes = addCorsHeaders(slsRes)
  return callback(null, slsRes)
}

export const getMetaHandler = async (event, context, callback) => {
  checkAuthorization(event.headers?.authorization, callback)
  let slsRes = await getMeta(event.queryStringParameters)
  slsRes = addCorsHeaders(slsRes)
  return callback(null, slsRes)
}

export const preOrderHandler = async (event, context, callback) => {
  checkAuthorization(event.headers?.authorization, callback)
  let slsRes = await preOrder(event.body)
  slsRes = addCorsHeaders(slsRes)
  return callback(null, slsRes)
}

export const getVolumesHandler = async (event, context, callback) => {
  checkAuthorization(event.headers?.authorization, callback)
  let slsRes = await getVolumes(event.body)
  slsRes = addCorsHeaders(slsRes)
  return callback(null, slsRes)
}

export const lowCreditsAlertHandler = async (event, context, callback) => {
  checkAuthorization(event.headers?.authorization, callback)
  let slsRes = await alertLowCredits(event.body)
  slsRes = addCorsHeaders(slsRes)
  return callback(null, slsRes)
}
