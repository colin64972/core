import React, { useState } from 'react'
import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { Grid, Link, Typography } from '@material-ui/core'
import Loadable from 'react-loadable'
import { makeStyles } from '@material-ui/core/styles'
import GavelIcon from '@material-ui/icons/Gavel'
import VpnLockIcon from '@material-ui/icons/VpnLock'
import WebIcon from '@material-ui/icons/Web'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'

const TermsAndConditionsLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-TermsAndConditions" */
      /* webpackPrefetch: true */
      '@cjo3/shared/react/components/TermsAndConditions'
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
      '@cjo3/shared/react/components/PrivacyPolicy'
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
    padding: theme.custom.setSpace(),
    [theme.breakpoints.up('sm')]: {
      padding: theme.custom.setSpace('sm')
    }
  },
  footerNav: {
    ...theme.custom.setFlex('column nowrap', 'flex-start', 'flex-start')
  },
  navButton: {
    ...theme.custom.buttonBase,
    ...theme.custom.setFlex(),
    'padding': theme.custom.setSpace() / 2,
    'paddingLeft': 0,
    'color': theme.palette.primary.main,
    'marginBottom': theme.custom.setSpace(),
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary[300]
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.custom.setSpace() / 2
    }
  },
  menuItemIcon: {
    fontSize: theme.typography.fontSize * 1.5,
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
    ...theme.custom.buttonBase,
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
    ...theme.typography.bold,
    textTransform: 'uppercase',
    textAlign: 'right',
    fontSize: theme.typography.fontSize * 1.33,
    lineHeight: 1.25,
    color: theme.palette.primary.main,
    margin: `0 ${theme.custom.setSpace()}px 0 0`,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      margin: `0 0 0 ${theme.custom.setSpace()}px`
    }
  },
  profilePic: {
    width: 64,
    borderRadius: 3
  },
  badgeSubheading: {
    textAlign: 'right',
    color: theme.palette.grey[700],
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left'
    }
  },
  copyright: {
    color: theme.palette.grey[700],
    textAlign: 'right',
    margin: `28px 0 0 0`,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left'
    }
  }
}))

export default ({ routes }) => {
  const classes = useStyles()
  const [TAndCOpen, setTAndCOpen] = useState(false)

  const [PPOpen, setPPOpen] = useState(false)

  const openTAndCHandler = () => setTAndCOpen(true)

  const closeTAndCHandler = () => setTAndCOpen(false)

  const openPPHandler = () => setPPOpen(true)

  const closePPHandler = () => setPPOpen(false)
  return (
    <Grid item xs={12} component="section" className={classes.footerSection}>
      <Grid
        container
        component="footer"
        justify="space-between"
        alignItems="flex-start">
        <Grid item xs={12} sm={6}>
          <nav className={classes.footerNav}>
            <Link href={routes[0].path} className={classes.navButton}>
              <WebIcon className={classes.menuItemIcon} />
              Home
            </Link>
            <Link href={routes[1].path} className={classes.navButton}>
              <AccountBalanceIcon className={classes.menuItemIcon} />
              Exchange
            </Link>
            <button className={classes.navButton} onClick={openTAndCHandler}>
              <GavelIcon className={classes.menuItemIcon} />
              Terms &amp; Conditions
            </button>
            <button className={classes.navButton} onClick={openPPHandler}>
              <VpnLockIcon className={classes.menuItemIcon} />
              Privacy Policy
            </button>
          </nav>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.footerRight}>
          <div className={classes.badgeTop}>
            <Link
              target="_blank"
              className={classes.badgeButton}
              href={`https://${process.env.COPYRIGHT_ENTITY}/`}>
              <Typography component="h5" className={classes.badgeHeading}>
                Need help with JavaScript
                <br />
                app development?
              </Typography>
            </Link>
            <img
              src={process.env.PROFILE_IMG_SRC}
              className={classes.profilePic}
            />
          </div>
          <Typography className={classes.badgeSubheading}>
            Available for hire today!
          </Typography>
          <Typography className={classes.copyright}>
            &copy; {new Date().getFullYear()} {process.env.COPYRIGHT_ENTITY}.
            All rights reserved.
          </Typography>
        </Grid>
      </Grid>
      {TAndCOpen && (
        <TermsAndConditionsLoadable
          open={TAndCOpen}
          closeHandler={closeTAndCHandler}
          siteName={process.env.COPYRIGHT_ENTITY}
          siteUrl={`https://${process.env.COPYRIGHT_ENTITY}/`}
          siteContactEmail={process.env.SITE_CONTACT_EMAIL}
        />
      )}
      {PPOpen && (
        <PPLoadable
          open={PPOpen}
          closeHandler={closePPHandler}
          siteName={process.env.COPYRIGHT_ENTITY}
          siteUrl={`https://${process.env.COPYRIGHT_ENTITY}/`}
          siteContactEmail={process.env.SITE_CONTACT_EMAIL}
        />
      )}
    </Grid>
  )
}
