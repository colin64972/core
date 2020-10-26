import { createMuiTheme } from '@material-ui/core/styles'
import warn from '@material-ui/core/colors/amber'
import pass from '@material-ui/core/colors/lime'
import fail from '@material-ui/core/colors/red'

export const defaultPadding = (breakpoints, setSpace, scale) => {
  if (scale)
    return {
      padding: setSpace(),
      [breakpoints.up('sm')]: {
        padding: setSpace('sm')
      },
      [breakpoints.up('md')]: {
        padding: `${setSpace('md') * scale}px ${setSpace('md')}px`
      },
      [breakpoints.up('lg')]: {
        padding: `${setSpace('lg') * scale}px ${setSpace('lg')}px`
      },
      [breakpoints.up('xl')]: {
        padding: `${setSpace('xl') * scale}px ${setSpace('xl')}px`
      }
    }
  return {
    padding: setSpace(),
    [breakpoints.up('sm')]: {
      padding: setSpace('sm')
    },
    [breakpoints.up('md')]: {
      padding: setSpace('md')
    },
    [breakpoints.up('lg')]: {
      padding: setSpace('lg')
    },
    [breakpoints.up('xl')]: {
      padding: setSpace('xl')
    }
  }
}

export const setCustomTheme = (
  fontSize,
  fontFamilyName,
  fontFaces,
  primary,
  secondary,
  bodyColor,
  borderRadius
) => {
  const fontFamily = [
    fontFamilyName,
    '"Helvetica Neue"',
    'Arial',
    'serif'
  ].join(',')

  const headingStyle = {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: 1
  }

  const muiTheme = createMuiTheme({
    palette: {
      primary,
      secondary,
      pass,
      warn,
      fail,
      bodyColor
    },
    typography: {
      fontSize,
      htmlFontSize: fontSize,
      fontFamily,
      italic: {
        fontStyle: 'italic'
      },
      bold: {
        fontWeight: 'bold'
      },
      boldItalic: {
        fontWeight: 'bold',
        fontStyle: 'italic'
      }
    },
    custom: {
      setSpace: breakpoint => {
        switch (breakpoint) {
          case 'sm':
            return fontSize * 2
          case 'md':
            return fontSize * 4
          case 'lg':
            return fontSize * 8
          case 'xl':
            return fontSize * 16
          default:
            return fontSize
        }
      },
      cleanList: {
        listStyle: 'none',
        padding: 0,
        margin: 0
      },
      setGrid: (columnCount, rowCount, gapSpace = 0) => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gridTemplateRows:
          rowCount === 'auto' ? 'auto' : `repeat(${rowCount}, 1fr)`,
        gridRowGap: gapSpace,
        gridColumnGap: gapSpace
      }),
      setFlex: (flow = 'row nowrap', justify = 'center', align = 'center') => ({
        display: 'flex',
        flexFlow: flow,
        justifyContent: justify,
        alignItems: align
      }),
      buttons: {
        base: {
          'border': 'none',
          'backgroundColor': 'transparent',
          'color': bodyColor,
          'padding': 0,
          'margin': 0,
          'cursor': 'pointer',
          'fontFamily': fontFamily,
          fontSize,
          'transition': 'all 250ms ease-out',
          '&:focus': {
            outline: 'none'
          }
        }
      },
      borderRadius
    },
    debug: {
      border: {
        border: '1px solid red'
      }
    },
    props: {
      MuiTypography: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h2',
          body1: 'p'
        }
      }
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': fontFaces,
          'body': {
            fontFamily,
            color: bodyColor,
            backgroundColor: 'white',
            height: 'unset'
          },
          '*:focus': {
            outline: 'none'
          }
        }
      },
      MuiTypography: {
        h1: {
          fontSize: fontSize * 4,
          ...headingStyle
        },
        h2: {
          fontSize: fontSize * 2,
          ...headingStyle
        },
        h3: {
          fontSize: fontSize * 1.75,
          ...headingStyle
        },
        h4: {
          fontSize: fontSize * 1.5,
          ...headingStyle
        },
        h5: {
          fontSize: fontSize * 1.25,
          ...headingStyle
        },
        h6: {
          fontSize,
          ...headingStyle
        }
      },
      MuiTableRow: {
        root: {
          'borderTop': `1px solid ${secondary[100]}`,
          'thead &': {
            border: 'none'
          }
        }
      },
      MuiTableCell: {
        sizeSmall: {
          'textAlign': 'center',
          'color': bodyColor,
          'border': 'none',
          'padding': fontSize / 2,
          '&:last-child': {
            paddingRight: fontSize / 2
          }
        }
      }
    }
  })
  return muiTheme
}
