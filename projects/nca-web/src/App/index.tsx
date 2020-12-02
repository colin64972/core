import { CssBaseline } from '@material-ui/core'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from './Home/'
import { Resume } from './Resume/'
import { Apps } from './Apps/'
import { Contact } from './Contact/'
import { NotFound } from './NotFound'

export const App: React.FC = (): JSX.Element => (
  <CssBaseline>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/resume" exact component={Resume} />
      <Route path="/apps" exact component={Apps} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/*" component={NotFound} />
    </Switch>
  </CssBaseline>
)
