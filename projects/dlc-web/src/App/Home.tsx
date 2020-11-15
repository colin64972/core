import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({
  Home_contentContainer: {
    minHeight: '100%'
  },
  Home_header: {
    ...theme.custom.setFlex('column'),
    padding: theme.custom.setSpace('md'),
    backgroundImage:
      'url(https://image.freepik.com/free-photo/abstract-background-with-low-poly-design_1048-8478.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: theme.palette.grey[50]
  },
  Home_startButton: {
    marginTop: theme.custom.setSpace('sm')
  }
}))

export const Home: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container className={classes.Home_contentContainer}>
      <Grid item xs={12} component="header" className={classes.Home_header}>
        <Typography variant="h1" align="center">
          {process.env.APP_NAME}
        </Typography>
        <Typography variant="body1" align="center">
          Nonumy magna lorem erat at eirmod et. Labore ut no diam accusam
          aliquyam amet sit, sanctus nonumy labore no sea aliquyam erat ea.
          Dolor sit diam accusam erat, kasd nonumy eos aliquyam invidunt. Vero
          tempor amet vero aliquyam invidunt consetetur est est sed. Invidunt
          diam sanctus sea amet invidunt.
        </Typography>
        <Button
          type="button"
          variant="contained"
          href="/editor"
          color="secondary"
          className={classes.Home_startButton}>
          Start
        </Button>
      </Grid>
    </Grid>
  )
}
