import { get } from 'axios'

export const fetchBundleFile = async fileName => {
  try {
    const res = await get(`http://localhost:8002/${fileName.toLowerCase()}.js`)
    return res.data
  } catch (error) {
    console.error('fetchBundleFile', error)
  }
}
