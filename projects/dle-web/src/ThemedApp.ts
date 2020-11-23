import {
  StylesProvider,
  ThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles'
import { createElement } from 'react'
import { App } from './App'
import { theme } from './theme'

const generateClassName = createGenerateClassName({
  productionPrefix: 'dle-style-',
  seed: 'my-jss'
})

export const ThemedApp = createElement(
  StylesProvider,
  { injectFirst: false, generateClassName },
  createElement(ThemeProvider, { theme }, createElement(App))
)
