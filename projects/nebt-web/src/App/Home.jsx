import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import { responsivePadding } from '../theme'
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
              The premier source for everything neb token
            </Typography>
          }
        />
        <Viewable
          animation={setAnimation('x', 100)}
          component={
            <Typography variant="body1" className={classes.body}>
              Takimata gubergren voluptua elitr ipsum clita dolor ipsum diam sea
              sadipscing, lorem sit dolore sea ipsum sea vero sadipscing ipsum
              sed, no ipsum amet ipsum est voluptua ipsum. Amet dolor gubergren
              sit at duo magna et diam, sadipscing takimata magna justo takimata
              elitr. Ipsum sadipscing aliquyam voluptua stet. Invidunt sanctus
              sea no clita, sadipscing dolores ut vero lorem amet eos sit, sed
              rebum stet at gubergren. Dolore eos duo sit magna lorem magna diam
              sanctus diam, elitr amet takimata lorem ut, erat diam eos nonumy
              erat justo sit gubergren duo, magna sadipscing nonumy sea lorem
              et. Takimata est et lorem.
            </Typography>
          }
        />
      </Grid>
    </Grid>
  )
}
