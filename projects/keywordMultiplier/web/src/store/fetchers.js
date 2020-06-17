import { get, post } from 'axios'

const options = {
  headers: {
    Authorization: 'secret',
    Accept: 'application/json'
  }
}

export const fetchClientIp = async () =>
  await get('https://api.ipify.org?format=json', options)

export const postTrial = async payload => {
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV !== 'development') {
    url = 'https://apis.colin30.com/keyword-multiplier'
  }
  const res = await post(`${url}/trials`, payload, options)
  return res
}

export const fetchKeMeta = async () => {
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV !== 'development') {
    url = 'https://apis.colin30.com/keyword-multiplier'
  }
  const res = await get(`${url}/keywords-everywhere?resource=meta`, options)
  return res
}

export const fetchKeResource = async resource => {
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV !== 'development') {
    url = 'https://apis.colin30.com/keyword-multiplier'
  }
  const res = await get(
    `${url}/keywords-everywhere?resource=${resource}`,
    options
  )
  return res
}

export const fetchKeCredts = async () => {
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV !== 'development') {
    url = 'https://apis.colin30.com/keyword-multiplier'
  }
  const res = await get(`${url}/keywords-everywhere?resource=credits`, options)
  return res
}

export const fetchKeOptions = async () => {
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV !== 'development') {
    url = 'https://apis.colin30.com/keyword-multiplier'
  }
  const res = await get(`${url}/keywords-everywhere?resource=options`, options)
  return res
}
