import { createElement } from 'react'
import Loadable from 'react-loadable'
import { hydrate, render } from 'react-dom'
import { Provider } from 'react-redux'
import { setReduxStore } from './store'
import { BrowserRouter } from 'react-router-dom'
import 'regenerator-runtime/runtime'
import { State } from './store/'
import { ThemedApp } from './ThemedApp'

const preloadedState: State = window?.__PRELOADED_STATE__

let renderMethod = render
let store = setReduxStore()

if (preloadedState) {
  delete window.__PRELOADED_STATE__
  renderMethod = hydrate
  store = setReduxStore(preloadedState)
  const stateElement = document.getElementById('preloaded-state')
  stateElement.remove()
}

Loadable.preloadReady().then(() => {
  renderMethod(
    createElement(
      BrowserRouter,
      {},
      createElement(Provider, { store }, ThemedApp)
    ),
    document.getElementById('app')
  )
})
