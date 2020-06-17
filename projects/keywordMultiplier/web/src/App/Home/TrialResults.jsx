import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import { TrialResultsMatchTypes } from './TrialResultsMatchTypes'
import { TrialResultsSettings } from './TrialResultsSettings'
import { TrialCardsContainer } from './TrialCardsContainer'
import { types } from '../../store/types'

const useStyles = makeStyles(theme => ({
  settingsSection: {
    backgroundColor: theme.palette.primary.main
  }
}))

const TrialResults = ({ trials }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: types.GET_KE_CREDITS
    })
  }, [trials.items.length])

  useEffect(() => {
    dispatch({
      type: types.GET_KE_OPTIONS
    })
  }, [])

  return (
    <Fragment>
      <Grid
        item
        xs={12}
        component="section"
        className={classes.settingsSection}>
        <Grid container>
          <TrialResultsSettings buttonsDisabled={trials.shown.length < 2} />
          <TrialResultsMatchTypes />
        </Grid>
      </Grid>
      <TrialCardsContainer trials={trials} />
    </Fragment>
  )
}

export default TrialResults
