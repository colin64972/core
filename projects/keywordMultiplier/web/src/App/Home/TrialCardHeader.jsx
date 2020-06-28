import React from 'react'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AssignmentIcon from '@material-ui/icons/Assignment'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  trialCardHeading: {
    textAlign: 'left',
    textTransform: 'unset',
    margin: `${theme.custom.setSpace('sm')}px 0 ${
      theme.custom.setSpace() / 4
    }px 0`,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.custom.setSpace() * 1.75
    }
  },
  trialCardHeadingId: {
    fontSize: theme.custom.setSpace() * 1.25,
    textAlign: 'left',
    textTransform: 'unset'
  },
  copyDeleteContainer: {
    ...theme.custom.setFlex(),
    position: 'relative',
    right: -33
  },
  copyButton: {
    ...theme.custom.iconButton,
    'margin': `0 ${theme.custom.setSpace() / 2}px 0 0`,
    'color': theme.palette.primary[50],
    'backgroundColor': theme.palette.primary[200],
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.pass[500]
    }
  },
  deleteButton: {
    ...theme.custom.iconButton,
    'margin': 0,
    'color': theme.palette.secondary[50],
    'backgroundColor': theme.palette.secondary[200],
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.fail[500]
    }
  },
  actionButtonIcon: {
    fontSize: theme.custom.setSpace() * 1.5
  },
  listCount: {
    ...theme.typography.bold,
    color: theme.palette.primary[50],
    backgroundColor: theme.palette.primary[200],
    marginRight: theme.custom.setSpace() / 2,
    height: 30
  },
  createdAt: {
    height: 30
  },
  chipLabel: {
    position: 'relative',
    top: 1
  }
}))

export const TrialCardHeader = ({
  trial,
  copyHandler,
  askDeleteTrialHandler
}) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="space-between" alignItems="flex-start">
          <Grid item>
            <Chip
              label={trial.list.length}
              className={classes.listCount}
              classes={{
                label: classes.chipLabel
              }}
            />
            <Chip
              label={trial.createdAt}
              className={classes.createdAt}
              classes={{
                label: classes.chipLabel
              }}
            />
          </Grid>
          <Grid item className={classes.copyDeleteContainer}>
            <button onClick={copyHandler} className={classes.copyButton}>
              <AssignmentIcon className={classes.actionButtonIcon} />
            </button>
            <button
              type="button"
              onClick={askDeleteTrialHandler}
              className={classes.deleteButton}>
              <DeleteIcon className={classes.actionButtonIcon} />
            </button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="h6" className={classes.trialCardHeading}>
          Set Fields {trial.heading}
        </Typography>
        <Typography variant="body1" className={classes.trialCardHeadingId}>
          {trial.id}
        </Typography>
      </Grid>
    </Grid>
  )
}
