import 'colors'
import fs from 'fs'
import path from 'path'
import {
  ServerStyleSheets,
  createGenerateClassName
} from '@material-ui/core/styles'
import { createElement } from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'

export const renderPage = (app, page) => {
  try {
    let appFolder = ''

    switch (app) {
      case 'detection-limit-editor':
        appFolder = 'dle-web'
        break
      default:
        appFolder = appFolder
        break
    }

    let file = fs
      .readFileSync(
        path.resolve(
          '..',
          '..',
          '..',
          appFolder,
          'distPreRenders',
          'ThemedApp.js'
        )
      )
      .toString()
    let evaluated = eval(file)
    const { ThemedApp } = evaluated

    file = fs
      .readFileSync(
        path.resolve('..', '..', '..', appFolder, 'distPreRenders', 'store.js')
      )
      .toString()
    evaluated = eval(file)
    const { setReduxStore } = evaluated

    const store = setReduxStore()

    const sheets = new ServerStyleSheets({
      generateClassName: createGenerateClassName({
        productionPrefix: 'asdf',
        seed: 'qwer'
      })
    })

    const App = createElement(
      StaticRouter,
      { location: '/', context: {} },
      createElement(Provider, { store }, ThemedApp)
    )

    const render = renderToString(sheets.collect(App))

    console.log('LOG XXX'.yellow, sheets.toString())
  } catch (error) {
    console.error('ERROR renderPage'.red, error)
  }
}
