import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadable from '@loadable/component'
import CssBaseline from '@material-ui/core/CssBaseline'
import { constants } from './constants'

const HomeLoadable = loadable(() => import('./Home'))
const NotFoundLoadable = loadable(() => import('./NotFound'))

export const App = () => (
  <CssBaseline>
    <Switch>
      <Route path={constants.URLS.HOME} exact={true} component={HomeLoadable}>
        <HomeLoadable />
      </Route>
      <Route path={constants.URLS.NOT_FOUND} exact={false}>
        <NotFoundLoadable />
      </Route>
    </Switch>
  </CssBaseline>
)
