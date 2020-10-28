import colors from 'colors'
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { fetchBundleFile } from '@cjo3/shared/serverless/fetchers'
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'

const renderApp = async (app, page) => {
  try {
    const appFile = await fetchBundleFile(app, 'App.js')

    const { App } = eval(appFile)

    const result = renderToString(createElement(App))

    return result
  } catch (error) {
    console.error('ERROR renderPage'.red, error)
    throw error
  }
}

const handler = async (event, context, callback) => {
  let res = {}

  try {
    const { body } = event

    const markup = await renderApp(body.app, body.page)

    res = {
      statusCode: 200,
      body: JSON.stringify(markup)
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
