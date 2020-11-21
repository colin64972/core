import { switchLinkRoutePath } from '@cjo3/shared/react/helpers'
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ErrorIcon from '@material-ui/icons/Error'
import HomeIcon from '@material-ui/icons/Home'
import SettingsIcon from '@material-ui/icons/Settings'
import clsx from 'clsx'
import React from 'react'
import { topNavItems } from '../constants'

const useStyles = makeStyles(theme => ({
  TopNav_background: {
    backgroundColor: theme.palette.primary.main
  },
  TopNav_navItem: {
    padding: theme.custom.setSpace()
  },
  TopNav_contentContainer: {
    ...theme.custom.contentContainer,
    padding: `0 ${theme.custom.setSpace('sm')}px`
  }
}))

interface Props {
  style: string
}

export const TopNav: React.FC<Props> = ({ style }): JSX.Element => {
  const classes = useStyles()

  const iconMap = {
    '/': <HomeIcon size="small" />,
    '/converter': <SettingsIcon size="small" />,
    '/error': <ErrorIcon size="small" />
  }

  return (
    <Grid
      container
      justify="center"
      className={clsx(style, classes.TopNav_background)}>
      <Grid
        container
        component="nav"
        className={classes.TopNav_contentContainer}>
        {topNavItems.map(link => (
          <Button
            key={link.key}
            href={switchLinkRoutePath(link.to)}
            startIcon={iconMap[link.to]}
            className={classes.TopNav_navItem}>
            {link.label}
          </Button>
        ))}
      </Grid>
    </Grid>
  )
}
