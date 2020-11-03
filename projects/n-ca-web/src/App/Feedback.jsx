import clsx from 'clsx'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FadeIn } from '@cjo3/shared/react/components/FadeIn'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { types } from '../store/types'

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
  const increaseCount = () => setCount(count + 1)
  const decreaseCount = () => setCount(count - 1)
  const name = useSelector(state => state.app?.name)
  const dispatch = useDispatch()
  const blurName = () =>
    dispatch({
      type: types.SET_NAME,
      name: event.target.value
    })

  return (
    <Grid item xs={12}>
      <Grid
        container
        component="section"
        className={clsx(classes.sectionPadding, classes.section1)}>
        <Grid item xs={12}>
          <FadeIn directio="x" position={-100}>
            <Typography variant="h1" className={classes.heading1}>
              Feedback {count} {name}
            </Typography>
          </FadeIn>
          <Typography variant="body1">
            {count}&nbsp;{name}&nbsp;Invidunt et dolor kasd lorem magna. Dolor
            kasd ea et et lorem sanctus, sea dolore est et diam. Invidunt
            voluptua.
          </Typography>
          <br />
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={increaseCount}>
            Increase
          </Button>
          &emsp;
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={decreaseCount}>
            Decrease
          </Button>
          &emsp;
          <TextField
            // error={validate}
            id="filled-error-helper-text"
            label="Name"
            defaultValue={name}
            onBlur={blurName}
            // helperText="Incorrect entry."
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
