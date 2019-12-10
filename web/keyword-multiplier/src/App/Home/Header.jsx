import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { defaultPadding } from '@colin30/web-shared/react/theming'
import FadeIn from '@colin30/web-shared/react/components/FadeIn'

const useStyles = makeStyles(theme => ({
  headerSection: {
    width: '100vw',
    minHeight: '100vh',
    ...theme.custom.setFlex('column nowrap'),
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace)
  },
  icon: {
    fontSize: theme.custom.setSpace('lg'),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.custom.setSpace('md')
    }
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.custom.setSpace('sm') * 1.67
    }
  },
  subtitle: {
    textTransform: 'unset',
    fontWeight: 'unset'
  }
}))

const Header = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12} component="section" className={classes.headerSection}>
      <FadeIn
        direction="y"
        position={-100}
        component={<VpnKeyIcon className={classes.icon} />}
      />
      <FadeIn
        direction="x"
        position={-100}
        component={
          <Typography variant="h1" color="primary" className={classes.title}>
            Keyword Multiplier
          </Typography>
        }
      />
      <FadeIn
        direction="y"
        position={100}
        component={
          <Typography variant="h4" className={classes.subtitle}>
            Content Marketing Keyword Multiplier Tool
          </Typography>
        }
      />
    </Grid>
  )
}

export default Header
