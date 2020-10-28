import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  sectionPadding: {
    padding: theme.custom.setSpace()
  },
  section1: {
    backgroundColor: theme.palette.secondary[50]
  },
  heading1: {
    color: theme.palette.secondary.main
  }
}))

export const Feedback = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12}>
      <Grid
        container
        component="section"
        className={clsx(classes.sectionPadding, classes.section1)}>
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.heading1}>
            Feedback
          </Typography>
          <Typography variant="body1">
            Invidunt et dolor kasd lorem magna. Dolor kasd ea et et lorem
            sanctus, sea dolore est et diam. Invidunt voluptua.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
