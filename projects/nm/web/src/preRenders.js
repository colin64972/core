import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { AppElement } from './AppElement'

const renderPage = path => {
  const sheets = new ServerStyleSheets()

  const render = renderToString(
    sheets.collect(
      createElement(
        StaticRouter,
        {
          location: path,
          context: {}
        },
        AppElement
      )
    )
  )

  const html = render
  const css = sheets.toString()

  return { html, css }
}

const pages = ['/', '/feedback', '/*']

const preRenders = pages.reduce((acc, cur) => {
  let temp = acc

  const renderedPage = renderPage(cur)

  temp[cur] = {
    html: renderedPage.html,
    css: renderedPage.css
  }
  return temp
}, {})

export default preRenders
