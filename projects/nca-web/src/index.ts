import { createElement } from 'react'
import { hydrate, render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'regenerator-runtime/runtime'
import { configureStore } from './store'
import { ThemedApp } from './ThemedApp'
import { State } from './store/'

const preloadedState: State = window?.__PRELOADED_STATE__

let store

if (preloadedState) {
  delete window.__PRELOADED_STATE__
  store = configureStore(preloadedState)
  const stateNode = document.getElementById('preloaded-state')
  stateNode.remove()
  hydrate(
    createElement(
      BrowserRouter,
      {},
      createElement(Provider, { store }, ThemedApp)
    ),
    document.getElementById('app')
  )
} else {
  store = configureStore()
  render(
    createElement(
      BrowserRouter,
      {},
      createElement(Provider, { store }, ThemedApp)
    ),
    document.getElementById('app')
  )
}
