import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { App } from './App'
import { theme } from './App/theme'
import { setStore } from './store'

console.log(
  '%c env',
  'color: lightyellow; font-size: large',
  window.location.pathname,
  process.env.NODE_ENV,
  process.env.DEBUG,
  process.env.IS_BROWSER
)

const store = setStore()

render(
  createElement(
    Provider,
    { store },
    createElement(
      BrowserRouter,
      {},
      createElement(ThemeProvider, { theme }, createElement(App))
    )
  ),
  document.getElementById('app')
)
