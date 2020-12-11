import { setCustomTheme } from '@cjo3/shared/react/themes/theming'
import primary from '@material-ui/core/colors/red'
import secondary from '@material-ui/core/colors/lightblue'
import {
  createGenerateClassName,
  StylesProvider,
  ThemeProvider
} from '@material-ui/core/styles'
import { createElement } from 'react'
import { App } from './App'

const theme = setCustomTheme(
  15,
  'Fira Sans',
  [
    {
      fontFamily: 'Share Tech Mono',
      fontStyle: 'normal',
      fontWeight: 400,
      fontDisplay: 'swap',
      src:
        "local('Share Tech Mono Regular'), local('ShareTechMono-Regular'), url(https://fonts.gstatic.com/s/sharetechmono/v10/J7aHnp1uDWRBEqV98dVQztYldFcLowEFA87Heg.woff2) format('woff2')",
      unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
    },
    {
      fontFamily: 'Fira Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontDisplay: 'swap',
      src:
        "local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2) format('woff2')",
      unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
    },
    {
      fontFamily: 'Fira Sans',
      fontStyle: 'normal',
      fontWeight: 800,
      fontDisplay: 'swap',
      src:
        "local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7eRhf6Xl7Glw.woff2) format('woff2')",
      unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
    }
  ],
  primary,
  secondary,
  '#333333',
  5
)

theme.custom.boxShadow = '0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.15)'

theme.custom.textShadow = '0.25rem 0.25rem 1rem rgba(0, 0, 0, 0.5)'

theme.custom.contentContainer = {
  width: '100%',
  maxWidth: 1024
}

theme.typography.shareTechMono = {
  fontFamily: `Share Tech Mono, ${theme.typography.fontFamily}`,
  fontWeight: 'normal',
  lineHeight: 1
}

theme.custom.unorderedList = {
  paddingLeft: theme.custom.setSpace('sm')
}

const generateClassName = createGenerateClassName({
  productionPrefix: 'prod-style-',
  seed: 'nca'
})

if (!process.env.IS_SERVER)
  console.log('%c theme', 'color: yellow; font-size: large', theme)

export const ThemedApp = createElement(
  StylesProvider,
  { injectFirst: false, generateClassName },
  createElement(ThemeProvider, { theme }, createElement(App))
)
