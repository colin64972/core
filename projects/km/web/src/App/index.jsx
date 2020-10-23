import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Home } from './Home'
import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { switchLinkRoutePath } from '@cjo3/shared/react/helpers'

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
      <Route
        path={switchLinkRoutePath('/', process.env.APP_ROOT_PATH)}
        exact={true}
        component={Home}
      />
      <Route
        path={switchLinkRoutePath('/*', `${process.env.APP_ROOT_PATH}/*`)}
        exact={false}
        component={NotFoundLoadable}
      />
    </Switch>
  </CssBaseline>
)
