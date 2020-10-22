import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'

export const serveRoot = middy(async (event, context, callback) => {
  console.log('event', event)
  let slsRes = {}
  return callback(null, slsRes)
}).use(jsonBodyParser())
