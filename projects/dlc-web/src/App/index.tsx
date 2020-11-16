import { CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useLocation } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { Editor } from './Editor'
import { Preview } from './Editor/Preview/'
import { Footer } from './Footer'
import { Home } from './Home'
import { NotFound } from './NotFound'
import { ExportPanel } from './Editor/ExportPanel'
import { Test } from './Test'
import { TopNav } from './TopNav'

const useStyles = makeStyles(theme => ({
  App_pageContainer: {
    ...theme.custom.setGrid(12, 'auto 1fr auto'),
    ...theme.custom.fullScreen
  },
  App_topNavPosition: {
    gridColumn: '1 / 13',
    gridRow: 1
  },
  App_contentPosition: {
    ...theme.custom.setFlex('column', 'flex-start'),
    gridColumn: '1 / 13',
    gridRow: 2
  },
  App_footerPosition: {
    gridColumn: '1 / 13',
    gridRow: 3
  }
}))

export const App: React.FC = (): JSX.Element => {
  const classes = useStyles()
  const location = useLocation()
  const withNav = location.pathname.includes('editor')
  return (
    <CssBaseline>
      <div className={classes.App_pageContainer}>
        {withNav && <TopNav style={classes.App_topNavPosition} />}
        <div className={classes.App_contentPosition}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/editor" exact component={Editor} />
            <Route path="/test" exact component={ExportPanel} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </div>
        <Footer style={classes.App_footerPosition} />
      </div>
    </CssBaseline>
  )
}
