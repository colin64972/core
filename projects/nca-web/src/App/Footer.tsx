import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { ImageHandler } from '@cjo3/shared/react/components/ImageHandler'
import { LoadFail } from '@cjo3/shared/react/components/LoadFail'
import { clickWindowLink, setHtml } from '@cjo3/shared/react/helpers'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GavelIcon from '@material-ui/icons/Gavel'
import VpnLockIcon from '@material-ui/icons/VpnLock'
import React, { useState } from 'react'
import Loadable from 'react-loadable'
import { useSelector } from 'react-redux'
import { AngleBand } from './AngleBand'
import { ProfilePic } from './assets'
import { ContentContainer } from './ContentContainer'
import { NavButtonSet } from './NavButtonSet'
import clsx from 'clsx'

const TcLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-TermsAndConditions" */
      '@cjo3/shared/react/components/TermsAndConditions'
    ),
  loading: ({ error, pastDelay, timedOut }) => {
    if (error) return <LoadFail message="Load Failed" />
    if (timedOut) return <LoadFail message="Timed Out" />
    if (pastDelay) return <BackDropScreen isOpen spinner />
    return null
  },
  delay: 250,
  timeout: 5000,
  render: (loaded, props) => {
    const Component = loaded.TermsAndConditions
    return <Component {...props} />
  }
})

const PpLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-PrivacyPolicy" */
      '@cjo3/shared/react/components/PrivacyPolicy'
    ),
  loading: ({ error, pastDelay, timedOut }) => {
    if (error) return <LoadFail message="Load Failed" />
    if (timedOut) return <LoadFail message="Timed Out" />
    if (pastDelay) return <BackDropScreen isOpen spinner />
    return null
  },
  delay: 250,
  timeout: 5000,
  render: (loaded, props) => {
    const Component = loaded.PrivacyPolicy
    return <Component {...props} />
  }
})

const useStyles = makeStyles(
  theme => ({
    footerLeft: {
      ...theme.custom.setFlex('column', 'center', 'flex-start')
    },
    footerRight: {
      [theme.breakpoints.up('sm')]: {
        ...theme.custom.setFlex('column', 'space-between', 'flex-end')
      }
    },
    menuItem: {
      'fontFamily': 'Share Tech Mono,' + theme.typography.fontFamily,
      'color': theme.palette.grey[500],
      'textAlign': 'left',
      'marginBottom': theme.custom.setSpace() / 2,
      'transition': 'color 250ms ease-out',
      '&:hover': {
        color: 'white'
      },
      '&:last-child': {
        marginBottom: 0
      }
    },
    badge: {
      margin: `${theme.custom.setSpace('md')}px 0`,
      [theme.breakpoints.up('sm')]: {
        margin: 0
      }
    },
    badgeTopRow: {
      ...theme.custom.setFlex('row', 'flex-start', 'center'),
      '&:hover': {
        cursor: 'pointer'
      }
    },
    badgePic: {
      'borderRadius': 5,
      'order': 1,
      'margin': `0 ${theme.custom.setSpace()}px 0 0`,
      'transition': 'box-shadow 250ms ease-out',
      '&:hover': {
        boxShadow: theme.custom.boxShadow
      },
      [theme.breakpoints.up('sm')]: {
        order: 2,
        margin: `0 0 0 ${theme.custom.setSpace()}px`
      }
    },
    badgeTitle: {
      'order': 2,
      'width': 200,
      'color': theme.palette.primary[600],
      'fontSize': theme.typography.fontSize * 1.5,
      ...theme.typography.shareTechMono,
      'textAlign': 'left',
      'transition': 'color 250ms ease-out',
      '&:hover': {
        color: theme.palette.primary.main
      },
      [theme.breakpoints.up('sm')]: {
        order: 1,
        textAlign: 'right',
        width: 310
      }
    },
    badgeSubtitle: {
      textAlign: 'left',
      color: theme.palette.grey[500],
      fontSize: theme.typography.fontSize,
      [theme.breakpoints.up('sm')]: {
        textAlign: 'right'
      }
    },
    legalText: {
      color: theme.palette.grey[500],
      textAlign: 'left',
      fontSize: theme.typography.fontSize,
      margin: 0,
      [theme.breakpoints.up('sm')]: {
        textAlign: 'right'
      }
    },
    tcButton: {
      marginTop: theme.custom.setSpace() / 2
    }
  }),
  {
    name: 'Footer'
  }
)

export const Footer: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const content = useSelector(state => state.content.footer)

  const [tcOpen, setTcOpen] = useState<boolean>(false)
  const [ppOpen, setPpOpen] = useState<boolean>(false)

  const tcOpenHandler = (event: React.MouseEvent): void => {
    setTcOpen(true)
  }

  const tcCloseHandler = (event: React.MouseEvent): void => {
    setTcOpen(false)
  }
  const ppOpenHandler = (event: React.MouseEvent): void => {
    setPpOpen(true)
  }

  const ppCloseHandler = (event: React.MouseEvent): void => {
    setPpOpen(false)
  }

  const badgeClickHandler = (event: React.MouseEvent): void => {
    clickWindowLink(process.env.SITE_URL, true)
  }

  if (!content) return null

  return (
    <Grid component="footer" container>
      <AngleBand up left color="grey900" />
      <ContentContainer gradient="theme.custom.setLinearGradient(180, theme.palette.grey[900], theme.palette.grey[800])">
        <Grid container>
          <Grid item xs={12} sm={6} className={classes.footerLeft}>
            <NavButtonSet
              color="theme.palette.grey[500]"
              direction="column"
              justification="flex-start"
              alignment="flex-start"
            />
            <Button
              type="button"
              className={clsx(classes.menuItem, classes.tcButton)}
              onClick={tcOpenHandler}>
              <GavelIcon />
              &emsp;{content[0]}
            </Button>
            <Button
              type="button"
              className={classes.menuItem}
              onClick={ppOpenHandler}>
              <VpnLockIcon />
              &emsp;{content[1]}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.footerRight}>
            <Grid className={classes.badge}>
              <Grid className={classes.badgeTopRow} onClick={badgeClickHandler}>
                <ImageHandler
                  asset={ProfilePic}
                  pictureClass={classes.badgePic}
                  width={60}
                />
                <Typography
                  variant="h5"
                  className={classes.badgeTitle}
                  dangerouslySetInnerHTML={setHtml(content[2])}
                />
              </Grid>
              <Typography variant="body1" className={classes.badgeSubtitle}>
                {content[3]}
              </Typography>
            </Grid>
            <Typography variant="body1" className={classes.legalText}>
              &copy; {new Date().getFullYear()} {process.env.SITE_NAME}.{' '}
              {content[4]}
            </Typography>
          </Grid>
        </Grid>
      </ContentContainer>
      {tcOpen && (
        <TcLoadable
          open={tcOpen}
          closeHandler={tcCloseHandler}
          siteName={process.env.SITE_NAME}
          siteUrl={process.env.SITE_URL}
          siteContactEmail={process.env.SITE_CONTACT_EMAIL}
        />
      )}
      {ppOpen && (
        <PpLoadable
          open={ppOpen}
          closeHandler={ppCloseHandler}
          siteName={process.env.SITE_NAME}
          siteUrl={process.env.SITE_URL}
          siteContactEmail={process.env.SITE_CONTACT_EMAIL}
        />
      )}
    </Grid>
  )
}
