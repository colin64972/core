import { CssBaseline } from '@material-ui/core'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from './Home/'
import { NotFound } from './NotFound'

export const App: React.FC = (): JSX.Element => (
  <CssBaseline>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/*" component={NotFound} />
    </Switch>
  </CssBaseline>
)
