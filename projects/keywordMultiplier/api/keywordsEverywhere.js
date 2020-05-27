import { get } from 'axios'

export const getOptions = async queryParams => {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.KEYWORDS_EVERYWHERE_API_KEY}`,
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
    return {
      statusCode: error.response.status,
      body: JSON.stringify(error)
    }
  }
}
