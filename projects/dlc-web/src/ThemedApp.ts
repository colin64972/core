import { ThemeProvider } from '@material-ui/core/styles'
import { createElement } from 'react'
import { App } from './App'
import { theme } from './theme'

console.log('%c theme', 'color: yellow; font-size: large', theme)

export const ThemedApp = createElement(
  ThemeProvider,
  { theme },
  createElement(App)
)
