import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.custom.setSpace()
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
      </Grid>
    </Grid>
  )
}

Home.propTypes = {
  // name: PropTypes.string.isRequired,
  // size: PropTypes.number.isRequired
}
