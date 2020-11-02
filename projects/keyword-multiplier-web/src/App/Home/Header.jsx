import React from 'react'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MultilineChartIcon from '@material-ui/icons/MultilineChart'
import { defaultPadding } from '@cjo3/shared/react/themes/theming'

const useStyles = makeStyles(theme => ({
  headerSection: {
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace),
    ...theme.custom.setFlex('column nowrap'),
    width: '100vw',
    minHeight: '75vh'
  },
  iconContainer: {
    ...theme.custom.setFlex()
  },
  icon: {
    fontSize: theme.custom.setSpace('md')
  },
  mainHeading: {
    ...theme.typography.mainHeading,
    color: theme.palette.primary.main,
    fontSize: theme.typography.fontSize * 2.5,
    textAlign: 'center'
  },
  subHeading: {
    ...theme.typography.subHeading,
    fontSize: theme.typography.fontSize * 1.5,
    textAlign: 'center'
  }
}))

export const Header = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12} component="section" className={classes.headerSection}>
      <FadeIn direction="y" position={-100} outerClass={classes.iconContainer}>
        <MultilineChartIcon className={classes.icon} />
      </FadeIn>
      <FadeIn direction="x" position={-100}>
        <Typography component="h1" className={classes.mainHeading}>
          Keyword Multiplier
        </Typography>
      </FadeIn>
      <FadeIn direction="y" position={100}>
        <Typography component="h2" className={classes.subHeading}>
          Compare Metrics of Keyword Variations
        </Typography>
      </FadeIn>
    </Grid>
  )
}
