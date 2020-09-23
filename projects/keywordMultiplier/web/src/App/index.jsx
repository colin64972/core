import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadable from '@loadable/component'
import CssBaseline from '@material-ui/core/CssBaseline'
import { constants } from './constants'

const HomeLoadable = loadable(() =>
  import(
    /* webpackChunkName: "chunk-Home" */
    /* webpackPrefetch: false */
    /* webpackPreload: false */
    './Home'
  )
)
const NotFoundLoadable = loadable(() =>
  import(
    /* webpackChunkName: "chunk-NotFound" */
    /* webpackPrefetch: false */
    /* webpackPreload: false */
    './NotFound'
  )
)

export const App = () => (
  <CssBaseline>
    <Switch>
      <Route path={constants.URLS.HOME} exact={true} component={HomeLoadable} />
      <Route
        path={constants.URLS.NOT_FOUND}
        exact={false}
        component={NotFoundLoadable}
      />
    </Switch>
  </CssBaseline>
)
