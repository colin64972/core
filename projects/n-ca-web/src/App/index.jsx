import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { Switch, Route, useLocation } from 'react-router-dom'
import { Home } from './Home'
import { Feedback } from './Feedback'
import { Error } from './Error'

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
