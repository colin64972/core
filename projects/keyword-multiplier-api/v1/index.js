import colors from 'colors'
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'

import { createTrial } from './trials'
import { getMeta, preOrder, getVolumes, alertLowCredits } from './metrics'

const checkAuthorization = (authHeader, callback) => {
  if (authHeader !== process.env.API_SECRET)
    return callback(null, {
      statusCode: 401
    })
}

export const createTrialHandler = middy(async (event, context, callback) => {
  checkAuthorization(event.headers?.authorization, callback)
  return await createTrial(event.body)
}).use(jsonBodyParser())

export const getMetaHandler = async (event, context, callback) => {
  checkAuthorization(event.headers?.authorization, callback)
  return await getMeta(event.queryStringParameters)
}

export const preOrderHandler = middy(async (event, context, callback) => {
  checkAuthorization(event.headers?.authorization, callback)
  return await preOrder(event.body)
}).use(jsonBodyParser())

export const getVolumesHandler = middy(async (event, context, callback) => {
  checkAuthorization(event.headers?.authorization, callback)
  return await getVolumes(event.body)
}).use(jsonBodyParser())

export const lowCreditsAlertHandler = middy(
  async (event, context, callback) => {
    checkAuthorization(event.headers?.authorization, callback)
    return await alertLowCredits(event.body)
  }
).use(jsonBodyParser())
