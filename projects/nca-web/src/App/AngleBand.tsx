import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { CssAngle } from './CssAngle'

const useStyles = makeStyles(
  theme => ({
    container: {
      width: '100%',
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
    left: {
      width: 'calc(100% + 1px)',
      gridColumn: '1 / 2 ',
      gridRow: 1,
      backgroundColor: ({ fill }) => eval(fill),
      visibility: ({ fillLeft }) => (fillLeft ? 'visible' : 'hidden'),
      marginRight: -1
    },
    center: {
      gridColumn: '2 / 3 ',
      gridRow: 1,
      display: 'flex',
      justifyContent: ({ justify }) => justify,
      alignItems: 'center'
    },
    right: {
      width: 'calc(100% + 1px)',
      gridColumn: '3 / 4 ',
      gridRow: 1,
      backgroundColor: ({ fill }) => eval(fill),
      visibility: ({ fillRight }) => (fillRight ? 'visible' : 'hidden'),
      marginLeft: -1
    },
    div: {
      width: ({ width }) => width
    }
  }),
  {
    name: 'AngleBand'
  }
)

interface Props {
  fill?: string
  right?: boolean
  down?: boolean
  width?: number
}

export const AngleBand: React.FC<Props> = ({
  fill = 'theme.palette.grey[200]',
  right = false,
  down = false,
  width = 300
}): JSX.Element => {
  const classes = useStyles({
    fill,
    fillRight: right,
    fillLeft: !right,
    justify: right ? 'flex-end' : 'flex-start',
    width
  })

  return (
    <Grid className={classes.container}>
      <Grid className={classes.left} />
      <Grid className={classes.center}>
        <div className={classes.div}>
          <CssAngle fill={fill} right={right} down={down} />
        </div>
      </Grid>
      <Grid className={classes.right} />
    </Grid>
  )
}
