import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { App } from './App'
import { theme } from './App/theme'
import { setStore } from './store'

console.log('%c theme', 'color: lightyellow; font-size: large', theme)

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
