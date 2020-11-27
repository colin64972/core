import 'colors'
import express from 'express'
import Loadable from 'react-loadable'
import { createElement } from 'react'
import { StaticRouter } from 'react-router-dom'
import { ThemedApp } from '../src/ThemedApp'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { setReduxStore } from '../src/store/'
import { locals } from './locals'
import { minify } from 'html-minifier-terser'
import stats from '../dist/react-loadable.json'
import pug from 'pug'
import fs from 'fs'
import path from 'path'
import { ServerStyleSheets } from '@material-ui/core/styles'

const server = express()

const port = 3000

server.get('/', (req, res) => {
  const outputFolder = path.resolve('distPreRenders')

  const { renderPath } = req.query

  let location = renderPath

  let file = fs.readFileSync(path.resolve('dist', 'index.html')).toString()

  const prodIndexHtml = file

  const scriptSrcs = prodIndexHtml.match(/src="\/([-._\w]+)">/gi)

  const bundleSrcs = scriptSrcs.map(src => {
    const srcFile = src.replace('src="', '').replace('">', '')
    return `${process.env.TEST_CDN_URL}/${process.env.CDN_APP_FOLDER}${srcFile}`
  })

  const sheets = new ServerStyleSheets()

  const store = setReduxStore()

  const App = createElement(
    StaticRouter,
    { location, context: {} },
    createElement(Provider, { store }, ThemedApp)
  )

  const render = renderToString(sheets.collect(App))

  const preLoadedModules = Object.entries(stats).reduce((acc, cur) => {
    let temp = acc
    const items = cur[1].filter(module =>
      module.file.includes(locals[location]?.chunkNames)
    )
    if (items.length > 0) {
      items.forEach(item => temp.push(item.publicPath))
    }
    return temp
  }, [])

  const dedupedChunkPaths = [...new Set(preLoadedModules)]

  const markup = pug.renderFile(path.resolve('renderer', 'template.pug'), {
    ...locals[renderPath],
    bundles: [...dedupedChunkPaths, ...bundleSrcs],
    html: render,
    css: sheets.toString(),
    state: store.getState()
  })

  const minifiedMarkup = minify(markup, {
    minifyCSS: true
  })

  if (!fs.existsSync(outputFolder)) {
    console.log('creating folder...'.blue)
    fs.mkdirSync(outputFolder)
  }

  fs.writeFileSync(
    `${outputFolder}/${locals[renderPath].fileName}.html`,
    minifiedMarkup
  )

  return res.json('ok')
})

Loadable.preloadAll().then(() => {
  server.listen(port, () => {
    console.log('LOG renderer started'.yellow)
  })
})
