import PropTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { types } from '../../store/types'
import { TrialCardsContainer } from './TrialCardsContainer'
import { TrialResultsMatchTypes } from './TrialResultsMatchTypes'
import { TrialResultsSettings } from './TrialResultsSettings'

const useStyles = makeStyles(theme => ({
  settingsSection: {
    backgroundColor: theme.palette.primary.main
  }
}))

export const TrialResults = ({ trials }) => {
  const { shown } = trials

  const classes = useStyles()

  const dispatch = useDispatch()

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
          <TrialResultsSettings buttonsDisabled={shown.length < 2} />
          <TrialResultsMatchTypes />
        </Grid>
      </Grid>
      <TrialCardsContainer trials={trials} />
    </Fragment>
  )
}

TrialResults.propTypes = {
  trials: PropTypes.shape({
    shown: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
}
