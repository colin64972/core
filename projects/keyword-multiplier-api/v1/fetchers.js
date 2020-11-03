import { get, post } from 'axios'

import { errorConstants } from '@cjo3/shared/serverless/errorConstants'

export const fetchGeoIp = async ipAddress => {
  try {
    const res = await get(
      `${process.env.IPS_URL}/${ipAddress}?access_key=${process.env.IPS_API_KEY}&output=json&fields=main`
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
  get(`${process.env.KE_API_URL}/${path}`, keHeaders)

export const fetchKeVolumes = async (
  country,
  currency,
  dataSource,
  keywordList
) => {
  try {
    const keywords = keywordList.map(keyword => `kw[]=${keyword}`).join('&')
    const res = await post(
      `${process.env.KE_API_URL}/v1/get_keyword_data`,
      `country=${country}&currency=${currency}&dataSource=${dataSource}&${keywords}`,
      keHeaders
    )

    if (res.status === 200) return res.data
    throw Error(res)
  } catch (error) {
    console.log('error', error)
    if (error?.response) throw Error(errorConstants.KE.ERROR_CODE)
  }
}
