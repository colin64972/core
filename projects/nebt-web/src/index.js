import { render } from 'react-dom'
import { createElement } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { setStore } from './store'
import theme from './theme'
import App from './App'

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
