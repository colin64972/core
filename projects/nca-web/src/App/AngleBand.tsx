import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AirlineSeatReclineNormalRounded } from '@material-ui/icons'
import React from 'react'
import { Angle } from './Angle'

const useStyles = makeStyles(
  theme => ({
    container: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'auto 300px auto',
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
      backgroundColor: ({ color }) => eval(color),
      visibility: ({ leftVisible }) => (leftVisible ? 'visible' : 'hidden'),
      marginRight: -1
    },
    center: {
      gridColumn: '2 / 3 ',
      gridRow: 1
    },
    right: {
      width: 'calc(100% + 1px)',
      gridColumn: '3 / 4 ',
      gridRow: 1,
      backgroundColor: ({ color }) => eval(color),
      visibility: ({ rightVisible }) => (rightVisible ? 'visible' : 'hidden'),
      marginLeft: -1
    }
  }),
  {
    name: 'AngleBand'
  }
)

interface Props {
  color: string
  right?: boolean
  up?: boolean
}

function switchColor(color) {
  switch (color) {
    case 'red':
      return 'theme.palette.primary.main'
    case 'grey900':
      return 'theme.palette.grey[900]'
    case 'grey800':
      return 'theme.palette.grey[800]'
    default:
      return 'theme.palette.grey[200]'
  }
}

export const AngleBand: React.FC<Props> = ({
  color,
  right,
  up
}): JSX.Element => {
  const classes = useStyles({
    leftVisible: !right,
    rightVisible: right,
    color: switchColor(color)
  })

  const float = right ? 'right' : 'left'
  const x = right ? '-1' : '1'
  const y = up ? '1' : '-1'

  return (
    <Grid className={classes.container}>
      <Grid className={classes.left} />
      <Grid className={classes.center}>
        <Angle color={color} x={x} y={y} float={float} />
      </Grid>
      <Grid className={classes.right} />
    </Grid>
  )
}
