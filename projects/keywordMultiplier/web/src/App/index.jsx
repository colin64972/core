import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadable from '@loadable/component'
import CssBaseline from '@material-ui/core/CssBaseline'
import { KeConstants } from '@colin30/shared/raw/constants/keywordMultiplier'

const HomeLoadable = loadable(() =>
  import(
    /* webpackChunkName: "chunk-Home" */
    /* webpackPrefetch: true */
    './Home'
  )
)
const NotFoundLoadable = loadable(() =>
  import(
    /* webpackChunkName: "chunk-NotFound" */
    /* webpackPrefetch: true */
    './NotFound'
  )
)

export const App = () => (
  <CssBaseline>
    <Switch>
      <Route
        path={KeConstants.URLS.HOME}
        exact={true}
        component={HomeLoadable}
      />
      <Route
        path={KeConstants.URLS.NOT_FOUND}
        exact={false}
        component={NotFoundLoadable}
      />
    </Switch>
  </CssBaseline>
)
