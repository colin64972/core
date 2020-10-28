import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { setChunkPublicPath } from '@cjo3/shared/react/helpers'
import { BrowserRouter } from 'react-router-dom'
import { AppElement } from './AppElement'
import { setStore } from './store'

// __webpack_public_path__ = setChunkPublicPath(
//   `https://${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}/`
// )

const store = setStore()

render(
  createElement(
    Provider,
    { store },
    createElement(BrowserRouter, {}, AppElement)
  ),
  document.getElementById('app')
)
