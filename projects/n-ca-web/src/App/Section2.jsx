import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'

const useStyles = makeStyles(theme => ({
  sectionPadding: {
    padding: theme.custom.setSpace()
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

export const Section2 = () => {
  const classes = useStyles()
  return (
    <Grid
      container
      component="section"
      className={clsx(classes.sectionPadding, classes.section2)}>
      <Grid item xs={12}>
        <FadeIn direction="x" position={100}>
          <Typography variant="h1" className={classes.heading2}>
            About
          </Typography>
        </FadeIn>
        <Typography variant="body1">
          Magna aliquyam et no sed nonumy at lorem lorem, amet ut elitr
          consetetur dolor nonumy. Invidunt et gubergren at kasd.
        </Typography>
        <Typography variant="body1">
          Lorem magna vero no eos eos rebum accusam dolores dolor dolor. Accusam
          takimata erat et eirmod. At sea et gubergren diam sed lorem nonumy at.
          Invidunt ut et aliquyam et diam tempor et diam sadipscing, lorem amet
          et takimata aliquyam lorem sea, sadipscing no magna erat dolores eos
          diam erat.
        </Typography>
        <Typography variant="body1">
          Sanctus gubergren amet magna clita stet, consetetur sed justo tempor.
        </Typography>
        <Typography variant="body1">
          Clita sed vero elitr amet gubergren erat takimata, stet accusam et
          dolor invidunt lorem lorem, tempor sea stet erat ut sit invidunt
          dolore amet, magna takimata ea diam lorem sed ipsum aliquyam at et.
          Est dolor dolores at ea et. Sea lorem et aliquyam tempor, kasd dolores
          amet dolore at kasd ipsum sed vero vero, dolore et lorem gubergren
          vero diam invidunt, sea vero est ipsum consetetur, kasd sadipscing
          dolor erat sit ea sanctus ea. Dolore diam sadipscing amet gubergren
          ipsum, et takimata lorem vero tempor sit dolor at, labore invidunt
          amet at justo. Nonumy et amet at vero et.
        </Typography>
      </Grid>
    </Grid>
  )
}
