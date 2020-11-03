import { createElement } from 'react'
import { hydrate, render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { AppWithTheme } from './AppWithTheme'
import { setStore } from './store'

const preloadedState = window?.__PRELOADED_STATE__

let renderMethod = render
let store = setStore()

if (preloadedState) {
  delete window.__PRELOADED_STATE__
  renderMethod = hydrate
  store = setStore(preloadedState)
}

renderMethod(
  createElement(
    Provider,
    { store },
    createElement(BrowserRouter, {}, AppWithTheme)
  ),
  document.getElementById('app')
)
