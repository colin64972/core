import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.custom.setSpace()
  },
  gridButton: {
    marginTop: theme.custom.setSpace()
  }
}))

export const Home: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid component="section" container className={classes.section}>
        <Grid item xs={12}>
          <Typography variant="h1">{process.env.APP_NAME}</Typography>
          <Typography variant="body1">
            Nonumy magna lorem erat at eirmod et. Labore ut no diam accusam
            aliquyam amet sit, sanctus nonumy labore no sea aliquyam erat ea.
            Dolor sit diam accusam erat, kasd nonumy eos aliquyam invidunt. Vero
            tempor amet vero aliquyam invidunt consetetur est est sed. Invidunt
            diam sanctus sea amet invidunt labore.
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridButton}>
          <Link to="/editor">Start</Link>
        </Grid>
      </Grid>
    </Grid>
  )
}
