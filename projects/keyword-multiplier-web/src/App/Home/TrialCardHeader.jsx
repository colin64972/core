import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import { Chip, Grid, Tooltip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AssignmentIcon from '@material-ui/icons/Assignment'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
  trialCardHeading: {
    ...theme.custom.mainHeading,
    ...theme.typography.bold,
    textAlign: 'left',
    textTransform: 'unset',
    fontSize: theme.typography.fontSize * 1.5,
    margin: `${theme.custom.setSpace()}px 0 0 0`
  },
  trialCardHeadingId: {
    textAlign: 'left',
    textTransform: 'unset'
  },
  copyDeleteContainer: {
    ...theme.custom.setFlex(),
    position: 'relative',
    right: -33
  },
  copyButton: {
    ...theme.custom.buttons.iconButton,
    'margin': `0 ${theme.custom.setSpace() / 2}px 0 0`,
    'color': theme.palette.primary[50],
    'backgroundColor': theme.palette.primary[200],
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.pass[500]
    }
  },
  deleteButton: {
    ...theme.custom.buttons.iconButton,
    'margin': 0,
    'color': theme.palette.secondary[50],
    'backgroundColor': theme.palette.secondary[200],
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.fail[500]
    }
  },
  actionButtonIcon: {
    fontSize: theme.typography.fontSize * 1.25
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
  askDeleteTrialHandler,
  copyHandler,
  trial: { billableKeywords, heading, id, list, metrics, timestampUpdated }
}) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="space-between" alignItems="flex-start">
          <Grid item>
            {billableKeywords.length !== list.length && (
              <Tooltip
                title="Billable Keyword Count"
                placement="top-start"
                arrow>
                <Chip
                  label={billableKeywords.length}
                  className={clsx(classes.countChip, classes.billableCount)}
                  classes={{
                    label: classes.chipLabel
                  }}
                />
              </Tooltip>
            )}
            <Tooltip title="Total Variations" placement="top-start" arrow>
              <Chip
                label={list.length}
                className={clsx(classes.countChip, classes.listCount)}
                classes={{
                  label: classes.chipLabel
                }}
              />
            </Tooltip>
            <Tooltip title="Time Updated" placement="top-start" arrow>
              <Chip
                label={timestampUpdated}
                className={classes.timestamp}
                classes={{
                  label: classes.chipLabel
                }}
              />
            </Tooltip>
            {metrics && (
              <Chip
                label="Metrics"
                className={clsx(classes.countChip, classes.metricsChip)}
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
          <Typography component="h3" className={classes.trialCardHeading}>
            {heading}
          </Typography>
        </Tooltip>
        <Tooltip title="Result ID" placement="bottom-start" arrow>
          <Typography component="h4" className={classes.trialCardHeadingId}>
            {id}
          </Typography>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

TrialCardHeader.propTypes = {
  askDeleteTrialHandler: PropTypes.func.isRequired,
  copyHandler: PropTypes.func.isRequired,
  trial: PropTypes.shape({
    id: PropTypes.string.isRequired,
    geoIp: PropTypes.object,
    heading: PropTypes.string.isRequired,
    timestampUpdated: PropTypes.string.isRequired,
    updatedAt: PropTypes.number.isRequired,
    list: PropTypes.arrayOf(PropTypes.string),
    billableKeywords: PropTypes.arrayOf(PropTypes.string),
    metrics: PropTypes.object
  })
}
