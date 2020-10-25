import { APP_PATH_MATCH } from '../raw/constants/regex'
import { fetchBundleFile } from './fetchers'

export const parsePathRequest = path => {
  const appName = path.replace(APP_PATH_MATCH, '$2')
  const appPath = path.replace(APP_PATH_MATCH, '$3')
  const result = {
    requestedApp: appName
  }
  if (appPath?.length) {
    result.requestedPath = appPath
  }
  return result
}

export const findMatchingApp = (name, appsList) =>
  appsList.split(',').some(app => app === name)

export const getNodeBundleFile = async (env, appName, fileName) => {
  if (env === 'production') {
  } else {
    try {
      const evaledCode = await fetchBundleFile(fileName)
      return evaledCode
    } catch (error) {
      console.error('fetchLocalAppFile', error)
    }
  }
}
