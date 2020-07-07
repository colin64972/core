import { KeConstants } from '@colin30/shared/raw/constants/keywordMultiplier'
import { fetchKeData } from './fetchers'

export const getKeData = async queryStringParameters => {
  const { resource } = queryStringParameters

  let resources = KeConstants.ENDPOINTS[resource]

  const promises = resources.map(path => fetchKeData(path))

  try {
    const responses = await Promise.all(promises)

    const data = responses.reduce((acc, cur) => {
      let temp = acc
      const { url } = cur.config
      temp[url.substring(url.lastIndexOf('/') + 1)] = cur.data
      return temp
    }, {})

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    console.error('getKeData', error, error.response?.status)

    let statusCode = 500

    if (error.response?.status) {
      statusCode = error.response.status
    }

    return {
      statusCode,
      body: JSON.stringify(error.message)
    }
  }
}
