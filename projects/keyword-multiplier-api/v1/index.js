import colors from 'colors'
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { checkAuthorization } from '@cjo3/shared/security/authToken'
import { createTrial } from './trials'
import { getMeta, preOrder, getVolumes, alertLowCredits } from './metrics'

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
