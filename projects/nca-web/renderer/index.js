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
    let file = fs.readFileSync(path.resolve('dist', 'index.html')).toString()
    const prodIndexHtml = file
    const scriptSrcs = prodIndexHtml.match(/src="\/([-._\w]+)">/gi)
    const bundleSrcs = scriptSrcs.map(src => {
      const srcFile = src.replace('src="', '').replace('">', '')
      switch (process.env.BUILD_ENV) {
        case 'production':
          return `${process.env.CDN_URL_PRO}/${process.env.CDN_APP_FOLDER}/bundles${srcFile}`
        case 'staging':
          return `${process.env.CDN_URL_STA}/${process.env.CDN_APP_FOLDER}/bundles${srcFile}`
        default:
          return srcFile
      }
    })
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
      bundles: [...bundleSrcs],
      html: render,
      css: sheets.toString(),
      state: store.getState()
    })
    const minifiedMarkup = minify(markup, {
      minifyCSS: true
    })
    const outputFolder = path.resolve('distPreRenders')
    if (!fs.existsSync(outputFolder)) {
      console.log('creating folder...'.blue)
      fs.mkdirSync(outputFolder)
    }

    fs.writeFileSync(
      `${outputFolder}/${locals[pagePath].fileName}.html`,
      minifiedMarkup
    )
    return res.json('pass')
  } catch (error) {
    console.log('ERROR server'.red, error)
    return res.status(500).json('fail')
  }
})

Loadable.preloadAll().then(() => {
  server.listen(port, () => {
    console.log('LOG renderer started'.yellow)
  })
})
