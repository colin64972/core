// import colors from 'colors'
import { WWW_HOST } from '@cjo3/shared/raw/constants/regex'
import { generateRedirect, buildHtmlRes } from './helpers'

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

  context.callbackWaitsForEmptyEventLoop = false

  const markup = `
    <html>
      <head>
        <title>Origin Request</title>
      </head>
      <body>
        <h1>Origin Request</h1>
        <p>${JSON.stringify(request, null, 2)}</p>
        <h1>Origin Response</h1>
        <p>${JSON.stringify(response, null, 2)}</p>
      </body>
    </html>
  `

  const htmlRes = buildHtmlRes(markup)

  // return callback(null, htmlRes)

  return callback(null, request)
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

// response.headers['strict-transport-security'] = [
//   {
//     key: 'strict-transport-security',
//     value: 'max-age=1'
//   }
// ]
