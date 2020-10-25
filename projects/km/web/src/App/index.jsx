import React, { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Loadable from 'react-loadable'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Home } from './Home'
import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { setTracker, switchLinkRoutePath } from '@cjo3/shared/react/helpers'
import { types } from '../store/types'

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
  let location = {
    pathname: window.location.pathname,
    search: window.location.search
  }
  // console.log('%c XXX', 'color: yellow; font-size: large', location)
  // const dispatch = useDispatch()

  // let tracker = useSelector(state => state.app.tracker)

  // useEffect(() => {
  //   if (!tracker) {
  //     tracker = setTracker(process.env.GA_TAG)
  //     tracker.initialize()
  //     dispatch({
  //       type: types.ADD_TRACKER,
  //       tracker
  //     })
  //   }
  // }, [tracker])

  // useEffect(() => {
  //   tracker.pageHit(location, process.env.APP_ROOT_PATH)
  // }, [location])

  return <CssBaseline></CssBaseline>
}
