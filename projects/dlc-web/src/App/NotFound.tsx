import { switchLinkRoutePath } from '@cjo3/shared/react/helpers'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({
  NotFound_contentContainer: {
    minHeight: '100%'
  },
  NotFound_header: {
    ...theme.custom.setFlex('column'),
    padding: theme.custom.setSpace('md'),
    backgroundImage:
      'url(https://image.freepik.com/free-photo/rendering-abstract-futuristic-background-with-glowing-neon-blue-orange-lights_181624-19807.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: theme.palette.grey[50]
  },
  NotFound_startButton: {
    marginTop: theme.custom.setSpace('sm')
  }
}))

export const NotFound: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container className={classes.NotFound_contentContainer}>
      <Grid item xs={12} component="header" className={classes.NotFound_header}>
        <Typography variant="h1" align="center">
          Error
        </Typography>
        <Typography variant="body1" align="center">
          Sorry, something went wrong
        </Typography>
        <Button
          type="button"
          variant="contained"
          href={switchLinkRoutePath('/', process.env.APP_ROOT_PATH)}
          color="secondary"
          className={classes.NotFound_startButton}>
          Home
        </Button>
      </Grid>
    </Grid>
  )
}
