import ReactGA from 'react-ga'
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

export const createHashId = () => {
  const hash = crypto.createHash('sha256')
  hash.update(uuidv4())
  return hash.digest('hex').substr(0, 10)
}

export const optionizeObject = input =>
  Object.entries(input).reduce(
    (acc, cur) => [
      ...acc,
      {
        key: createHashId(),
        value: cur[0],
        label: cur[1]
      }
    ],
    []
  )

export const getLabelFromValue = (value, source) => {
  if (source && Array.isArray(source)) {
    const found = source.find(item => item.value === value)
    return found?.label
  }
  return value
}

export const copyToClipboard = data => {
  try {
    let container = document.createElement('textarea')
    container.value = data
    document.body.appendChild(container)
    container.select()
    document.execCommand('copy')
    document.body.removeChild(container)
  } catch (error) {
    console.error('%c error', 'color: yellow; font-size: large', error.message)
    throw error
  }
}

export const switchLinkRoutePath = path =>
  process.env.NODE_ENV === 'production'
    ? `${process.env.APP_ROOT_PATH}${path}`
    : path

export const removeAppUrlPrefix = (prefix, path) => {
  let result = path.replace(prefix, '')
  if (process.env.CDN_APP_FOLDER === 'nca') return path
  if (result === '') return '/'
  return result.replace(/\/{2,}/g, '/')
}

export const setTracker = gaTag => {
  let tracker = {
    initialize: () => {},
    pageHit: () => {},
    eventHit: () => {}
  }

  if (!gaTag) return tracker

  const config = {
    gaTag
  }

  tracker.initialize = () => ReactGA.initialize(config.gaTag)
  tracker.pageHit = (rootPath, pathname) => {
    const loc = removeAppUrlPrefix(rootPath, pathname)
    ReactGA.pageview(loc)
  }
  tracker.eventHit = event => {
    ReactGA.event(event)
  }

  return tracker
}

export const setSrcSet = (paths, format = null) =>
  paths
    .reduce((acc, cur, ind) => {
      let result = acc
      let filePath = cur
      if (format === 'webp') {
        filePath = cur.replace(/.\w+$/i, '.webp')
      }
      result += `${filePath} ${ind + 1}x, `
      return result
    }, '')
    .replace(/,\s$/i, '')

export const clickWindowLink = (location, newTab = false) => {
  if (window && newTab) return window.open(location, '_blank')
  if (window) window.location.replace(location)
  return null
}

export function setHtml(text) {
  return { __html: text }
}
