import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import CssBaseline from '@material-ui/core/CssBaseline'
import { constants } from '@cjo3/shared/raw/constants/km'
import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'

const HomeLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-Home" */
      /* webpackPrefetch: true */
      './Home'
    ),
  loading: () => <BackDropScreen isOpen spinner />,
  render: (loaded, props) => {
    let Component = loaded.Home
    return <Component {...props} />
  }
})

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

export const App = () => (
  <CssBaseline>
    <Switch>
      <Route path={constants.URLS.HOME} exact={true} component={HomeLoadable} />
      <Route
        path={constants.URLS.NOT_FOUND}
        exact={false}
        component={NotFoundLoadable}
      />
    </Switch>
  </CssBaseline>
)
