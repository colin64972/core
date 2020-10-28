import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'

const useStyles = makeStyles(theme => ({
  sectionPadding: {
    padding: theme.custom.setSpace()
  },
  section1: {
    backgroundColor: theme.palette.secondary[50]
  },
  heading1: {
    width: '100%',
    color: theme.palette.secondary.main
  }
}))

export const Feedback = () => {
  const classes = useStyles()
  const [count, setCount] = useState(0)
  const increaseCount = event => setCount(count + 1)
  const decreaseCount = event => setCount(count - 1)
  return (
    <Grid item xs={12}>
      <Grid
        container
        component="section"
        className={clsx(classes.sectionPadding, classes.section1)}>
        <Grid item xs={12}>
          <FadeIn directio="x" position={-100}>
            <Typography variant="h1" className={classes.heading1}>
              Feedback {count}
            </Typography>
          </FadeIn>
          <Typography variant="body1">
            {count}&nbsp;Invidunt et dolor kasd lorem magna. Dolor kasd ea et et
            lorem sanctus, sea dolore est et diam. Invidunt voluptua.
          </Typography>
          <button type="button" onClick={increaseCount}>
            Increase
          </button>
          <button type="button" onClick={decreaseCount}>
            Decrease
          </button>
        </Grid>
      </Grid>
    </Grid>
  )
}
