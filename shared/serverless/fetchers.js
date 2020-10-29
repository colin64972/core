import { get } from 'axios'

export const fetchPreRendersFile = async appName => {
  const requestedApp = appName.toLowerCase()

  try {
    const res = await get(
      `${process.env.CDN_URL}/${requestedApp}/preRenders.js`
    )
    return res.data
  } catch (error) {
    console.error('ERROR fetchPreRendersFile'.red, error)
    throw error
  }
}

export const fetchPage = async (host, uri, querystring) => {
  try {
    console.log('LOG fetchPage', host, uri, querystring, method)
  } catch (error) {
    console.error('ERROR fetchPage')
  }
}
