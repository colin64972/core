import 'colors'
import Loadable from 'react-loadable'
import express from 'express'
import { createElement } from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { ThemedApp } from '../src/ThemedApp'
import { configureStore } from '../src/store/'
import { ServerStyleSheets } from '@material-ui/core/styles'
import pug from 'pug'
import { locals } from './locals'
import { minify } from 'html-minifier-terser'
import fs from 'fs'
import path from 'path'
import content from '../distContent/content.json'

const server = express()

const port = 3000

server.get('/', async (req, res) => {
  try {
    const { pagePath } = req.query
    const store = configureStore({ content })
    const App = createElement(
      StaticRouter,
      {
        location: pagePath,
        context: {}
      },
      createElement(Provider, { store }, ThemedApp)
    )
    const sheets = new ServerStyleSheets()
    const render = renderToString(sheets.collect(App))
    const markup = pug.renderFile(path.resolve('renderer', 'template.pug'), {
      ...locals[pagePath],
      bundles: [],
      html: render,
      css: sheets.toString(),
      state: store.getState()
    })
    const minifiedMarkup = minify(markup, {
      minifyCSS: true
    })
    console.log('LOG XXX'.yellow, minifiedMarkup)
    return res.json(render)
  } catch (error) {
    console.log('ERROR server'.red, error)
  }
})

Loadable.preloadAll().then(() => {
  server.listen(port, () => {
    console.log('LOG renderer started'.yellow)
  })
})
