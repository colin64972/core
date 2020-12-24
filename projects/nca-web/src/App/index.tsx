import React, { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { addContent, addTracker } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'

import { Apps } from './Apps/'
import { Contact } from './Contact/'
import { CssBaseline } from '@material-ui/core'
import { Footer } from './Footer'
import { Home } from './Home'
import { NotFound } from './NotFound'
import { Resume } from './Resume/'
import { TopNav } from './TopNav'
import { getContent } from './fetchers'
import { setTracker } from '@cjo3/shared/react/helpers'

export const App: React.FC = (): JSX.Element | null => {
  const location = useLocation()

  const showNav = /(resume|apps|contact)\/?$/i.test(location.pathname)

  const dispatch = useDispatch()

  const content = useSelector(state => state.content)

  useEffect(() => {
    if (!process.env.IS_SERVER && !content)
      getContent()
        .then(data => {
          dispatch(addContent(data))
        })
        .catch(error => console.error(error))
  }, [content])

  let tracker = useSelector(state => state.tracker)

  useEffect(() => {
    if (!process.env.IS_SERVER && !tracker) {
      tracker = setTracker(process.env.GA_TAG)
      tracker.initialize()
      dispatch(addTracker(tracker))
    }
  }, [tracker])

  useEffect(() => {
    if (!process.env.IS_SERVER) tracker.pageHit('/', location.pathname)
  }, [location])

  if (!content) return null

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
