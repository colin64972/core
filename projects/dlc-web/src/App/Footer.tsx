import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GavelIcon from '@material-ui/icons/Gavel'
import VpnLockIcon from '@material-ui/icons/VpnLock'
import WebIcon from '@material-ui/icons/Web'
import clsx from 'clsx'
import React, { useState } from 'react'
import Loadable from 'react-loadable'

const TermsAndConditionsLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-TermsAndConditions" */
      /* webpackPrefetch: false */
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
      /* webpackPrefetch: false */
      '@cjo3/shared/react/components/PrivacyPolicy'
    ),
  loading: () => <BackDropScreen isOpen spinner />,
  render: (loaded, props) => {
    let Component = loaded.PrivacyPolicy
    return <Component {...props} />
  }
})

const useStyles = makeStyles(theme => ({
  Footer_container: {
    padding: theme.custom.setSpace('sm'),
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.grey[900],
      theme.palette.grey[800]
    )
  },
  Footer_linkButton: {
    ...theme.custom.setFlex('row', 'flext-start', 'center'),
    'marginTop': theme.custom.setSpace(),
    '&:first-child': {
      marginTop: 0
    }
  },
  Footer_linkButtonIcon: {
    fontSize: theme.typography.fontSize * 1.5,
    marginRight: theme.custom.setSpace() / 2,
    position: 'relative',
    top: -2
  },
  Footer_badgeTitleImage: {
    ...theme.custom.setFlex('row', 'flex-end'),
    [theme.breakpoints.down('xs')]: {
      ...theme.custom.setFlex('row', 'flex-start'),
      margin: `${theme.custom.setSpace('sm')}px 0 0 0`
    },
    '&:hover': {
      cursor: 'pointer'
    }
  },
  Footer_image: {
    'order': 2,
    'borderRadius': theme.custom.setSpace() / 4,
    'margin': `0 0 0 ${theme.custom.setSpace()}px`,
    [theme.breakpoints.down('xs')]: {
      order: 1,
      margin: `0 ${theme.custom.setSpace()}px 0 0`
    },
    'transition': 'all 250ms ease-out',
    '&:hover': {
      boxShadow: theme.custom.boxShadow
    }
  },
  Footer_badgeTitle: {
    'textAlign': 'right',
    'order': 1,
    [theme.breakpoints.down('xs')]: {
      order: 2,
      textAlign: 'left'
    },
    'transition': 'all 250ms ease-out',
    '&:hover': {
      color: theme.palette.primary[400]
    }
  },
  Footer_badgeSubtitle: {
    color: theme.palette.grey[400],
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left'
    }
  },
  Footer_copyright: {
    marginTop: theme.custom.setSpace('sm'),
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left'
    }
  }
}))

interface Props {
  style: string
}

export const Footer: React.FC<Props> = ({ style }): JSX.Element => {
  const classes = useStyles()

  const [TAndCOpen, setTAndCOpen] = useState<boolean>(false)

  const [PPOpen, setPPOpen] = useState<boolean>(false)

  const openTAndCHandler = (): void => setTAndCOpen(true)

  const closeTAndCHandler = (): void => setTAndCOpen(false)

  const openPPHandler = (): void => setPPOpen(true)

  const closePPHandler = (): void => setPPOpen(false)

  const badgeClickHandler = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (window)
      window.open(process.env.SITE_URL, '_blank') ||
        window.location.replace(process.env.SITE_URL)
  }
  const homeLinkHandler = (event: React.MouseEvent<HTMLDivElement>): void => {
    const url = process.env.USE_MOCKS
      ? '/'
      : `${process.env.SITE_URL}${process.env.APP_PATH}/`
    if (window) window.location.replace(url)
  }

  return (
    <Grid
      container
      component="footer"
      className={clsx(style, classes.Footer_container)}>
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
      <Grid item xs={12} sm={6}>
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="column">
          <Button
            type="button"
            color="primary"
            onClick={homeLinkHandler}
            className={classes.Footer_linkButton}>
            <WebIcon className={classes.Footer_linkButtonIcon} />
            Home
          </Button>
          <Button
            type="button"
            color="primary"
            className={classes.Footer_linkButton}
            onClick={openTAndCHandler}>
            <GavelIcon className={classes.Footer_linkButtonIcon} />
            Terms of Service
          </Button>
          <Button
            type="button"
            color="primary"
            className={classes.Footer_linkButton}
            onClick={openPPHandler}>
            <VpnLockIcon className={classes.Footer_linkButtonIcon} />
            Privacy Policy
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid
          container
          className={classes.Footer_badgeTitleImage}
          onClick={badgeClickHandler}>
          <Typography
            variant="h5"
            color="primary"
            className={classes.Footer_badgeTitle}>
            Need Help with JavaScript
            <br />
            App Development?
          </Typography>
          <img
            className={classes.Footer_image}
            width={64}
            src="https://cdn.nebocat.ca/keyword-multiplier/assets/images/profile-pic-48w.jpg"
          />
        </Grid>
        <Typography variant="body1" className={classes.Footer_badgeSubtitle}>
          Available for Hire!
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          className={classes.Footer_copyright}>
          &copy; 2020 {process.env.SITE_NAME}. All rights reserved.
        </Typography>
      </Grid>
    </Grid>
  )
}
