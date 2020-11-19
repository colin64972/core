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

  try {
    let secret = await preOrder(event.body, context.awsRequestId)

    return {
      statusCode: 200,
      body: JSON.stringify(secret)
    }
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify(error.message)
    }
  }
}).use(jsonBodyParser())
