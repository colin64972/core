import { get } from 'axios'
import { evalScriptString } from './helpers'

export const fetchBundleFile = async fileName => {
  try {
    const res = await get(`http://localhost:8002/${fileName.toLowerCase()}.js`)
    return evalScriptString(res.data, fileName)
  } catch (error) {
    console.error('fetchBundleFile', error)
  }
}
