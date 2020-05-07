import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { routes } from './routes'

export const App = () => (
  <CssBaseline>
    <Switch>
      {routes.map(route => (
        <Route
          key={route.key}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  </CssBaseline>
)
