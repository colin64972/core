import React from 'react'
import { defaultPadding } from '@colin30/shared/react/theming'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { SetsForm } from './SetsForm'

const useStyles = makeStyles(theme => ({
  setsSection: {
    backgroundColor: theme.palette.grey[500],
    minHeight: '100vh',
    ...theme.custom.setFlex('column nowrap'),
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace),
    textAlign: 'center'
  },
  mainHeading: theme.typography.mainHeading
}))

export const Sets = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12} component="section" className={classes.setsSection}>
      <Grid container>
        <Hidden xsDown>
          <Grid item sm={2} md={3} />
        </Hidden>
        <Grid item xs={12} sm={8} md={6}>
          <FadeIn direction="y" position={-100}>
            <Typography variant="subtitle2">Input Sets</Typography>
          </FadeIn>
          <FadeIn direction="x" position={-100}>
            <Typography variant="h4" className={classes.mainHeading}>
              Keyword Multiplication
              <br />
              to the Max!
            </Typography>
          </FadeIn>
          <FadeIn direction="x" position={100}>
            <Typography variant="body1">
              Est voluptua stet ea sadipscing nonumy gubergren eos, nonumy
              dolore dolore sadipscing est consetetur diam sed. Gubergren sea
              eirmod ut accusam dolore. Accusam sed sed amet aliquyam amet diam.
              Dolor ipsum nonumy gubergren gubergren. Takimata et lorem takimata
              sit sed dolor sit, rebum et gubergren accusam elitr dolores rebum
              stet.
            </Typography>
          </FadeIn>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={2} md={3} />
        </Hidden>
        <SetsForm />
      </Grid>
    </Grid>
  )
}
