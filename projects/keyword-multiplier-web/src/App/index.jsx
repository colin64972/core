import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useLocation } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { setTracker, switchLinkRoutePath } from '@cjo3/shared/react/helpers'
import { types } from '../store/types'
import { Home } from './Home'
import { NotFound } from './NotFound'

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
