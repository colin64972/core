import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.custom.setSpace()
  },
  NotFound_homeButton: {
    marginTop: theme.custom.setSpace()
  }
}))

export const NotFound: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid
      component="section"
      container
      direction="column"
      className={classes.section}>
      <Typography variant="h1">Error</Typography>
      <Typography variant="body1">
        Sorry, an error occurred. Please try again later!
      </Typography>
      <Grid item>
        <Button
          href="/"
          color="secondary"
          variant="contained"
          className={classes.NotFound_homeButton}>
          Home
        </Button>
      </Grid>
    </Grid>
  )
}
