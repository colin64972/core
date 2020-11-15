import { setCustomTheme } from '@cjo3/shared/react/themes/theming'
import primary from '@material-ui/core/colors/lightBlue'
import secondary from '@material-ui/core/colors/pink'

export const theme = setCustomTheme(
  14,
  'Fira Sans',
  [
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
  'rgb(68, 68, 68)',
  3
)

theme.overrides.MuiOutlinedInput = {
  input: {
    padding: theme.custom.setSpace(),
    position: 'relative',
    top: 3
  }
}

theme.overrides.MuiInputBase = {
  root: {
    fontSize: theme.typography.fontSize
  }
}

theme.overrides.MuiInputLabel = {
  formControl: {
    fontSize: theme.typography.fontSize
  },
  outlined: {
    '&$shrink': {
      transform: 'translate(14px, 1px) scale(0.75)'
    }
  }
}

theme.custom.tableBorder = {
  border: `${theme.custom.setSpace() / 4}px solid ${theme.palette.grey[50]}`
}
