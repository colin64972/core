import colors from 'colors'

import { checkAuthorization } from '@cjo3/shared/security/authToken'
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'

import { alertLowCredits, getMeta, getVolumes, preOrder } from './metrics'
import { createTrial } from './trials'

export const createTrialHandler = middy(async (event, context, callback) => {
  checkAuthorization(
    event.headers?.authorization,
    process.env.JWT_PRIVATE_KEY,
    process.env.AUTH_SECRET,
    callback
  )
  return await createTrial(event.body)
}).use(jsonBodyParser())

export const getMetaHandler = async (event, context, callback) => {
  checkAuthorization(
    event.headers?.authorization,
    process.env.JWT_PRIVATE_KEY,
    process.env.AUTH_SECRET,
    callback
  )
  return await getMeta(event.queryStringParameters)
}

export const preOrderHandler = middy(async (event, context, callback) => {
  checkAuthorization(
    event.headers?.authorization,
    process.env.JWT_PRIVATE_KEY,
    process.env.AUTH_SECRET,
    callback
  )
  return await preOrder(event.body)
}).use(jsonBodyParser())

export const getVolumesHandler = middy(async (event, context, callback) => {
  checkAuthorization(
    event.headers?.authorization,
    process.env.JWT_PRIVATE_KEY,
    process.env.AUTH_SECRET,
    callback
  )
  return await getVolumes(event.body)
}).use(jsonBodyParser())

export const lowCreditsAlertHandler = middy(
  async (event, context, callback) => {
    checkAuthorization(
      event.headers?.authorization,
      process.env.JWT_PRIVATE_KEY,
      process.env.AUTH_SECRET,
      callback
    )
    return await alertLowCredits(event.body)
  }
).use(jsonBodyParser())
