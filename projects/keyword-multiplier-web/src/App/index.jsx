import React, { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { setTracker, switchLinkRoutePath } from '@cjo3/shared/react/helpers'
import { useDispatch, useSelector } from 'react-redux'

import { CssBaseline } from '@material-ui/core'
import { Home } from './Home'
import { NotFound } from './NotFound'
import { types } from '../store/types'

export const App = () => {
  const location = useLocation()
  let dispatch = useDispatch()
  let tracker = useSelector(state => state.app.tracker)

  useEffect(() => {
    if (!tracker) {
      tracker = setTracker(process.env.GA_TAG)
      tracker.initialize()
      dispatch({
        type: types.ADD_TRACKER,
        tracker
      })
    }
  }, [tracker])

  useEffect(() => {
    tracker.pageHit(process.env.APP_ROOT_PATH, location.pathname)
  }, [location])

  return (
    <CssBaseline>
      <Switch>
        <Route
          path={switchLinkRoutePath('/', process.env.APP_ROOT_PATH)}
          exact
          component={Home}
        />
        <Route
          path={switchLinkRoutePath('/*', process.env.APP_ROOT_PATH)}
          component={NotFound}
        />
      </Switch>
    </CssBaseline>
  )
}
