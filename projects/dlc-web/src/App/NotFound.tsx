import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.custom.setSpace()
  },
  homeLink: {
    marginTop: theme.custom.setSpace()
  }
}))

export const NotFound: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid component="section" container className={classes.section}>
        <Grid item xs={12}>
          <Typography variant="h1">Error</Typography>
          <Typography variant="body1">
            Sorry, an error occurred. Please try again later!
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.homeLink}>
          <Link to="/">Home</Link>
        </Grid>
      </Grid>
    </Grid>
  )
}
