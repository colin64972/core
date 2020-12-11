import { CssBaseline } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Home } from './Home'
import { useDispatch, useSelector } from 'react-redux'
import { TopNav } from './TopNav'
import { getContent } from './fetchers'
import { addContent } from '../store/actions'

export const App: React.FC = (): JSX.Element => {
  const location = useLocation()

  const showNav = /(resume|apps|contact)\/?$/i.test(location.pathname)

  const dispatch = useDispatch()

  const content = useSelector(state => state.content)

  useEffect(() => {
    if (!content)
      getContent()
        .then(data => {
          dispatch(addContent(data))
        })
        .catch(error => console.error(error))
  })

  if (!content) return null

  return (
    <CssBaseline>
      {showNav && <TopNav />}
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
      <Footer />
    </CssBaseline>
  )
}
