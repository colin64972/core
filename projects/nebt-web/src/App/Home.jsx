import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { setAnimation } from './helpers'
import Viewable from './components/viewable'

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 750,
    textAlign: 'center'
  },
  heading: {
    color: theme.palette.primary.A400
  },
  subtitle: {
    color: theme.palette.grey[700]
  },
  body: {
    color: theme.palette.common.white
  }
}))

export default () => {
  const classes = useStyles()
  return (
    <Grid container justify="center" alignItems="center">
      <Grid className={classes.container}>
        <Viewable
          animation={setAnimation('y', -100)}
          component={
            <Typography
              variant="h4"
              align="center"
              className={classes.subtitle}>
              NEB Token
            </Typography>
          }
        />
        <Viewable
          animation={setAnimation('x', -100)}
          component={
            <Typography variant="h1" className={classes.heading}>
              Ea sit sanctus sadipscing sanctus tempor vero duo
            </Typography>
          }
        />
        <Viewable
          animation={setAnimation('x', 100)}
          component={
            <Typography variant="body1" className={classes.body}>
              Ipsum amet sit stet invidunt eirmod elitr at, et gubergren ea sit
              gubergren amet. Takimata gubergren at kasd no consetetur, stet
              aliquyam accusam et lorem et diam amet eos et. Elitr ut et lorem
              sanctus clita clita gubergren, invidunt aliquyam tempor ipsum
              ipsum ipsum est. Dolores no lorem gubergren elitr.
            </Typography>
          }
        />
      </Grid>
    </Grid>
  )
}
