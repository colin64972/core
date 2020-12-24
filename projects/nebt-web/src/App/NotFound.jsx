import Grid from '@material-ui/core/Grid'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  container: {
    ...theme.custom.setFlex('column nowrap'),
  },
  content: {
    textAlign: 'center',
    maxWidth: 750 / 2,
    padding: `${theme.custom.setSpace('sm')}px ${theme.custom.setSpace()}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.custom.setSpace('md')}px ${theme.custom.setSpace('sm')}px`
    }
  },
  heading: {
    color: theme.palette.primary.main,
  },
  subheading: {
    color: theme.palette.grey[600]
  }
}))

export default () => {
  const classes = useStyles()
  return (
    <Grid className={classes.container}>
      <Grid className={classes.content}>
      <Typography variant="h1" className={classes.heading}>
          404 Not Found
        </Typography>
        <Typography variant="h4" className={classes.subheading}>
          The requested page doesn&apos;t exist
        </Typography>
      </Grid>
    </Grid>
  )
}
