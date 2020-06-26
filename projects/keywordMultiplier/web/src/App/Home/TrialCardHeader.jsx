import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AssignmentIcon from '@material-ui/icons/Assignment'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  trialCardHeading: {
    textAlign: 'left',
    textTransform: 'unset',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.custom.setSpace() * 1.75
    }
  },
  trialCardHeadingId: {
    fontSize: theme.custom.setSpace() * 1.25,
    textAlign: 'left',
    textTransform: 'unset'
  },
  copyButton: {
    ...theme.custom.iconButton,
    'color': theme.palette.primary[50],
    'backgroundColor': theme.palette.primary[200],
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.pass[500]
    }
  },
  deleteButton: {
    ...theme.custom.iconButton,
    'marginRight': 0,
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
  cardInfo: {
    marginTop: theme.custom.setSpace()
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
        <Grid container justify="flex-start" alignItems="center">
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
      <Grid item xs={12} className={classes.cardInfo}>
        <Typography variant="h6" className={classes.trialCardHeading}>
          {trial.heading}
        </Typography>
        <Typography variant="body1" className={classes.trialCardHeadingId}>
          {trial.id}
        </Typography>
      </Grid>
    </Grid>
  )
}
