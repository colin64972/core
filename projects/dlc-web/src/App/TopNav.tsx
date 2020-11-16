import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ErrorIcon from '@material-ui/icons/Error'
import clsx from 'clsx'
import HomeIcon from '@material-ui/icons/Home'
import SettingsIcon from '@material-ui/icons/Settings'
import React from 'react'
import { topNavItems } from '../constants'

const useStyles = makeStyles(theme => ({
  nav: {
    backgroundColor: theme.palette.primary.main
  },
  navItem: {
    padding: theme.custom.setSpace()
  }
}))

interface Props {
  style: string
}

export const TopNav: React.FC<Props> = ({ style }): JSX.Element => {
  const classes = useStyles()

  const iconMap = {
    '/': <HomeIcon size="small" />,
    '/editor': <SettingsIcon size="small" />,
    '/error': <ErrorIcon size="small" />
  }

  return (
    <nav className={clsx(style, classes.nav)}>
      {topNavItems.map(link => (
        <Button
          key={link.key}
          href={link.to}
          startIcon={iconMap[link.to]}
          className={classes.navItem}>
          {link.label}
        </Button>
      ))}
    </nav>
  )
}
