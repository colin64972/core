import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { defaultPadding } from '@colin30/shared/react/theming'
import { TrialCard } from './TrialCard'
import { useDispatch } from 'react-redux'
import { mergeSort } from '@colin30/shared/general/sorting'

const useStyles = makeStyles(theme => ({
  trialsSection: {
    backgroundColor: theme.palette.secondary[200],
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace)
  },
  trialsContainer: {
    marginTop: theme.custom.setSpace('sm'),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.custom.setSpace()
    }
  },
  mainHeading: {
    ...theme.typography.mainHeading,
    marginBottom: 0
  }
}))

export const TrialCardsContainer = ({ trials }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const zeroCredits = event => {
    dispatch({
      type: 'ZERO_CREDITS'
    })
  }
  const fillCredits = event => {
    dispatch({
      type: 'FILL_CREDITS',
      count: 3
    })
  }
  const sortedItems = mergeSort(trials.items, 'createdAt', 'down')
  return (
    <Grid container component="section" className={classes.trialsSection}>
      <Grid item xs={12}>
        <button onClick={zeroCredits}>Zero Credits</button>
        <button onClick={fillCredits}>Fill Credits</button>
        <Grid
          container
          direction="column"
          wrap="nowrap"
          alignItems="flex-start"
          justify="flex-start">
          <FadeIn direction="y" position={-100}>
            <Typography variant="subtitle2">Results</Typography>
          </FadeIn>
          <FadeIn direction="x" position={-100}>
            <Typography variant="h4" className={classes.mainHeading}>
              Trial Card Display
            </Typography>
          </FadeIn>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        wrap="wrap"
        className={classes.trialsContainer}>
        {sortedItems.map(trial => (
          <TrialCard
            trial={trial}
            isShown={trials.shown.includes(trial.id)}
            isLastShown={trials.shown.length === 1}
            key={trial.id}
          />
        ))}
      </Grid>
    </Grid>
  )
}
