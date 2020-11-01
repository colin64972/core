import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loadable from 'react-loadable'
import { Switch, Route, useLocation } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { setTracker, switchLinkRoutePath } from '@cjo3/shared/react/helpers'
import { types } from '../store/types'
import { Home } from './Home'
import { NotFound } from './NotFound'
// const HomeLoadable = Loadable({
//   loader: () =>
//     import(
//       /* webpackChunkName: "chunk-Home" */
//       /* webpackPrefetch: true */
//       './Home'
//     ),
//   loading: () => <BackDropScreen isOpen spinner />,
//   render: (loaded, props) => {
//     let Component = loaded.Home
//     return <Component {...props} />
//   }
// })

// const NotFoundLoadable = Loadable({
//   loader: () =>
//     import(
//       /* webpackChunkName: "chunk-NotFound" */
//       /* webpackPrefetch: true */
//       './NotFound'
//     ),
//   loading: () => <BackDropScreen isOpen spinner />,
//   render: (loaded, props) => {
//     let Component = loaded.NotFound
//     return <Component {...props} />
//   }
// })

const isServer = process.env.IS_SERVER

export const App = () => {
  // let path

  // if (!isServer) {
  //   path = window.location.pathname
  // }

  // let dispatch = useDispatch()
  // let tracker = useSelector(state => state.app.tracker)

  // useEffect(() => {
  //   if (!isServer && !tracker) {
  //     tracker = setTracker(process.env.GA_TAG)
  //     tracker.initialize()
  //     dispatch({
  //       type: types.ADD_TRACKER,
  //       tracker
  //     })
  //   }
  // }, [tracker])

  // useEffect(() => {
  //   if (!isServer) {
  //     tracker.pageHit(path, process.env.APP_ROOT_PATH)
  //   }
  // }, [path])

  return (
    <CssBaseline>
      <Switch>
        <Route
          path={switchLinkRoutePath('/', process.env.APP_ROOT_PATH)}
          exact
          component={Home}
        />
        <Route
          path={switchLinkRoutePath('/*', process.env.APP_ROOT_PATH)}
          component={NotFound}
        />
      </Switch>
    </CssBaseline>
  )
}
