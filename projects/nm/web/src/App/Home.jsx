import React from 'react'
import clsx from 'clsx'
import Loadable from 'react-loadable'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid, Typography } from '@material-ui/core'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'

const useStyles = makeStyles(theme => ({
  sectionPadding: {
    padding: theme.custom.setSpace()
  },
  section1: {
    backgroundColor: theme.palette.primary[50]
  },
  heading1: {
    width: '100%',
    color: theme.palette.primary.main
  },
  section2: {
    backgroundColor: theme.palette.primary.main
  },
  heading2: {
    width: '100%',
    color: 'white'
  },
  copy2: {
    color: theme.palette.primary[50]
  }
}))

const Section2Loadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-Section2" */
      /* webpackPrefetch: false */
      './Section2'
    ),
  loading: () => (
    <FadeIn>
      <p>LOADING...</p>
    </FadeIn>
  ),
  render: (loaded, props) => {
    let Component = loaded.Section2
    return <Component {...props} />
  }
})

export const Home = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12}>
      <FadeIn>
        <Grid
          container
          component="section"
          className={clsx(classes.sectionPadding, classes.section1)}>
          <Grid item xs={12}>
            <FadeIn direction="x" position={-100}>
              <Typography variant="h1" className={classes.heading1}>
                Home
              </Typography>
            </FadeIn>
            <FadeIn>
              <Typography variant="body1">
                Sea et diam labore dolore tempor dolor et sea, sadipscing sit
                vero ea nonumy amet justo sed ea tempor, amet sed consetetur
                dolore et ut sea et amet, rebum stet dolor kasd et, accusam
                dolore sit eirmod rebum erat gubergren. Justo amet et tempor
                gubergren labore ipsum, et et gubergren.
              </Typography>
            </FadeIn>
          </Grid>
        </Grid>
      </FadeIn>
      <FadeIn>
        <Section2Loadable />
      </FadeIn>
    </Grid>
  )
}
