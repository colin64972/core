import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { switchLinkRoutePath } from '@cjo3/shared/react/helpers'
import { HomeHeader } from '../../assets'

const useStyles = makeStyles(theme => ({
  Home_contentContainer: {
    minHeight: '100%'
  },
  Home_header: {
    ...theme.custom.setFlex('column'),
    padding: theme.custom.setSpace('md'),
    backgroundImage: `url(${HomeHeader.paths[0]})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: theme.palette.grey[50],
    textShadow: theme.custom.textShadow
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
          href={switchLinkRoutePath(
            '/editor',
            `${process.env.APP_ROOT_PATH}/editor`
          )}
          color="secondary"
          className={classes.Home_startButton}>
          Start
        </Button>
      </Grid>
    </Grid>
  )
}
