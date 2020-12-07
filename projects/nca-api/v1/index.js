import colors from 'colors'
import { checkAuthorization } from '@cjo3/shared/security/authToken'
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { sendMessage } from './messages'

export const contactHandler = middy(async (event, context, callback) => {
  // checkAuthorization(
  //   event.headers?.authorization,
  //   process.env.JWT_PRIVATE_KEY,
  //   process.env.AUTH_SECRET,
  //   callback
  // )
  let slsRes = await sendMessage(event.body)
  return slsRes
}).use(jsonBodyParser())
