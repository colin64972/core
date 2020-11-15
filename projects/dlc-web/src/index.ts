import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { setReduxStore } from './store'
import { State } from './store/'
import { ThemedApp } from './ThemedApp'

const preLoadedState: State = null

render(
  createElement(
    BrowserRouter,
    {},
    createElement(Provider, { store: setReduxStore(preLoadedState) }, ThemedApp)
  ),
  document.getElementById('app')
)
