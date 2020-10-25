import classNames from 'classnames'
import React from 'react'
import { Chip, Grid, Typography, Tooltip } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'

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
  countChip: {
    ...theme.typography.bold,
    marginRight: theme.custom.setSpace() / 2,
    height: 30
  },
  listCount: {
    color: theme.palette.bodyColor,
    backgroundColor: theme.palette.primary[200]
  },
  billableCount: {
    color: theme.palette.bodyColor,
    backgroundColor: theme.palette.secondary[200]
  },
  timestamp: {
    height: 30
  },
  chipLabel: {
    position: 'relative',
    top: 1
  },
  metricsChip: {
    backgroundColor: theme.palette.pass[500],
    color: theme.palette.bodyColor,
    marginLeft: theme.custom.setSpace() / 2,
    fontWeight: 'normal',
    textTransform: 'uppercase'
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
            {trial.billableKeywords.length !== trial.list.length && (
              <Tooltip
                title="Billable Keyword Count"
                placement="top-start"
                arrow>
                <Chip
                  label={trial.billableKeywords.length}
                  className={classNames(
                    classes.countChip,
                    classes.billableCount
                  )}
                  classes={{
                    label: classes.chipLabel
                  }}
                />
              </Tooltip>
            )}
            <Tooltip title="Total Variations" placement="top-start" arrow>
              <Chip
                label={trial.list.length}
                className={classNames(classes.countChip, classes.listCount)}
                classes={{
                  label: classes.chipLabel
                }}
              />
            </Tooltip>
            <Tooltip title="Time Updated" placement="top-start" arrow>
              <Chip
                label={trial.timestampUpdated}
                className={classes.timestamp}
                classes={{
                  label: classes.chipLabel
                }}
              />
            </Tooltip>
            {trial?.metrics && (
              <Chip
                label="Metrics"
                className={classNames(classes.countChip, classes.metricsChip)}
                classes={{
                  label: classes.chipLabel
                }}
              />
            )}
          </Grid>
          <Grid item className={classes.copyDeleteContainer}>
            <Tooltip title="Copy" placement="top-start" arrow>
              <button onClick={copyHandler} className={classes.copyButton}>
                <AssignmentIcon className={classes.actionButtonIcon} />
              </button>
            </Tooltip>
            <Tooltip title="Delete" placement="top-start" arrow>
              <button
                type="button"
                onClick={askDeleteTrialHandler}
                className={classes.deleteButton}>
                <DeleteIcon className={classes.actionButtonIcon} />
              </button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Tooltip title="Input Sets Used" placement="top-start" arrow>
          <Typography variant="h3" className={classes.trialCardHeading}>
            {trial.heading}
          </Typography>
        </Tooltip>
        <Tooltip title="Result ID" placement="bottom-start" arrow>
          <Typography variant="body1" className={classes.trialCardHeadingId}>
            {trial.id}
          </Typography>
        </Tooltip>
      </Grid>
    </Grid>
  )
}
