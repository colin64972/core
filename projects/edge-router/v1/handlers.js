import { WWW_HOST } from '@cjo3/shared/raw/constants/regex'

export const rootHandler = async (event, context, callback) => {
  const { method, querystring, uri } = event.Records[0].cf.request

  let { host } = event.Records[0].cf.request.headers

  host = host[0].value

  console.log('LOG rootHandler', host, uri, querystring, method)

  if (WWW_HOST.test(host))
    return callback(null, {
      status: '301',
      statusDescription: 'redirect',
      headers: {
        location: [
          {
            key: 'Location',
            value: `https://${process.env.HOST}${uri}${
              querystring.length ? `?${querystring}` : ''
            }`
          }
        ]
      }
    })

  const content = `
    <\!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Simple Lambda@Edge Static Content Response</title>
      </head>
      <body>
        <h1>Req Params</h1>
        <p><strong>method</strong> ${method}</p>
        <p><strong>host</strong> ${host}</p>
        <p><strong>uri</strong> ${uri}</p>
        <p><strong>querystring</strong> ${querystring}</p>
      </body>
    </html>
    `

  const response = {
    status: '200',
    statusDescription: 'OK',
    headers: {
      'cache-control': [
        {
          key: 'Cache-Control',
          value: 'max-age=100'
        }
      ],
      'content-type': [
        {
          key: 'Content-Type',
          value: 'text/html'
        }
      ]
    },
    body: content
  }

  return callback(null, response)
}
