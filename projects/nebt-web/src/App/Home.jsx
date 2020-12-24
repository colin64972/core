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
    maxWidth: 750,
    padding: `${theme.custom.setSpace('sm')}px ${theme.custom.setSpace()}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.custom.setSpace('md')}px ${theme.custom.setSpace('sm')}px`
    }
  },
  heading: {
    color: theme.palette.primary.A400
  },
  subtitle: {
    color: theme.palette.grey[700]
  },
  body: {
    color: theme.palette.common.white
  }
}))

export default () => {
  const classes = useStyles()
  return (
    <Grid component="header" className={classes.container}>
      <Grid className={classes.content}>
        <Typography variant="h4" align="center" className={classes.subtitle}>
          {process.env.APP_NAME}
        </Typography>
        <Typography variant="h1" className={classes.heading}>
          Ea sit sanctus sadipscing sanctus tempor vero duo
        </Typography>
        <Typography variant="body1" className={classes.body}>
          Ipsum amet sit stet invidunt eirmod elitr at, et gubergren ea sit
          gubergren amet. Takimata gubergren at kasd no consetetur, stet
          aliquyam accusam et lorem et diam amet eos et. Elitr ut et lorem
          sanctus clita clita gubergren, invidunt aliquyam tempor ipsum ipsum
          ipsum est. Dolores no lorem gubergren elitr.
        </Typography>
      </Grid>
      </Grid>
  )
}
