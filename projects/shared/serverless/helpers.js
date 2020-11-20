import path from 'path'

export const switchPathPageName = appPath => {
  switch (appPath) {
    case undefined:
    case '':
    case '/':
      return 'home'
    case '/feedback':
      return 'feedback'
    case '/editor':
      return 'editor'
    case '/editor/guide':
      return 'editorGuide'
    default:
      return 'error'
  }
}

export const splitAppsList = envVar => envVar.split(',')

export const parseAppPage = (uri, appsList) => {
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
