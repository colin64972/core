import { ThemeProvider } from '@material-ui/core/styles'
import { createElement } from 'react'
import { App } from './App'
import { theme } from './theme'

export const ThemedApp = createElement(
  ThemeProvider,
  { theme },
  createElement(App)
)
