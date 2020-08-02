import { get } from 'axios'

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

export const fetchKeMeta = async path => {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.KE_API_KEY}`,
      Accept: 'application/json'
    }
  }
  return get(`https://api.keywordseverywhere.com/${path}`, options)
}
