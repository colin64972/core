import React from 'react'
import { withRouter } from 'react-router-dom'
import FadeIn from '@colin30/web-shared/react/components/FadeIn'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import InfoIcon from '@material-ui/icons/Info'
import { defaultPadding } from '@colin30/web-shared/react/theming'
import { makeStyles } from '@material-ui/styles'
import Footer from './common/Footer'
import constants from '../App/constants'

const useStyles = makeStyles(theme => ({
  notFoundSection: {
    width: '100vw',
    minHeight: '100vh',
    backgroundColor: theme.palette.secondary[300],
    ...theme.custom.setFlex('column nowrap', 'center', 'flex-start'),
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace)
  },
  icon: {
    color: theme.palette.secondary[50],
    fontSize: theme.custom.setSpace('lg'),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.custom.setSpace('md')
    }
  },
  title: {
    color: theme.palette.secondary[50],
    textAlign: 'left',
    fontSize: theme.custom.setSpace('sm'),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.custom.setSpace() * 1.5
    }
  },
  subtitle: {
    fontSize: theme.custom.setSpace('sm') * 0.9,
    color: theme.palette.secondary[100],
    textAlign: 'left',
    textTransform: 'unset',
    fontWeight: 'unset',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.custom.setSpace() * 1.5
    }
  },
  appLink: {
    'color': theme.palette.primary.main,
    'textDecoration': 'none',
    'transition': 'all 250ms ease-out',
    '&:hover': {
      color: theme.palette.primary[300],
      textDecoration: 'none'
    }
  }
}))

const NotFoundComp = props => {
  const classes = useStyles()
  const { history } = props
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      id="not-found-container">
      <Grid
        item
        xs={12}
        component="section"
        className={classes.notFoundSection}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <FadeIn
              direction="x"
              position={-100}
              component={<InfoIcon className={classes.icon} />}
            />
          </Grid>
          <Grid item>
            <FadeIn
              direction="x"
              position={100}
              component={
                <Typography variant="h1" className={classes.title}>
                  Oops, Nothing Here
                </Typography>
              }
            />
            <FadeIn
              direction="y"
              position={100}
              component={
                <Typography variant="h4" className={classes.subtitle}>
                  Back to the{' '}
                  <Link
                    className={classes.appLink}
                    href={constants.URLS.APP}
                    onClick={event => {
                      event.preventDefault()
                      history.push(constants.URLS.APP)
                    }}>
                    app!
                  </Link>
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  )
}

const NotFound = withRouter(NotFoundComp)

export default NotFound
