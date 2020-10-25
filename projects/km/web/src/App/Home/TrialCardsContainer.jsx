import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'
import { defaultPadding } from '@cjo3/shared/react/theming'
import { TrialCard } from './TrialCard'
import { mergeSort } from '@cjo3/shared/general/sorting'

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
  const sortedItems = mergeSort(trials.items, 'updatedAt', 'down')
  return (
    <Grid container component="section" className={classes.trialsSection}>
      <Grid item xs={12}>
        <Grid
          container
          direction="column"
          wrap="nowrap"
          alignItems="flex-start"
          justify="flex-start">
          <FadeIn direction="y" position={-100}>
            <Typography variant="subtitle2">
              &#8230;And the Results are In
            </Typography>
          </FadeIn>
          <FadeIn direction="x" position={-100}>
            <Typography variant="h4" className={classes.mainHeading}>
              Keyword Variation Trial Cards
            </Typography>
          </FadeIn>
        </Grid>
      </Grid>
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        direction="row"
        wrap="wrap"
        spacing={3}
        className={classes.trialsContainer}>
        {sortedItems.map(trial => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={trial.id}>
            <TrialCard
              trial={trial}
              isShown={trials.shown.includes(trial.id)}
              isLastShown={trials.shown.length === 1}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
