import Dashboard from './dashboard'
import Grid from '@material-ui/core/Grid'
import NoUserBlock from './noUserBlock'
import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Viewable from '../components/viewable'
import { makeStyles } from '@material-ui/styles'
import { selectUserAccount } from '../../store/selectors'
import { setAnimation } from '../helpers'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  header: {
    maxWidth: 750,
    padding: `${theme.custom.setSpace('md')}px ${theme.custom.setSpace()}px`,
    textAlign: 'center'
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
  const account = useSelector(state => selectUserAccount(state))
  useEffect(() => {
    console.log('%c exchange index', 'color: yellow; font-size: large', account)
  })
  return (
    <Grid container direction="column" alignItems="center">
      <Grid component="header" className={classes.header}>
        <Viewable
          animation={setAnimation('y', -100)}
          component={
            <Typography variant="h4" className={classes.subtitle}>
              Neb Token Exchange
            </Typography>
          }
        />
        <Viewable
          animation={setAnimation('x', -100)}
          component={
            <Typography variant="h1" className={classes.heading}>
              Et dolores amet dolor at magna consetetur vero eos
            </Typography>
          }
        />
        <Viewable
          animation={setAnimation('x', 100)}
          component={
            <Typography variant="body1" className={classes.body}>
              No lorem invidunt invidunt ea ipsum justo diam. Sed erat et vero
              stet et clita stet amet sed. Diam invidunt ut eos amet dolor ipsum
              labore invidunt, no erat et diam rebum eirmod amet eos sea justo.
              Diam amet sit lorem eirmod eirmod sit, et stet et sea voluptua
              invidunt.
            </Typography>
          }
        />
      </Grid>
      {account ? <Dashboard /> : <NoUserBlock />}
    </Grid>
  )
}
