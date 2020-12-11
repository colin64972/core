import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'regenerator-runtime/runtime'
import { configureStore } from './store'
import { ThemedApp } from './ThemedApp'

const store = configureStore()

render(
  createElement(
    BrowserRouter,
    {},
    createElement(Provider, { store }, ThemedApp)
  ),
  document.getElementById('app')
)
