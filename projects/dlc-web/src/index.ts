import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { setReduxStore } from './store'
import { ThemedApp } from './ThemedApp'

render(
  createElement(
    BrowserRouter,
    {},
    createElement(Provider, { store: setReduxStore(null) }, ThemedApp)
  ),
  document.getElementById('app')
)
