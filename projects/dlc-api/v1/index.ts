import colors from 'colors'
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { preOrder } from './preOrder'

export const preOrderHandler = middy(async (event, context, callback) => {
  return await preOrder(event.body, context.awsRequestId)
}).use(jsonBodyParser())
