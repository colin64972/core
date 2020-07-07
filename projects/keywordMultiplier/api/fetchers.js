import { get } from 'axios'

export const fetchClientIp = async () => {
  try {
    const res = await get(
      `http://api.ipstack.com/check?access_key=${process.env.IPSTACK_API_KEY}&output=json`
    )
    if (res.data?.error) return res.data.error
    return res.data
  } catch (error) {
    console.error('fetchClientIp', error)
    return error.message
  }
}

export const fetchKeData = async path => {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.KE_API_KEY}`,
      Accept: 'application/json'
    }
  }
  return get(`https://api.keywordseverywhere.com/${path}`, options)
}
