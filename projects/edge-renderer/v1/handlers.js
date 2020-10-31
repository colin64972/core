import colors from 'colors'
import { WWW_HOST } from '@cjo3/shared/raw/constants/regex'
import { generateRedirect, buildHtmlRes } from './helpers'
import { splitAppsList, parseAppPage } from '@cjo3/shared/serverless/helpers'

const appsList = splitAppsList(process.env.APPS_LIST)

export const viewerRequest = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const { request } = event.Records[0].cf

  if (!WWW_HOST.test(request.headers.host[0].value))
    return callback(null, request)

  const { uri, querystring } = request

  const res = generateRedirect(
    `https://${process.env.NEW_HOST}${uri}${
      querystring.length ? `?${querystring}` : ''
    }`
  )

  return callback(null, res)
}

export const originRequest = (event, context, callback) => {
  const { request, response } = event.Records[0].cf

  const host = request.headers.host[0].value
  const { uri, querystring } = request
  const { app, page, path, file } = parseAppPage(uri)

  if (file) {
    request.uri = `${path}${file}`
    return callback(null, request)
  }

  if (!appsList.includes(app)) return callback(new Error('no such app'))

  // return callback(null, request)
}
