import colors from 'colors'
import { WWW_HOST } from '@cjo3/shared/raw/constants/regex'
import { issueRedirect, getPreRender, buildHtmlRes } from './helpers'

export const viewerRequest = async (event, context, callback) => {
  console.log('LOG viewerRequest'.yellow, event.Records[0].cf.request)

  const { method, uri, querystring } = event.Records[0].cf.request

  let { host } = event.Records[0].cf.request.headers

  host = host[0].value

  let markup, htmlRes, res

  if (WWW_HOST.test(host)) {
    context.callbackWaitsForEmptyEventLoop = false
    res = issueRedirect(method, uri, querystring)
    return callback(null, res)
  }

  if (!uri.includes('/apps')) {
    context.callbackWaitsForEmptyEventLoop = false
    markup = `
      <html>
        <head>
          <title>Request Details</title>
        </head>
        <body>
          <h1>Request Details</h1>
          <p><bold>Method</bold>&nbsp;${method}</p>
          <p><bold>Host</bold>&nbsp;${host}</p>
          <p><bold>URI</bold>&nbsp;${uri}</p>
          <p><bold>Query String</bold>&nbsp;${querystring}</p>
        </body>
      </html>
    `
    htmlRes = buildHtmlRes(markup)
    return callback(null, htmlRes)
  }

  try {
    markup = await getPreRender(uri, process.env.APPS_LIST)

    htmlRes = buildHtmlRes(markup)

    return callback(null, htmlRes)
  } catch (error) {
    context.callbackWaitsForEmptyEventLoop = false
    return callback(new Error(error.message))
  }
}
