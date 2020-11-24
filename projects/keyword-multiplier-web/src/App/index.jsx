import React, { useEffect, useLayoutEffect } from 'react'
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

  if (process.env.IS_NOT_SERVER) {
    useLayoutEffect(() => {
      const styleTags = document.getElementsByTagName('style')
      const injectionPoint = document.getElementById('jssInjectionPoint')

      if (styleTags.length > 0) {
        for (let tag of styleTags) {
          if (tag.dataset?.meta && tag.dataset.meta.includes('Mui')) {
            injectionPoint.insertAdjacentElement('beforebegin', tag)
          }
        }
      }
    })
  }

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
        <Route path={switchLinkRoutePath('/')} exact component={Home} />
        <Route path={switchLinkRoutePath('/*')} component={NotFound} />
      </Switch>
    </CssBaseline>
  )
}
