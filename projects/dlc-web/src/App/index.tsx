import { CssBaseline } from '@material-ui/core'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Editor } from './Editor'
import { Preview } from './Editor/Preview/'
import { Footer } from './Footer'
import { Home } from './Home'
import { NotFound } from './NotFound'
import { TransformResults } from './Editor/TransformResults'

export const App: React.FC = (): JSX.Element => (
  <CssBaseline>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/editor" exact component={Editor} />
      <Route path="/test" exact component={TransformResults} />
      <Route path="/*" component={NotFound} />
    </Switch>
    <Footer />
  </CssBaseline>
)
