import { get } from 'axios'

export const fetchBundleFile = async (app, file) => {
  const filePath = file.toLowerCase()

  try {
    let uri = `http://localhost:8002/${filePath}`

    if (process.env.NODE_ENV === 'production') {
      uri = `https://${process.env.CDN_DOMAIN}/${app}/${filePath}`
    }

    const res = await get(uri)

    return res.data
  } catch (error) {
    console.error('ERROR fetchBundleFile'.red, error)
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
