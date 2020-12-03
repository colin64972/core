import { Grid, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { SectionBg } from './SectionBg'
import { menuItems } from './constants'
import GavelIcon from '@material-ui/icons/Gavel'
import VpnLockIcon from '@material-ui/icons/VpnLock'
import HomeIcon from '@material-ui/icons/Home'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices'
import { ImageHandler } from '@cjo3/shared/react/components/ImageHandler'
import { clickWindowLink } from '@cjo3/shared/react/helpers'
import { ProfilePic } from './assets'

const iconMap: { [key: string]: JSX.Element } = {
  home: <HomeIcon />,
  resume: <BusinessCenterIcon />,
  apps: <ImportantDevicesIcon />,
  contact: <MailOutlineIcon />
}

const useStyles = makeStyles(
  theme => ({
    footer: {},
    footerLeft: {
      ...theme.custom.setFlex('column', 'flex-start', 'flex-start')
    },
    menuItem: {
      'color': theme.palette.grey[500],
      'textAlign': 'left',
      'marginBottom': theme.custom.setSpace(),
      'transition': 'color 250ms ease-out',
      '&:hover': {
        color: 'white'
      },
      '&:last-child': {
        marginBottom: 0
      }
    },
    menuItemIcon: {
      marginRight: theme.custom.setSpace()
    },
    footerRight: {
      ...theme.custom.setFlex('column', 'space-between', 'flex-end')
    },
    badge: {
      margin: `${theme.custom.setSpace('md')}px 0`,
      [theme.breakpoints.up('sm')]: {
        margin: 0
      }
    },
    badgeTopRow: {
      ...theme.custom.setFlex('row', 'flex-end', 'center'),
      '&:hover': {
        cursor: 'pointer'
      }
    },
    badgePic: {
      'order': 1,
      'margin': `0 ${theme.custom.setSpace()}px 0 0`,
      'borderRadius': theme.custom.setSpace(),
      'height': 48,
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
      'color': theme.palette.primary[600],
      'textAlign': 'left',
      'transition': 'color 250ms ease-out',
      '&:hover': {
        color: theme.palette.primary.main
      },
      [theme.breakpoints.up('sm')]: {
        order: 1,
        textAlign: 'right'
      }
    },
    badgeSubtitle: {
      textAlign: 'left',
      color: theme.palette.grey[500],
      [theme.breakpoints.up('sm')]: {
        textAlign: 'right'
      }
    },
    legalText: {
      color: theme.palette.grey[500],
      textAlign: 'left',
      margin: 0,
      [theme.breakpoints.up('sm')]: {
        textAlign: 'right'
      }
    }
  }),
  {
    name: 'Footer'
  }
)

export const Footer: React.FC = (): JSX.Element => {
  const classes = useStyles()
  const badgeClickHandler = (event: React.MouseEvent): void => {
    clickWindowLink(process.env.SITE_URL, true)
  }
  const menuItemClickHandler = (linkTo: string) => (
    event: React.MouseEvent
  ): void => {
    clickWindowLink(linkTo)
  }
  return (
    <SectionBg top left bgColor="theme.palette.grey[900]">
      <Grid component="footer" container className={classes.footer}>
        <Grid item xs={12} sm={6} className={classes.footerLeft}>
          {menuItems.map(item => (
            <Button
              key={item.key}
              type="button"
              className={classes.menuItem}
              onClick={menuItemClickHandler(item.to)}>
              {iconMap[item.icon]}
              &emsp;
              {item.label}
            </Button>
          ))}
          <Button type="button" className={classes.menuItem}>
            <GavelIcon />
            &emsp; Terms &amp; Conditions
          </Button>
          <Button type="button" className={classes.menuItem}>
            <VpnLockIcon />
            &emsp; Privacy Policy
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.footerRight}>
          <Grid className={classes.badge}>
            <Grid className={classes.badgeTopRow} onClick={badgeClickHandler}>
              <ImageHandler
                asset={ProfilePic}
                outerClass={classes.badgePic}
                height={48}
              />
              <Typography variant="h5" className={classes.badgeTitle}>
                Need Help with JavaScript App Development?
              </Typography>
            </Grid>
            <Typography variant="body1" className={classes.badgeSubtitle}>
              Available for Hire!
            </Typography>
          </Grid>
          <Typography variant="body1" className={classes.legalText}>
            &copy; {new Date().getFullYear()} {process.env.SITE_NAME}. All
            rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </SectionBg>
  )
}
