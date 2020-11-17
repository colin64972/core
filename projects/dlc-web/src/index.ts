import { createElement } from 'react'
import { render, hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { setReduxStore } from './store'
import __webpack_public_path__ from './publicPath'
import { State } from './store/'
import { ThemedApp } from './ThemedApp'

const preloadedState: State = window?.__PRELOADED_STATE__

const loader = document.getElementById('loader')

if (loader) loader.remove()

let renderMethod = render
let store = setReduxStore()

if (preloadedState) {
  delete window.__PRELOADED_STATE__
  renderMethod = hydrate
  store = setReduxStore(preloadedState)
  const stateElement = document.getElementById('preloaded-state')
  stateElement.remove()
}

renderMethod(
  createElement(
    BrowserRouter,
    {},
    createElement(Provider, { store }, ThemedApp)
  ),
  document.getElementById('app')
)
