import { CssBaseline } from '@material-ui/core'
import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Apps } from './Apps/'
import { Contact } from './Contact/'
import { Footer } from './Footer'
import { Home } from './Home'
import { NotFound } from './NotFound'
import { Resume } from './Resume/'
import { TopNav } from './TopNav'

export const App: React.FC = (): JSX.Element => {
  const location = useLocation()

  const showNav = /(resume|apps|contact)\/?$/i.test(location.pathname)

  return (
    <CssBaseline>
      {showNav && <TopNav />}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/resume" exact component={Resume} />
        <Route path="/apps" exact component={Apps} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/*" component={NotFound} />
      </Switch>
      <Footer />
    </CssBaseline>
  )
}
