import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { MatchTypesPanel } from './MatchTypesPanel'
import { SettingsPanel } from './SettingsPanel'
import { getTrials } from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  settingsSection: {
    backgroundColor: theme.palette.primary.main
  }
}))

export const TrialSettings = () => {
  const classes = useStyles()
  const trials = useSelector(state => getTrials(state))
  const { items } = trials
  if (items.length)
    return (
      <Grid
        item
        xs={12}
        component="section"
        className={classes.settingsSection}>
        <Grid container>
          <SettingsPanel />
          <MatchTypesPanel />
        </Grid>
      </Grid>
    )
  return null
}
