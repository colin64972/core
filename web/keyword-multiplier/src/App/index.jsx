import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Switch, Route } from 'react-router-dom'
import routes from './routes'

const App = () => (
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

export default App
