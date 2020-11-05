import { theme } from '@cjo3/shared/react/themes/dlc'
import { ThemeProvider } from '@material-ui/core/styles'
import { createElement } from 'react'
import { App } from './App'

export const AppWithTheme = createElement(
  ThemeProvider,
  { theme },
  createElement(App)
)
