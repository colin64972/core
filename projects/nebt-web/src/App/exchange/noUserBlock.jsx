import { Elastic, TweenMax } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Viewable from '../components/viewable'
import { makeStyles } from '@material-ui/styles'
import { responsivePadding } from '../../theme'
import { setAnimation } from '../helpers'
import { useInView } from 'react-intersection-observer'

const useStyles = makeStyles(theme => ({
  item: {
    ...theme.custom.flexColumnCentered,
    ...responsivePadding(theme)(true),
    background: theme.palette.gradients.error,
    boxShadow: theme.custom.shadows.inset,
    minHeight: 200
  },
  body1: {
    color: theme.palette.common.white,
    maxWidth: 350
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  return (
    <Viewable
      animation={setAnimation('x', -100)}
      component={
        <Grid container>
          <Grid item xs={12} className={classes.item}>
            <Typography variant="h4" align="center">
              No Wallet Connection
            </Typography>
            <Typography
              variant="body1"
              align="center"
              className={classes.body1}>
              Please configure your choosen wallet to allow connections to this
              site
            </Typography>
          </Grid>
        </Grid>
      }
    />
  )
}
