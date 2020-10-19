import React, { useState } from 'react'
import Loadable from 'react-loadable'
import { defaultPadding } from '@northtrend/shared/react/theming'
import { ImageHandler } from '@northtrend/shared/react/components/ImageHandler'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import GavelIcon from '@material-ui/icons/Gavel'
import RateReviewIcon from '@material-ui/icons/RateReview'
import VpnLockIcon from '@material-ui/icons/VpnLock'
import WebIcon from '@material-ui/icons/Web'
import { makeStyles } from '@material-ui/styles'
import { constants } from '@northtrend/shared/raw/constants/searchQueryEvaluator'
import { ColinProfile } from '../../../assets'
import { BackDropScreen } from '@northtrend/shared/react/components/BackDropScreen'

const TermsAndConditionsLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-TermsAndConditions" */
      /* webpackPrefetch: true */
      '@northtrend/shared/react/components/TermsAndConditions'
    ),
  loading: () => <BackDropScreen isOpen spinner />,
  render: (loaded, props) => {
    let Component = loaded.TermsAndConditions
    return <Component {...props} />
  }
})

const PPLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-PrivacyPolicy" */
      /* webpackPrefetch: true */
      '@northtrend/shared/react/components/PrivacyPolicy'
    ),
  loading: () => <BackDropScreen isOpen spinner />,
  render: (loaded, props) => {
    let Component = loaded.PrivacyPolicy
    return <Component {...props} />
  }
})

const useStyles = makeStyles(theme => ({
  footerSection: {
    backgroundColor: theme.palette.grey[900],
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace, 0.5),
    [theme.breakpoints.down('lg')]: {
      ...defaultPadding(theme.breakpoints, theme.custom.setSpace)
    }
  },
  footerNav: {
    ...theme.custom.setFlex('column nowrap', 'flex-start', 'flex-start')
  },
  navButton: {
    ...theme.custom.buttons.base,
    'padding': theme.custom.setSpace() / 2,
    'paddingLeft': 0,
    'fontSize': theme.custom.setSpace() * 1.25,
    'color': theme.palette.primary[800],
    ...theme.custom.setFlex(),
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary[700]
    }
  },
  menuItemIcon: {
    fontSize: theme.custom.setSpace() * 1.5,
    marginRight: theme.custom.setSpace() / 2
  },
  footerRight: {
    ...theme.custom.setFlex('column nowrap', null, 'flex-end'),
    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
      margin: `${theme.custom.setSpace('sm')}px 0 0 0`
    }
  },
  badgeTop: {
    ...theme.custom.setFlex('row nowrap', 'flex-end'),
    margin: `0 0 ${theme.custom.setSpace()}px 0`,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start'
    }
  },
  badgeButton: {
    ...theme.custom.buttons.base,
    'color': theme.palette.primary[800],
    'position': 'relative',
    'top': 2,
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary[700]
    },
    [theme.breakpoints.down('xs')]: {
      order: 2,
      top: 0
    }
  },
  badgeHeading: {
    textAlign: 'right',
    lineHeight: 1.25,
    fontSize: theme.custom.setSpace() * 1.5,
    margin: `0 ${theme.custom.setSpace()}px 0 0`,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      margin: `0 0 0 ${theme.custom.setSpace()}px`
    }
  },
  colinProfile: {
    width: '100%',
    maxWidth: 48,
    borderRadius: theme.custom.borderRadius
  },
  badgeSubheading: {
    textAlign: 'right',
    color: theme.palette.grey[700],
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.custom.setSpace() * 1.25,
      textAlign: 'left'
    }
  },
  copyright: {
    fontSize: theme.custom.setSpace() * 1.25,
    color: theme.palette.grey[700],
    textAlign: 'right',
    margin: `28px 0 0 0`,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left'
    }
  }
}))

export const Footer = () => {
  const classes = useStyles()

  const [TAndCOpen, setTAndCOpen] = useState(false)

  const [PPOpen, setPPOpen] = useState(false)

  const openTAndCHandler = event => setTAndCOpen(true)

  const closeTAndCHandler = () => setTAndCOpen(false)

  const openPPHandler = event => setPPOpen(true)

  const closePPHandler = () => setPPOpen(false)

  return (
    <Grid item xs={12} component="section" className={classes.footerSection}>
      {TAndCOpen && (
        <TermsAndConditionsLoadable
          open={TAndCOpen}
          closeHandler={closeTAndCHandler}
          siteName={process.env.SITE_NAME}
          siteUrl={process.env.SITE_URL}
          siteContactEmail={process.env.SITE_CONTACT_EMAIL}
        />
      )}
      {PPOpen && (
        <PPLoadable
          open={PPOpen}
          closeHandler={closePPHandler}
          siteName={process.env.SITE_NAME}
          siteUrl={process.env.SITE_URL}
          siteContactEmail={process.env.SITE_CONTACT_EMAIL}
        />
      )}
      <Grid
        container
        component="footer"
        justify="space-between"
        alignItems="flex-start">
        <Grid item xs={12} sm={6}>
          <nav className={classes.footerNav}>
            <Link
              component="button"
              href={constants.URLS.HOME}
              className={classes.navButton}>
              <WebIcon className={classes.menuItemIcon} />
              Home
            </Link>
            <button className={classes.navButton} onClick={openTAndCHandler}>
              <GavelIcon className={classes.menuItemIcon} />
              Terms &amp; Conditions
            </button>
            <button className={classes.navButton} onClick={openPPHandler}>
              <VpnLockIcon className={classes.menuItemIcon} />
              Privacy Policy
            </button>
            <Link
              component="button"
              href={constants.URLS.FEEDBACK}
              className={classes.navButton}>
              <RateReviewIcon className={classes.menuItemIcon} />
              Feedback
            </Link>
          </nav>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.footerRight}>
          <div className={classes.badgeTop}>
            <Link
              component="button"
              className={classes.badgeButton}
              href={constants.URLS.NEBOCAT}>
              <Typography variant="h6" className={classes.badgeHeading}>
                Need help with JavaScript
                <br />
                app development?
              </Typography>
            </Link>
            <ImageHandler
              asset={ColinProfile}
              styleClass={classes.colinProfile}
            />
          </div>
          <Typography variant="body1" className={classes.badgeSubheading}>
            Available for hire today!
          </Typography>
          <Typography variant="body1" className={classes.copyright}>
            &copy; {new Date().getFullYear()} {process.env.COPYRIGHT_ENTITY}. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
