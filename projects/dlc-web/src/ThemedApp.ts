import { theme } from './theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { createElement } from 'react'
import { App } from './App'

export const ThemedApp = createElement(
  ThemeProvider,
  { theme },
  createElement(App)
)
