import { setCustomTheme } from '@cjo3/shared/react/theming'
import primary from '@material-ui/core/colors/cyan'
import secondary from '@material-ui/core/colors/indigo'

const customTheme = setCustomTheme(
  12,
  'Heebo',
  [
    {
      fontFamily: 'Heebo',
      fontStyle: 'normal',
      fontWeight: 400,
      fontDisplay: 'swap',
      src:
        "local('Heebo'), local('Heebo-Regular'), url('https://fonts.gstatic.com/s/heebo/v5/NGS6v5_NC0k9P9H2TbFhsqMA.woff2') format('woff2')",
      unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
    },
    {
      fontFamily: 'Heebo',
      fontStyle: 'normal',
      fontWeight: 900,
      fontDisplay: 'swap',
      src:
        "local('Heebo Black'), local('Heebo-Black'), url('https://fonts.gstatic.com/s/heebo/v5/NGS3v5_NC0k9P9l1aqRMkK4q06VE.woff2') format('woff2')",
      unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
    }
  ],
  primary,
  secondary,
  'rgb(68, 68, 68)',
  3
)

customTheme.typography.subtitle1 = {
  [customTheme.breakpoints.down('xs')]: {
    color: 'red',
    fontSize: customTheme.custom.setSpace()
  }
}

customTheme.palette.screens = {
  backdrop: 'rgba(0, 0, 0, 0.5)'
}

customTheme.shadows.concat([
  `inset ${customTheme.custom.setSpace() / 2}px ${
    customTheme.custom.setSpace() / 2
  }px ${customTheme.custom.setSpace() / 2}px ${customTheme.palette.grey[50]}`
])

customTheme.custom.formButton = {
  padding: customTheme.custom.setSpace(),
  borderRadius: customTheme.custom.borderRadius,
  fontFamily: customTheme.typography.fontFamily,
  width: '100%',
  border: 'none',
  fontSize: customTheme.custom.setSpace(),
  fontWeight: 'bold',
  textTransform: 'uppercase',
  transition: 'all 250ms ease-out',
  color: customTheme.palette.bodyColor
}

customTheme.custom.iconButton = {
  'border': 'none',
  'fontSize': customTheme.custom.setSpace(),
  'padding': customTheme.custom.setSpace() / 2,
  'margin': `0 ${customTheme.custom.setSpace() / 2}px 0 0`,
  'borderRadius': customTheme.custom.borderRadius,
  'cursor': 'pointer',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'transition': 'all 250ms ease-out',
  '&:focus': {
    outline: 'none'
  }
}

export const theme = customTheme
