import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { ReactNode } from 'react'

const useStyles = makeStyles(
  theme => ({
    container: {
      width: ({ width }) => (width ? width : '100%'),
      display: 'grid',
      gridTemplateColumns: 'auto 320px auto',
      gridTemplateRows: 'auto',
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'auto 600px auto'
      },
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'auto 768px auto'
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'auto 1024px auto'
      }
    },
    grid1: {
      gridColumn: '1 / 2 ',
      gridRow: 1,
      backgroundColor: ({ bgColor }) => eval(bgColor),
      visibility: ({ left }) => (left ? 'visible' : 'hidden')
    },
    grid2: {
      gridColumn: '2 / 3 ',
      gridRow: 1
    },
    grid3: {
      gridColumn: '3 / 4 ',
      gridRow: 1,
      backgroundColor: ({ bgColor }) => eval(bgColor),
      visibility: ({ right }) => (right ? 'visible' : 'hidden')
    },
    grid4: {
      gridColumn: '1 / 2 ',
      gridRow: 2,
      backgroundColor: ({ bgColor }) => eval(bgColor)
    },
    grid5: {
      gridColumn: '2 / 3 ',
      gridRow: 2,
      backgroundColor: ({ bgColor }) => eval(bgColor),
      padding: theme.custom.setSpace('sm'),
      ...theme.custom.setFlex('column', 'center', 'flex-start')
    },
    grid6: {
      gridColumn: '3 / 4 ',
      gridRow: 2,
      backgroundColor: ({ bgColor }) => eval(bgColor)
    },
    grid7: {
      gridColumn: '1 / 2 ',
      gridRow: 3,
      backgroundColor: ({ bgColor }) => eval(bgColor),
      visibility: ({ left }) => (left ? 'visible' : 'hidden')
    },
    grid8: {
      gridColumn: '2 / 3 ',
      gridRow: 3
    },
    grid9: {
      gridColumn: '3 / 4 ',
      gridRow: 3,
      backgroundColor: ({ bgColor }) => eval(bgColor),
      visibility: ({ right }) => (right ? 'visible' : 'hidden')
    },
    topAngle: {
      float: ({ floatJustify }) => floatJustify,
      width: ({ width }) => (width ? width : 300),
      height: ({ width }) => (width ? width / 10 : 30),
      backgroundColor: ({ bgColor }) => eval(bgColor),
      clipPath: ({ topPolygon }) => topPolygon
    },
    bottomAngle: {
      float: ({ floatJustify }) => floatJustify,
      width: ({ width }) => (width ? width : 300),
      height: ({ width }) => (width ? width / 10 : 30),
      backgroundColor: ({ bgColor }) => eval(bgColor),
      clipPath: ({ bottomPolygon }) => bottomPolygon
    }
  }),
  {
    name: 'BgContainer'
  }
)

interface Props {
  bgColor: string
  bottom?: boolean
  children: ReactNode
  left?: boolean
  right?: boolean
  top?: boolean
  width?: number
}

export const BgContainer: React.FC<Props> = ({
  bgColor,
  bottom,
  children,
  left,
  right,
  top,
  width
}): JSX.Element => {
  const classes = useStyles({
    width,
    bgColor,
    left,
    right,
    floatJustify: left ? 'left' : right ? 'right' : '',
    topPolygon: left
      ? `polygon(0 0, 0 102%, 100% 100%)`
      : right
      ? `polygon(100% 0, 102% 100%, 0 100%)`
      : '',
    bottomPolygon: left
      ? `polygon(0 0, 102% 0, 0 100%)`
      : right
      ? `polygon(0 0, 102% 0, 100% 100%)`
      : ''
  })
  return (
    <Grid className={classes.container}>
      {top && !width && <Grid className={classes.grid1} />}
      {top && (
        <Grid className={classes.grid2}>
          <Grid className={classes.topAngle} />
        </Grid>
      )}
      {top && !width && <Grid className={classes.grid3} />}
      {!width && <Grid className={classes.grid4} />}
      <Grid className={classes.grid5}>{children}</Grid>
      {!width && <Grid className={classes.grid6} />}
      {bottom && !width && <Grid className={classes.grid7} />}
      {bottom && (
        <Grid className={classes.grid8}>
          <Grid className={classes.bottomAngle} />
        </Grid>
      )}
      {bottom && !width && <Grid className={classes.grid9} />}
    </Grid>
  )
}
