import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  nav: {
    ...theme.custom.setFlex(),
    backgroundColor: theme.palette.grey[300],
    width: '100%'
  },
  navItem: {
    padding: theme.custom.setSpace(),
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary[100],
    clipPath: `polygon(0 0, 0 75%, 50% 100%, 100% 75%, 100% 0%)`
  }
}))

export const TopNav: React.FC = (): JSX.Element => {
  const classes = useStyles()
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
        <Link key={link.key} to={link.to} className={classes.navItem}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
