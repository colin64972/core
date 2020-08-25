import axios from 'axios'

const TRIALS_ENDPOINT = '/trials'
const IPIFY_ENDPOINT = 'https://api.ipify.org?format=json'

const fetcher = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://api.wordmultiplier.com'
      : 'http://localhost:4000'
})
fetcher.defaults.headers.common['Authorization'] = 'asdf'

export const postRequest = async (resource, payload) => {
  if (resource === 'trials') {
    try {
      const res = await fetcher.post(TRIALS_ENDPOINT, payload)
      if (res.status !== 201) throw new Error('trials api did not return 201')
      return res.data
    } catch (error) {
      console.log(err)
      return null
    }
  }
}

export const getRequest = async resource => {
  if (resource === 'ip') {
    try {
      const res = await axios.get(IPIFY_ENDPOINT)
      if (res.status !== 200) throw new Error('api.ipify.org did not return ip')
      return res.data.ip
    } catch (err) {
      console.log(err)
      return null
    }
  }
  return fetcher.get(resource)
}
