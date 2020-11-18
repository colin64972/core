import colors from 'colors'
import middy from '@middy/core'
import { checkAuthorization } from '@cjo3/shared/security/authToken'
import jsonBodyParser from '@middy/http-json-body-parser'
import { preOrder } from './preOrder'

export const preOrderHandler = middy(async (event, context, callback) => {
  checkAuthorization(
    event.headers?.authorization,
    process.env.JWT_PRIVATE_KEY,
    process.env.AUTH_SECRET,
    callback
  )
  return await preOrder(event.body, context.awsRequestId)
}).use(jsonBodyParser())
