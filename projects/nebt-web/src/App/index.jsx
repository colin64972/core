import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/styles'
import Loadable from 'react-loadable'
import Nav from './components/nav'
import Footer from './components/footer'
import routes from './routes'
import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { LoadFail } from '@cjo3/shared/react/components/LoadFail'

const HomeLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-Home" */
      './Home'
    ),
  loading: ({ error, pastDelay, timedOut }) => {
    if (error) return <LoadFail message="Load Failed" />
    if (timedOut) return <LoadFail message="Timed Out" />
    if (pastDelay) return <BackDropScreen open spinner />
    return null
  },
  delay: 250,
  timeout: 5000
})

const ExchangeLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-Exchange" */
      './Exchange'
    ),
  loading: ({ error, pastDelay, timedOut }) => {
    if (error) return <LoadFail message="Load Failed" />
    if (timedOut) return <LoadFail message="Timed Out" />
    if (pastDelay) return <BackDropScreen open spinner />
    return null
  },
  delay: 250,
  timeout: 5000
})

const NotFoundLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-NotFound" */
      './NotFound'
    ),
  loading: ({ error, pastDelay, timedOut }) => {
    if (error) return <LoadFail message="Load Failed" />
    if (timedOut) return <LoadFail message="Timed Out" />
    if (pastDelay) return <BackDropScreen open spinner />
    return null
  },
  delay: 250,
  timeout: 5000
})

const componentMap = {
  Home: <HomeLoadable />,
  Exchange: <ExchangeLoadable />,
  NotFound: <NotFoundLoadable />
}

const useStyles = makeStyles(theme => ({
  appContainer: {
    background: theme.palette.gradients.darkGrey,
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumn: '1fr',
    gridTemplateRows: 'auto 1fr auto'
  },
  nav: {
    gridColumn: '1 / 2',
    gridRow: '1 / 2'
  },
  body: {
    gridColumn: '1 / 2',
    gridRow: '2 / 3'
  },
  footer: {
    gridColumn: '1 / 2',
    gridRow: '3 / 4'
  }
}))

export default () => {
  const classes = useStyles()
  return (
    <CssBaseline>
      <div className={classes.appContainer}>
        <Nav loginButton={false} classes={classes.nav} menuItems={routes} />
        <Switch classes={classes.body}>
          {routes.map(route => (
            <Route
              key={route.key}
              exact={route.exact}
              path={route.path}
              render={() => componentMap[route.component]}
            />
          ))}
        </Switch>
        <Footer classes={classes.footer} routes={routes} />
      </div>
    </CssBaseline>
  )
}
