import React from 'react'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { defaultPadding } from '@colin30/shared/react/theming'

const useStyles = makeStyles(theme => ({
  headerSection: {
    width: '100vw',
    minHeight: '75vh',
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
    textAlign: 'center',
    lineHeight: 0.9,
    marginBottom: theme.custom.setSpace(),
    fontSize: theme.custom.setSpace() * 6,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.custom.setSpace('sm') * 1.67
    }
  },
  subtitle: {
    textTransform: 'unset',
    fontWeight: 'unset',
    textAlign: 'center'
  }
}))

export const Header = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12} component="section" className={classes.headerSection}>
      <FadeIn direction="y" position={-100}>
        <VpnKeyIcon className={classes.icon} />
      </FadeIn>
      <FadeIn direction="x" position={-100}>
        <Typography variant="h1" color="primary" className={classes.title}>
          Keyword Multiplier
        </Typography>
      </FadeIn>
      <FadeIn direction="y" position={100}>
        <Typography variant="h4" className={classes.subtitle}>
          Content Marketing Keyword Multiplier Tool
        </Typography>
      </FadeIn>
    </Grid>
  )
}
