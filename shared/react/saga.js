import axios from 'axios'

const TRIALS_ENDPOINT = '/trials'
const IPIFY_ENDPOINT = 'https://api.ipify.org?format=json'

const fetcher = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://api.colin30.com/keyword-multiplier'
      : 'http://localhost:2000'
})
fetcher.defaults.headers.common['Authorization'] = 'asdf'

export const fetchKeMeta = async () =>
  await axios.get('http://localhost:2000/keywords-everywhere')

export const postRequest = async (resource, payload) =>
  fetcher.post(TRIALS_ENDPOINT, payload)

export const getRequest = async resource => {
  if (resource === 'ip') {
    try {
      const res = await axios.get(IPIFY_ENDPOINT)
      if (res.status !== 200) throw new Error('api.ipify.org did not return ip')
      return res.data.ip
    } catch (error) {
      console.error(error)
      return null
    }
  }
  return fetcher.get(resource)
}
