require('colors')
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { createElement } = require('react')
const { Provider } = require('react-redux')
const { StaticRouter } = require('react-router-dom')
const { ServerStyleSheets } = require('@material-ui/core/styles')
const { renderToString } = require('react-dom/server')
const { minify } = require('html-minifier')
const pug = require('pug')

const renderPath = url => {
  const outputFolder = path.resolve('distRenders')
  try {
    let file = fs
      .readFileSync(path.resolve('distPreRenders', 'ThemedApp.js'))
      .toString()
    let evalled = eval(file)
    const { ThemedApp } = evalled

    file = fs
      .readFileSync(path.resolve('distPreRenders', 'store.js'))
      .toString()
    evalled = eval(file)
    const { setReduxStore } = evalled
    const store = setReduxStore()

    file = fs.readFileSync(path.resolve('dist', 'index.html')).toString()
    const prodIndexHtml = file

    const scriptSrcs = prodIndexHtml.match(/src=\"\/([-._\w]+)\"\>/gi)

    const bundleSrcs = scriptSrcs.map(src => {
      const srcFile = src.replace('src="', '').replace('">', '')
      switch (process.env.NODE_ENV) {
        case 'production':
          return `${process.env.CDN_URL}/${process.env.CDN_APP_FOLDER}${srcFile}`
        case 'staging':
          return `${process.env.TEST_CDN_URL}/${process.env.CDN_APP_FOLDER}${srcFile}`
        default:
          return srcFile
      }
    })

    const sheets = new ServerStyleSheets()

    let location =
      process.env.NODE_ENV === 'development'
        ? url
        : `/apps/${process.env.CDN_APP_FOLDER}${url}`

    const App = createElement(
      StaticRouter,
      { location, context: {} },
      createElement(Provider, { store }, ThemedApp)
    )

    const render = renderToString(sheets.collect(App))

    file = fs.readFileSync(path.resolve('ssr', 'locals.js')).toString()
    const { locals } = eval(file)

    const markup = pug.renderFile(path.resolve(__dirname, 'template.pug'), {
      ...locals[url],
      bundles: bundleSrcs,
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
      `${outputFolder}/${locals[url].fileName}.html`,
      minifiedMarkup
    )

    console.log('render pass'.green)
  } catch (error) {
    console.error('ERROR XXX'.red, error)
    if (fs.existsSync(outputFolder)) {
      fs.rmdirSync(outputFolder, {
        recursive: true
      })
    }
  }
}

const paths = pathList => {
  pathList.forEach(path => renderPath(path))
}

module.exports = {
  paths
}
