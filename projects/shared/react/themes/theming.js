import { createMuiTheme } from '@material-ui/core/styles'
import fail from '@material-ui/core/colors/red'
import pass from '@material-ui/core/colors/lime'
import warn from '@material-ui/core/colors/amber'

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
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ].join(',')

  const headingStyle = {
    fontWeight: 'bold',
    lineHeight: 1.25
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
      fullScreen: {
        maxWidth: '100vw',
        minHeight: '100vh'
      },
      setGrid: (columnCount, rowCount, gapSpace = 0) => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gridTemplateRows:
          typeof rowCount === 'string' ? rowCount : `repeat(${rowCount}, 1fr)`,
        gridRowGap: gapSpace,
        gridColumnGap: gapSpace
      }),
      setFlex: (flow = 'row nowrap', justify = 'center', align = 'center') => ({
        display: 'flex',
        flexFlow: flow,
        justifyContent: justify,
        alignItems: align
      }),
      borderRadius,
      setLinearGradient: (deg, color1, color2) =>
        `linear-gradient(${deg}deg, ${color1}, ${color2})`,
      noSelect: {
        'userSelect': 'none',
        '-ms-user-select': 'none',
        '-o-user-select': 'none',
        '-moz-user-select': 'none',
        '-khtml-user-select': 'none',
        '-webkit-user-select': 'none',
        '-webkit-touch-callout': 'none'
      }
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
          body1: 'p'
        }
      }
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': fontFaces,
          '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box'
          },
          'html': {
            fontSize,
            fontFamily,
            lineHeight: 1
          },
          'body': {
            color: bodyColor,
            backgroundColor: 'white',
            height: 'unset'
          },
          '*:focus': {
            outline: 'none'
          },
          'a': {
            textDecoration: 'none',
            color: 'inherit'
          }
        }
      },
      MuiTypography: {
        h1: {
          fontSize: fontSize * 2.5,
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
        },
        body1: {
          marginTop: fontSize,
          fontSize
        }
      }
    }
  })
  return muiTheme
}
