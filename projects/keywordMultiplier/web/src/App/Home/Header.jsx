import React from 'react'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MultilineChartIcon from '@material-ui/icons/MultilineChart'
import { defaultPadding } from '@colin30/shared/react/theming'

const useStyles = makeStyles(theme => ({
  headerSection: {
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace),
    ...theme.custom.setFlex('column nowrap'),
    width: '100vw',
    minHeight: '75vh'
  },
  icon: {
    fontSize: theme.custom.setSpace('md')
  },
  mainHeading: {
    ...theme.typography.mainHeading,
    width: '100%',
    textAlign: 'center',
    color: theme.palette.primary.main
  },
  subHeading: {
    width: '100%',
    textAlign: 'center',
    lineHeight: 1.25
  }
}))

export const Header = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12} component="section" className={classes.headerSection}>
      <FadeIn direction="y" position={-100}>
        <MultilineChartIcon className={classes.icon} />
      </FadeIn>
      <FadeIn direction="x" position={-100}>
        <Typography variant="h4" className={classes.mainHeading}>
          Search Query Interest Evaluator
        </Typography>
      </FadeIn>
      <FadeIn direction="y" position={100}>
        <Typography variant="subtitle2" className={classes.subHeading}>
          Compare and Evalute Interest in Search Query Variations
        </Typography>
      </FadeIn>
    </Grid>
  )
}
