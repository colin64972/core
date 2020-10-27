import { fetchPage } from './fetchers'
import { WWW_HOST } from '@cjo3/shared/raw/constants/regex'

export const rootHandler = async (event, context, callback) => {
  const { method, querystring, uri } = event.Records[0].cf.request

  let { host } = event.Records[0].cf.request.headers

  host = host[0].value

  if (WWW_HOST.test(host))
    return {
      status: 301,
      headers: {
        location: `https://${process.env.HOST}${uri}`
      }
    }

  return fetchPage(host, uri, querystring, method)
}
