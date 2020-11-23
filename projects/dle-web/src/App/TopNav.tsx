import { switchLinkRoutePath } from '@cjo3/shared/react/helpers'
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ErrorIcon from '@material-ui/icons/Error'
import HomeIcon from '@material-ui/icons/Home'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import clsx from 'clsx'
import React from 'react'
import { topNavItems } from '../constants'

const useStyles = makeStyles(
  theme => ({
    TopNav_background: {
      backgroundColor: theme.palette.primary.main
    },
    TopNav_navItem: {
      'padding': theme.custom.setSpace(),
      'color': theme.palette.primary[100],
      'transition': 'all 250ms ease-out',
      '&:hover': {
        color: theme.palette.primary[50]
      }
    },
    TopNav_contentContainer: {
      ...theme.custom.contentContainer,
      padding: `0 ${theme.custom.setSpace('sm')}px`
    }
  }),
  {
    name: 'TopNav'
  }
)

interface Props {
  style: string
}

export const TopNav: React.FC<Props> = ({ style }): JSX.Element => {
  const classes = useStyles()

  const iconMap: { [key: string]: JSX.Element } = {
    '/': <HomeIcon size="small" />,
    '/converter': <ShuffleIcon size="small" />,
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
