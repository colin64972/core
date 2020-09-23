import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import { TrialResultsMatchTypes } from './TrialResultsMatchTypes'
import { TrialResultsSettings } from './TrialResultsSettings'
import { TrialCardsContainer } from './TrialCardsContainer'

const useStyles = makeStyles(theme => ({
  settingsSection: {
    backgroundColor: theme.palette.primary.main
  }
}))

const TrialResults = ({ trials }) => {
  const classes = useStyles()
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
