import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  sectionPadding: {
    padding: theme.custom.setSpace()
  },
  section1: {
    backgroundColor: theme.palette.primary[50]
  },
  heading1: {
    color: theme.palette.primary.main
  },
  section2: {
    backgroundColor: theme.palette.primary.main
  },
  heading2: {
    color: 'white'
  },
  copy2: {
    color: theme.palette.primary[50]
  }
}))

export const Home = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12}>
      <Grid
        container
        component="section"
        className={clsx(classes.sectionPadding, classes.section1)}>
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.heading1}>
            Home
          </Typography>
          <Typography variant="body1">
            Sea et diam labore dolore tempor dolor et sea, sadipscing sit vero
            ea nonumy amet justo sed ea tempor, amet sed consetetur dolore et ut
            sea et amet, rebum stet dolor kasd et, accusam dolore sit eirmod
            rebum erat gubergren. Justo amet et tempor gubergren labore ipsum,
            et et gubergren.
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        component="section"
        className={clsx(classes.sectionPadding, classes.section2)}>
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.heading2}>
            About
          </Typography>
          <Typography variant="body1" className={classes.copy2}>
            Labore sit est sadipscing eirmod et eirmod lorem. Kasd vero kasd
            eirmod sanctus. Et voluptua vero invidunt at rebum, lorem amet
            takimata et aliquyam, sadipscing amet vero elitr diam no. Nonumy no
            lorem et eos stet diam diam, eos nonumy diam consetetur sit, lorem
            lorem sanctus eirmod invidunt et ea.
          </Typography>
          <Typography variant="body1" className={classes.copy2}>
            Lorem sea dolor labore at gubergren sea consetetur amet, gubergren
            duo magna ipsum duo takimata dolor ut eirmod ea, et aliquyam est eos
            dolor dolore. Kasd dolore est dolore et.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
