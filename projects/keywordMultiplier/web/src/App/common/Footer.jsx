import React from 'react'
import { defaultPadding } from '@colin30/shared/react/theming'
import { generateKey } from '@colin30/shared/react'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import GavelIcon from '@material-ui/icons/Gavel'
import RateReviewIcon from '@material-ui/icons/RateReview'
import VpnLockIcon from '@material-ui/icons/VpnLock'
import WebIcon from '@material-ui/icons/Web'
import { makeStyles } from '@material-ui/styles'
import constants from '../constants'
import ProfileImage from '../../exports/images/colin30-profile-1000w.jpg'

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
  linkButton: {
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
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      fontSize: theme.custom.setSpace() * 1.5,
      marginTop: theme.custom.setSpace() / 2
    }
  },
  profileImage: {
    width: 48,
    borderRadius: theme.custom.borderRadius,
    margin: `0 0 0 ${theme.custom.setSpace()}px`,
    [theme.breakpoints.down('xs')]: {
      margin: `0 ${theme.custom.setSpace()}px 0 0`
    }
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

const Footer = () => {
  const classes = useStyles()
  const menuItems = [
    {
      label: 'Home',
      href: constants.URLS.HOME,
      key: generateKey(),
      icon: <WebIcon className={classes.menuItemIcon} />
    },
    {
      label: 'Terms of Service',
      href: constants.URLS.TOS,
      key: generateKey(),
      icon: <GavelIcon className={classes.menuItemIcon} />
    },
    {
      label: 'Privacy Policy',
      href: constants.URLS.PP,
      key: generateKey(),
      icon: <VpnLockIcon className={classes.menuItemIcon} />
    },
    {
      label: 'Feedback',
      href: constants.URLS.FEEDBACK,
      key: generateKey(),
      icon: <RateReviewIcon className={classes.menuItemIcon} />
    }
  ]
  return (
    <Grid item xs={12} component="section" className={classes.footerSection}>
      <Grid
        container
        component="footer"
        justify="space-between"
        alignItems="flex-start">
        <Grid item xs={12} sm={6}>
          <nav className={classes.footerNav}>
            {menuItems.map(item => (
              <Link
                key={item.key}
                component="button"
                onClick={() => {}}
                href={item.href}
                className={classes.linkButton}>
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.footerRight}>
          <div className={classes.badgeTop}>
            <Link
              component="button"
              className={classes.badgeButton}
              href={constants.URLS.NEBOCAT}
              onClick={() => {}}>
              <Typography variant="h6" className={classes.badgeHeading}>
                Need help with JavaScript
                <br />
                app development?
              </Typography>
            </Link>
            <img src={ProfileImage} className={classes.profileImage} />
          </div>
          <Typography variant="body1" className={classes.badgeSubheading}>
            Available for hire today!
          </Typography>
          <Typography variant="body1" className={classes.copyright}>
            &copy; {new Date().getFullYear()} Colin30 Media Inc.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Footer
