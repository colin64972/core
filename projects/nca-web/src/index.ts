import { createElement } from 'react'
import { hydrate, render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'regenerator-runtime/runtime'
import { configureStore } from './store'
import { ThemedApp } from './ThemedApp'
import { State } from './store/'

const preloadedState: State = window?.__PRELOADED_STATE__

console.log(
  '%c preloadedState',
  'color: yellow; font-size: large',
  window?.__PRELOADED_STATE__
)

let renderMethod = render
let store = configureStore()

if (preloadedState) {
  delete window.__PRELOADED_STATE__
  renderMethod = hydrate
  store = configureStore(preloadedState)
  document.getElementById('preloaded-state').remove()
}

renderMethod(
  createElement(
    BrowserRouter,
    {},
    createElement(Provider, { store }, ThemedApp)
  ),
  document.getElementById('app')
)

console.log(
  '%c preloadedState',
  'color: yellow; font-size: large',
  window?.__PRELOADED_STATE__
)
