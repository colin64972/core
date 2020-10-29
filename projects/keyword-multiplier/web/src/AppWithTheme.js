import { createElement } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '@cjo3/shared/react/themes/keyword-multiplier'
import { App } from './App'

export const AppWithTheme = createElement(
  ThemeProvider,
  { theme },
  createElement(App)
)
