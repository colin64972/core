import colors from 'colors'
import { WWW_HOST } from '@cjo3/shared/raw/constants/regex'
import { issueRedirect, getPreRender, buildHtmlRes } from './helpers'

export const viewerRequest = (event, context, callback) => {
  console.log('LOG viewerRequest'.yellow, event.Records[0].cf.request)

  context.callbackWaitsForEmptyEventLoop = false

  const { method, uri, querystring } = event.Records[0].cf.request

  let { host } = event.Records[0].cf.request.headers

  host = host[0].value

  let res = {
    status: 204,
    statusDescription: 'leaving to origin request'
  }

  if (WWW_HOST.test(host)) {
    res = issueRedirect(method, uri, querystring)
    return callback(null, res)
  }

  return callback(null, res)
}

export const originRequest = (event, context, callback) => {
  console.log('LOG originRequest', event.Records[0].cf.request)

  context.callbackWaitsForEmptyEventLoop = false

  const markup = `
    <html>
      <head>
        <title>Origin Request</title>
      </head>
      <body>
        <h1>Origin Request</h1>
        <p>${JSON.stringify(event.Records[0].cf.request, null, 2)}</p>
      </body>
    </html>
  `

  const htmlRes = buildHtmlRes(markup)

  return callback(null, htmlRes)
}

// if (!uri.includes('/apps')) {
//   context.callbackWaitsForEmptyEventLoop = false
//   markup = `
//     <html>
//       <head>
//         <title>Request Details</title>
//       </head>
//       <body>
//         <h1>Request Details</h1>
//         <p><bold>Method</bold>&nbsp;${method}</p>
//         <p><bold>Host</bold>&nbsp;${host}</p>
//         <p><bold>URI</bold>&nbsp;${uri}</p>
//         <p><bold>Query String</bold>&nbsp;${querystring}</p>
//       </body>
//     </html>
//   `
//   htmlRes = buildHtmlRes(markup)
//   return callback(null, htmlRes)
// }

// try {
//   markup = await getPreRender(uri, process.env.APPS_LIST)

//   htmlRes = buildHtmlRes(markup)

//   return callback(null, htmlRes)
// } catch (error) {
//   context.callbackWaitsForEmptyEventLoop = false
//   return callback(new Error(error.message))
// }
