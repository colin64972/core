import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

import { CssBaseline, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Error } from './Error'
import { Feedback } from './Feedback'
import { Home } from './Home'

const useStyles = makeStyles(theme => ({
  pageContainer: {
    maxWidth: '100vw',
    minHeight: '100vh'
  }
}))

export const App = () => {
  const classes = useStyles()
  const location = useLocation()
  console.log('IS_SERVER', process.env.IS_SERVER)
  return (
    <CssBaseline>
      <Grid container className={classes.pageContainer}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/feedback" exact component={Feedback} />
          <Route path="/*" component={Error} />
        </Switch>
      </Grid>
    </CssBaseline>
  )
}
