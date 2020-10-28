import colors from 'colors'
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { minify } from 'html-minifier'
import { fetchBundleFile } from '@cjo3/shared/serverless/fetchers'
import renderedReact from './templates/renderedReact.pug'

const renderMarkup = (html, css) => {
  const locals = {
    title: 'SSR Rendered App Page',
    appStyle: css,
    appMarkup: html
  }
  const markup = renderedReact(locals)
  return markup
}

const renderApp = async (app, path) => {
  try {
    const renderFile = await fetchBundleFile(app, 'preRenders.js')

    const { preRenders } = eval(renderFile)

    return renderMarkup(preRenders[path].html, preRenders[path].css)
  } catch (error) {
    console.error('ERROR renderPage'.red, error)
    throw error
  }
}

const handler = async (event, context, callback) => {
  let res = {}

  try {
    const { body } = event

    const content = await renderApp(body.app, body.path)

    res = {
      statusCode: 200,
      headers: {
        'cache-control': 'max-age=100',
        'content-type': 'text/html'
      },
      body: minify(content, {
        minifyCSS: true
      })
    }
  } catch (error) {
    res = {
      statusCode: 500,
      body: JSON.stringify(error.message)
    }
  } finally {
    return callback(null, res)
  }
}

export const testHandler = middy(handler).use(jsonBodyParser())
