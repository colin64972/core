import { setTracker, switchLinkRoutePath } from '@cjo3/shared/react/helpers'
import { CssBaseline, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert'
import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { SNACKBAR_TIMEOUT } from '../constants'
import {
  addTracker,
  closeSnackbar,
  addModernizrFeature
} from '../store/app/actions'
import { Snackbar as ISnackbar } from '../store/app/interfaces'
import {
  snackbarSelector,
  trackerSelector,
  webpOkSelector
} from '../store/selectors'
import { Converter } from './Converter'
import { Footer } from './Footer'
import { Home } from './Home'
import { NotFound } from './NotFound'
import { TopNav } from './TopNav'
import { Guide } from './Converter/Guide/'

const useStyles = makeStyles(
  theme => ({
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
  }),
  {
    name: 'App'
  }
)

const checkWebpOk = async dispatchHandler => {
  import(
    /* webpackChunkName: "chunk-modernizr" */
    'modernizr'
  ).then(({ default: mod }) => {
    mod.on('webp', status => {
      if (status.lossless && status.alpha) {
        dispatchHandler(addModernizrFeature('webp'))
      }
    })
  })
}

export const App: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  let withNav = false

  const location = useLocation()

  withNav = /\/converter\/?(guide\/?)?$/.test(location.pathname)

  const webpOk = useSelector(webpOkSelector)

  if (!process.env.IS_SERVER) {
    useLayoutEffect(() => {
      if (!webpOk) checkWebpOk(dispatch)
    }, [])
  }

  const snackbar: ISnackbar = useSelector(snackbarSelector)

  let snackbarTimeout: any

  const closeSnackbarHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    reason: string
  ): void => {
    if (snackbarTimeout && reason === 'clickaway') {
      dispatch(closeSnackbar())
      clearTimeout(snackbarTimeout)
    } else {
      snackbarTimeout = setTimeout(() => {
        dispatch(closeSnackbar())
      }, SNACKBAR_TIMEOUT)
    }
  }

  if (!process.env.IS_SERVER) {
    useLayoutEffect(() => {
      const styleTags = document.getElementsByTagName('style')
      const injectionPoint = document.getElementById('jssInjectionPoint')

      if (styleTags.length > 0) {
        for (let tag of styleTags) {
          if (tag.dataset?.meta && tag.dataset.meta === 'MuiSvgIcon') {
            injectionPoint.insertAdjacentElement('beforebegin', tag)
          }
        }
      }
    })
  }

  let tracker = useSelector(trackerSelector)

  useEffect(() => {
    if (!tracker) {
      tracker = setTracker(process.env.GA_TAG)
      tracker.initialize()
      dispatch(addTracker(tracker))
    }
  }, [tracker])

  useEffect(() => {
    tracker.pageHit(process.env.APP_ROOT_PATH, location.pathname)
  }, [location])

  return (
    <CssBaseline>
      <div className={classes.App_pageContainer}>
        <Snackbar
          key={snackbar.key}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={snackbar.open}
          onClose={closeSnackbarHandler}>
          <MuiAlert elevation={6} variant="filled" severity={snackbar.severity}>
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
        {withNav && <TopNav style={classes.App_topNavPosition} />}
        <div className={classes.App_contentPosition}>
          <Switch>
            <Route path={switchLinkRoutePath('/')} exact component={Home} />
            <Route
              path={switchLinkRoutePath('/converter')}
              exact
              component={Converter}
            />
            <Route
              path={switchLinkRoutePath('/converter/guide')}
              exact
              component={Guide}
            />
            <Route path="/*" component={NotFound} />
          </Switch>
        </div>
        <Footer style={classes.App_footerPosition} />
      </div>
    </CssBaseline>
  )
}
