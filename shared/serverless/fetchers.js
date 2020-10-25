import { get } from 'axios'

const evalScriptString = (code, fileName) => {
  const result = eval(code)
  if (result[fileName]) return result[fileName]
}

export const fetchBundleFile = async fileName => {
  try {
    const res = await get(`http://localhost:8002/${fileName.toLowerCase()}.js`)
    return evalScriptString(res.data, fileName)
  } catch (error) {
    console.error('fetchBundleFile', error)
  }
}
