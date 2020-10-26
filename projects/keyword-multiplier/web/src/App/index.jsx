import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loadable from 'react-loadable'
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

export const App = ({ reqPath }) => {
  let path = reqPath

  if (!isServer) {
    path = window.location.pathname
  }

  let dispatch, tracker

  if (!isServer) {
    dispatch = useDispatch()
    tracker = useSelector(state => state.app.tracker)
  }

  useEffect(() => {
    if (!isServer && !tracker) {
      tracker = setTracker(process.env.GA_TAG)
      tracker.initialize()
      dispatch({
        type: types.ADD_TRACKER,
        tracker
      })
    }
  }, [tracker])

  useEffect(() => {
    if (!isServer) {
      tracker.pageHit(path, process.env.APP_ROOT_PATH)
    }
  }, [path])

  const setPage = () => {
    if (path === switchLinkRoutePath('/', process.env.APP_ROOT_PATH))
      return <Home />
    return <NotFound />
  }

  return <CssBaseline>{setPage()}</CssBaseline>
}
