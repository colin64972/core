import url from 'url'
import path from 'path'
import { APP_PATH_MATCH } from '../raw/constants/regex'

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

export const switchPathPageName = appPath => {
  switch (appPath) {
    case undefined:
    case '':
    case '/':
      return 'home'
    case '/feedback':
      return 'feedback'
    default:
      return 'error'
  }
}

export const splitAppsList = envVar => envVar.split(',')

export const parseAppPage = uri => {
  let result = {}

  const parsedUri = path.parse(uri)

  if (uri.includes('apps/')) {
    const match = uri.match(
      /(?<appPrefix>\/?apps\/)(?<appName>[a-z\-]+)(?<appPath>.*)$/i
    )

    result.app = match?.groups.appName

    result.page = switchPathPageName(match?.groups.appPath)

    return result
  }

  result.app = appsList[0]

  if (parsedUri.ext.length) {
    result.file = parsedUri.base

    result.path = `${parsedUri.dir}/`.replace(/\/*/i, '/')
  } else {
    result.path = `${parsedUri.dir}/${parsedUri.base}/`.replace(/\/*/, '/')
  }

  return result
}
