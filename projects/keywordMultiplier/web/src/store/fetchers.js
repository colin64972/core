import { get, post } from 'axios'

const options = {
  headers: {
    Authorization: 'secret',
    Accept: 'application/json'
  }
}

export const createTrial = async payload => {
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV !== 'development') {
    url = 'https://apis.colin30.com/keyword-multiplier'
  }
  const res = await post(`${url}/trials`, payload, options)
  return res
}

export const fetchKeData = async resource => {
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV !== 'development') {
    url = 'https://apis.colin30.com/keyword-multiplier'
  }
  const res = await get(`${url}/ke?resource=${resource}`, options)
  return res
}
