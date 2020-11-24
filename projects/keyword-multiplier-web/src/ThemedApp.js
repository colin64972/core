import { App } from './App'
import { ThemeProvider } from '@material-ui/core/styles'
import { createElement } from 'react'
import { theme } from './theme'

export const ThemedApp = createElement(
  ThemeProvider,
  { theme },
  createElement(App)
)
