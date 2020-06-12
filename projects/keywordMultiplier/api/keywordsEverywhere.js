import { get } from 'axios'

export const fetchKeMeta = async () => {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.KE_API_KEY}`,
      Accept: 'application/json'
    }
  }

  const promises = [
    'v1/account/credits',
    'v1/countries',
    'v1/currencies'
  ].map(endpoint =>
    get(`https://api.keywordseverywhere.com/${endpoint}`, options)
  )

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
    console.error('fetchKeMeta', error, error.response?.status)

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
