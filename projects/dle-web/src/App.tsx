import { Route, Switch } from 'react-router-dom'

import { Home } from './Home'
import { NotFound } from './NotFound'
import React from 'react'

export const App: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/*" component={NotFound} />
  </Switch>
)
