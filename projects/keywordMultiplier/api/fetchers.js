import { get, post } from 'axios'
import { errorConstants } from '@colin30/shared/serverless/errorConstants'

export const fetchGeoIp = async ipAddress => {
  try {
    const res = await get(
      `http://api.ipstack.com/${ipAddress}?access_key=${process.env.IPSTACK_API_KEY}&output=json`
    )
    if (res.data?.error) return res.data.error
    return res.data
  } catch (error) {
    console.error('fetchGeoIp', error)
    return error.message
  }
}

const keHeaders = {
  headers: {
    Authorization: `Bearer ${process.env.KE_API_KEY}`,
    Accept: 'application/json'
  }
}

export const fetchKeMeta = async path =>
  get(`https://api.keywordseverywhere.com/${path}`, keHeaders)

export const fetchKeMetrics = async (
  country,
  currency,
  dataSource,
  keywordList
) => {
  try {
    const keywords = keywordList.map(keyword => `kw[]=${keyword}`).join('&')
    const res = await post(
      'https://api.keywordseverywhere.com/v1/get_keyword_data',
      `country=${country}&currency=${currency}&dataSource=${dataSource}&${keywords}`,
      keHeaders
    )

    if (res.status === 200) return res.data
    throw Error(res)
  } catch (error) {
    // console.log('error', error)
    if (error?.response) throw Error(errorConstants.THIRD_PARTY.ERROR_CODE)
  }
}
