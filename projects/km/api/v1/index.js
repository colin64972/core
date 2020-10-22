import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'

import { createTrial } from './trials'
import { getMeta, preOrder, getVolumes, alertLowCredits } from './metrics'

const checkAuthorization = (authHeader, callback) => {
  if (authHeader !== 'secret')
    return callback(null, {
      statusCode: 401
    })
}

const addCorsHeaders = res => ({
  ...res,
  'Access-Control-Allow-Origin': [process.env.CORS_LOCAL_ORIGIN],
  'Access-Control-Allow-Credentials': true
})

export const createTrialHandler = middy(async (event, context, callback) => {
  checkAuthorization(event.headers?.authorization, callback)
  let slsRes = await createTrial(event.body)
  slsRes = addCorsHeaders(slsRes)
  return callback(null, slsRes)
}).use(jsonBodyParser())

export const getMetaHandler = async (event, context, callback) => {
  checkAuthorization(event.headers?.authorization, callback)
  let slsRes = await getMeta(event.queryStringParameters)
  slsRes = addCorsHeaders(slsRes)
  return callback(null, slsRes)
}

export const preOrderHandler = middy(async (event, context, callback) => {
  checkAuthorization(event.headers?.authorization, callback)
  let slsRes = await preOrder(event.body)
  slsRes = addCorsHeaders(slsRes)
  return callback(null, slsRes)
}).use(jsonBodyParser())

export const getVolumesHandler = middy(async (event, context, callback) => {
  checkAuthorization(event.headers?.authorization, callback)
  let slsRes = await getVolumes(event.body)
  slsRes = addCorsHeaders(slsRes)
  return callback(null, slsRes)
}).use(jsonBodyParser())

export const lowCreditsAlertHandler = middy(
  async (event, context, callback) => {
    checkAuthorization(event.headers?.authorization, callback)
    let slsRes = await alertLowCredits(event.body)
    slsRes = addCorsHeaders(slsRes)
    return callback(null, slsRes)
  }
).use(jsonBodyParser())
