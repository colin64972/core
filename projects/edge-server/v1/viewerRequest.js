import 'colors'
import { WWW_HOST } from '@cjo3/shared/raw/constants/regex'
import { generateRedirect } from './helpers'

export const handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const { request } = event.Records[0].cf

  const host = request.headers.host[0].value

  if (!WWW_HOST.test(request.headers.host[0].value))
    return callback(null, request)

  const { uri, querystring } = request

  const res = generateRedirect(
    `https://${host.replace('www.', '')}${uri}${
      querystring ? `?${querystring}` : ''
    }`
  )

  return callback(null, res)
}
