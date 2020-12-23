import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import { responsivePadding } from '../../theme'
import { setAnimation } from '../helpers'
import Viewable from '../components/viewable'
import Dashboard from './dashboard'

const useStyles = makeStyles(theme => ({
  header: {
    maxWidth: 750,
    padding: `${theme.custom.setSpace('md')}px ${theme.custom.setSpace()}px`,
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
    <Grid container direction="column" alignItems="center">
      <Grid component="header" className={classes.header}>
        <Viewable
          animation={setAnimation('y', -100)}
          component={
            <Typography variant="h4" className={classes.subtitle}>
              NEB Token Exchange
            </Typography>
          }
        />
        <Viewable
          animation={setAnimation('x', -100)}
          component={
            <Typography variant="h1" className={classes.heading}>
              Buy and Sell Neb tokens with the world
            </Typography>
          }
        />
        <Viewable
          animation={setAnimation('x', 100)}
          component={
            <Typography variant="body1" className={classes.body}>
              Elitr clita et duo invidunt et sit sed sit diam erat. Et sanctus
              nonumy sanctus dolor sanctus magna amet et. Nonumy stet dolor et
              magna, sit nonumy invidunt voluptua sed tempor et clita. Gubergren
              sadipscing et vero consetetur sit. Magna amet tempor invidunt
              clita tempor eirmod dolores eos stet, et diam magna gubergren amet
              invidunt et labore. Labore voluptua labore tempor et sit. Kasd
              kasd dolores vero elitr sit sed diam. Magna duo et invidunt dolor
              eos est ipsum lorem. Sed ea no et eirmod clita. No kasd takimata
              kasd elitr dolor consetetur ut amet lorem, consetetur ut sanctus
              sit.
            </Typography>
          }
        />
      </Grid>
      <Dashboard />
    </Grid>
  )
}
