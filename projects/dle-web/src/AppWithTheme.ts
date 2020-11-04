import { App } from './App/'
import { ThemeProvider } from '@material-ui/core/styles'
import { createElement } from 'react'
import { theme } from '@cjo3/shared/react/themes/dle'

export const AppWithTheme = createElement(
  ThemeProvider,
  { theme },
  createElement(App)
)
