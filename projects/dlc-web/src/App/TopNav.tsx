import { makeStyles } from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home'
import SettingsIcon from '@material-ui/icons/Settings'
import ErrorIcon from '@material-ui/icons/Error'
import React from 'react'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  nav: {
    ...theme.custom.setFlex('row', 'flex-start'),
    backgroundColor: theme.palette.primary.main,
    width: '100%'
  },
  navItem: {
    padding: theme.custom.setSpace()
  }
}))

export const TopNav: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const iconMap = {
    '/': <HomeIcon size="small" />,
    '/editor': <SettingsIcon size="small" />,
    '/error': <ErrorIcon size="small" />
  }

  return (
    <nav className={classes.nav}>
      {[
        {
          key: 'comon',
          to: '/',
          label: 'Home'
        },
        {
          key: 'karim',
          to: '/editor',
          label: 'Editor'
        },
        {
          key: 'sigmu',
          to: '/error',
          label: 'Error'
        }
      ].map(link => (
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
