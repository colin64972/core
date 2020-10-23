import React, { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Loadable from 'react-loadable'
import CssBaseline from '@material-ui/core/CssBaseline'
import { constants } from '@cjo3/shared/raw/constants/km'
import { Home } from './Home'
import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'

const NotFoundLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-NotFound" */
      /* webpackPrefetch: true */
      './NotFound'
    ),
  loading: () => <BackDropScreen isOpen spinner />,
  render: (loaded, props) => {
    let Component = loaded.NotFound
    return <Component {...props} />
  }
})

export const App = () => {
  let location = useLocation()
  console.log('%c location', 'color: yellow; font-size: large', location)
  return (
    <CssBaseline>
      <Switch>
        <Route path={constants.URLS.HOME} exact={true} component={Home} />
        <Route
          path={constants.URLS.NOT_FOUND}
          exact={false}
          component={NotFoundLoadable}
        />
      </Switch>
    </CssBaseline>
  )
}
