import { CssBaseline } from '@material-ui/core'
import React, { useLayoutEffect, useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Home } from './Home'
import { Resume } from './Resume/'
import { Apps } from './Apps/'
import { Contact } from './Contact/'
import { NotFound } from './NotFound'
import { Footer } from './Footer'
import { TopNav } from './TopNav'

export const App: React.FC = (): JSX.Element => {
  const location = useLocation()
  const showNav = /(resume|apps|contact)\/?$/i.test(location.pathname)
  const [viewWidth, udpateViewWidth] = useState<number>(window.innerWidth)

  const resizeHandler = () => {
    udpateViewWidth(window.innerWidth)
  }

  if (!process.env.IS_SERVER) {
    useLayoutEffect(() => {
      window.addEventListener('resize', resizeHandler)
      return () => window.removeEventListener('resize', resizeHandler)
    })
  }
  return (
    <CssBaseline>
      {showNav && <TopNav viewWidth={viewWidth} />}
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
