import { createElement } from 'react'
import { hydrate, render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { setChunkPublicPath } from '@cjo3/shared/react/helpers'
import { AppElement } from './AppElement'
import { setStore } from './store'

// __webpack_public_path__ = setChunkPublicPath(
//   `https://${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}/`
// )

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
    createElement(BrowserRouter, {}, AppElement)
  ),
  document.getElementById('app')
)
