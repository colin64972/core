import { createElement } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import App from './App'
import theme from './App/theme'

console.log(
  '%c env',
  'color: lightyellow; font-size: large',
  process.env.NODE_ENV,
  process.env.DEBUG,
  process.env.IS_BROWSER
)

render(
  createElement(
    BrowserRouter,
    {},
    createElement(ThemeProvider, { theme }, createElement(App))
  ),
  document.getElementById('app')
)
