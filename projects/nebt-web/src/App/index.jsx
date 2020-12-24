import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/styles'
import Nav from './components/nav'
import Footer from './components/footer'
import routes from './routes'
import Home from './Home'
import Exchange from './Exchange'
import NotFound from './NotFound'

const componentMap = {
  Home,
  Exchange,
  NotFound
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
              component={componentMap[route.component]}
            />
          ))}
        </Switch>
        <Footer classes={classes.footer} routes={routes} />
      </div>
    </CssBaseline>
  )
}
