require('colors')
const fs = require('fs')
const path = require('path')
const { createElement } = require('react')
const { Provider } = require('react-redux')
const { StaticRouter } = require('react-router-dom')
const { ServerStyleSheets } = require('@material-ui/core/styles')
const { renderToString } = require('react-dom/server')

let file = fs
  .readFileSync(path.resolve('distPreRenders', 'ThemedApp.js'))
  .toString()
let evalled = eval(file)
const { ThemedApp } = evalled

file = fs.readFileSync(path.resolve('distPreRenders', 'store.js')).toString()
evalled = eval(file)
const { setReduxStore } = evalled
const store = setReduxStore()

const sheets = new ServerStyleSheets()

try {
  const asdf = createElement(
    StaticRouter,
    { location: '/', context: {} },
    createElement(Provider, { store }, ThemedApp)
  )

  const render = renderToString(sheets.collect(asdf))

  console.log('LOG XXX'.yellow, render)
} catch (error) {
  console.error('ERROR XXX'.red, error)
}
