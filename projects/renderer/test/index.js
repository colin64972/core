import colors from 'colors'
import path from 'path'
import fs from 'fs'
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { minify } from 'html-minifier'
import { fetchBundleFile } from '@cjo3/shared/serverless/fetchers'
import renderedReact from './templates/renderedReact.pug'

const renderPageMarkup = (html, css, state) => {
  const locals = {
    title: 'SSR Rendered App Page',
    appStyle: css,
    appMarkup: html,
    appState: state
  }

  const markup = renderedReact(locals)

  return markup
}

const renderAppPage = async (appName, pagePath) => {
  try {
    const localFilePath = path.resolve(
      `../${appName}/web/distPreRenders/preRenders.js`
    )

    const renderFile = fs.readFileSync(localFilePath).toString()

    const appPages = eval(renderFile.toString()).preRenders

    const { html, css, state } = appPages[pagePath]

    return renderPageMarkup(html, css, state)
  } catch (error) {
    console.error('ERROR renderPage'.red, error)
    throw error
  }
}

const handler = async (event, context, callback) => {
  let res = {}

  try {
    const { body } = event

    const content = await renderAppPage(body.appName, body.pagePath)

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
