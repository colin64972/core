import primary from '@material-ui/core/colors/blue'
import secondary from '@material-ui/core/colors/purple'

import { setCustomTheme } from './theming'

const customTheme = setCustomTheme(
  16,
  'Share Tech Mono',
  [
    {
      fontFamily: 'Share Tech Mono',
      fontStyle: 'normal',
      fontWeight: 400,
      fontDisplay: 'swap',
      src:
        "local('Share Tech Mono'), local('ShareTechMono-Regular'), url(https://fonts.gstatic.com/s/sharetechmono/v10/J7aHnp1uDWRBEqV98dVQztYldFcLowEFA87Heg.woff2) format('woff2')",
      unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
    }
  ],
  primary,
  secondary,
  'rgb(68, 68, 68)',
  3
)

export const theme = customTheme
