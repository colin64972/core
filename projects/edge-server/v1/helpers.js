export const generateRedirect = targetUrl => ({
  status: 301,
  statusDescription: 'redirect to non-www',
  headers: {
    'location': [
      {
        key: 'location',
        value: targetUrl
      }
    ],
    'strict-transport-security': [
      {
        key: 'strict-transport-security',
        value: 'max-age=1'
      }
    ]
  }
})

export const buildHtmlRes = markup => ({
  status: 200,
  statusDescription: 'ok',
  headers: {
    'cache-control': [
      {
        key: 'cache-control',
        value: 'max-age=100'
      }
    ],
    'content-type': [
      {
        key: 'content-type',
        value: 'text/html'
      }
    ]
  },
  body: markup
})

export function findCdnAppFolder(uri, list, names) {
  if (/\/apps\/[\w\-]+/i.test(uri)) {
    const appPath = uri.replace('/apps/', '')

    const appName = appPath.includes('/')
      ? appPath.substring(0, appPath.indexOf('/'))
      : appPath

    switch (appName) {
      case names[1]:
        return {
          name: names[1],
          folder: list[1]
        }
      case names[2]:
        return {
          name: names[2],
          folder: list[2]
        }
      case names[3]:
        return {
          name: names[3],
          folder: list[3]
        }
      default:
        return {
          name: null,
          folder: null
        }
    }
  }

  return {
    name: names[0],
    folder: list[0]
  }
}

export function buildBucketKey(uri, list, names) {
  const { name, folder } = findCdnAppFolder(uri, list, names)

  let prefix
  let suffix
  let file = 'error.html'

  // nca
  if (name === names[0]) {
    if (uri === '/') {
      file = 'home.html'
    } else if (/\/resume\/?$/.test(uri)) {
      file = 'resume.html'
    } else if (/\/apps\/?$/.test(uri)) {
      file = 'apps.html'
    } else if (/\/contact\/?$/.test(uri)) {
      file = 'contact.html'
    }
  }

  // km
  if (name === names[1]) {
    prefix = `/apps/${names[1]}`
    if (uri === prefix || uri === `${prefix}/`) {
      file = 'home.html'
    }
  }

  // dle
  if (name === names[2]) {
    prefix = `/apps/${names[2]}`
    suffix = uri.replace(prefix, '')
    if (uri === prefix || uri === `${prefix}/`) {
      file = 'home.html'
    } else if (/\/converter\/?$/.test(suffix)) {
      file = 'converter.html'
    } else if (/\/converter\/guide\/?$/.test(suffix)) {
      file = 'converter-guide.html'
    }
  }

  // nebt
  if (name === names[3]) `${folder}/index.html`

  return `${folder}/pre-renders/${file}`
}
