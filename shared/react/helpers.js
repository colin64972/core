import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheets } from '@material-ui/core/styles'
import crypto from 'crypto'
import ReactGA from 'react-ga'
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

export const setChunkPublicPath = path =>
  process.env.NODE_ENV === 'production' ? path : ''

export const switchLinkRoutePath = (devPath, prodPath) =>
  process.env.NODE_ENV === 'production' ? prodPath : devPath

export const removeAppUrlPrefix = (path, prefix) => {
  let result = path.replace(prefix, '')
  if (result === '') return '/'
  return result
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
  tracker.pageHit = (pathname, search, rootPath) => {
    const path = removeAppUrlPrefix(pathname, rootPath)
    ReactGA.pageview(`${path}${search}`)
  }
  tracker.eventHit = () => {
    console.log('%c ga eventHit', 'color: yellow; font-size: large')
  }
  return tracker
}

const renderPage = (path, app, store) => {
  const sheets = new ServerStyleSheets()

  const render = renderToString(
    sheets.collect(
      createElement(
        Provider,
        {
          store
        },
        createElement(
          StaticRouter,
          {
            location: path,
            context: {}
          },
          app
        )
      )
    )
  )

  const html = render
  const css = sheets.toString()
  const state = store.getState()

  return { html, css, state }
}

export const generatePreRenders = (pages, app, store) =>
  pages.reduce((acc, cur) => {
    let temp = acc

    const renderedPage = renderPage(cur, app, store)

    temp[cur] = {
      html: renderedPage.html,
      css: renderedPage.css,
      state: renderedPage.state
    }
    return temp
  }, {})
