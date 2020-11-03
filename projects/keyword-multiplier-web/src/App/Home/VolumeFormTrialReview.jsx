import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FindInPageIcon from '@material-ui/icons/FindInPage'

const useStyles = makeStyles(theme => ({
  table: {
    borderRadius: theme.custom.borderRadius
  },
  headCell: {
    ...theme.typography.bold,
    backgroundColor: theme.palette.secondary[50]
  },
  revewButton: {
    ...theme.typography.bold,
    'backgroundColor': theme.palette.secondary[100],
    '&:hover': {
      backgroundColor: theme.palette.secondary[200]
    }
  },
  reviewListContainer: {
    margin: `${theme.custom.setSpace('sm')}px 0 0 0`,
    borderRadius: theme.custom.borderRadius,
    backgroundColor: theme.palette.grey[50]
  },
  reviewListTitle: {
    ...theme.typography.mainHeading,
    color: theme.palette.primary.main,
    fontSize: theme.custom.setSpace('sm') * 1.25,
    margin: 0,
    borderRadius: theme.custom.borderRadius
  },
  reviewListRow: {
    border: 'none'
  },
  reviewListHeadCell: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  code: {
    backgroundColor: theme.palette.grey[200],
    padding: `0 ${theme.custom.setSpace() / 2}px`,
    fontFamily: 'courier, mono',
    margin: `0 0 0 ${theme.custom.setSpace() / 2}px`
  }
}))

export const VolumeFormTrialReview = ({ trialId }) => {
  const classes = useStyles()
  const trial = useSelector(state =>
    state.app.trials.items.find(trial => trial.id === trialId)
  )
  const [reviewModalStatus, setReviewModalStatus] = useState(false)
  const openReviewHandler = () => setReviewModalStatus(true)
  const closeReviewHandler = () => setReviewModalStatus(false)
  return (
    <Table size="small" className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell component="th" className={classes.headCell}>
            Trial ID
          </TableCell>
          <TableCell variant="body">{trial.id}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" className={classes.headCell}>
            Input Sets
          </TableCell>
          <TableCell variant="body">{trial.heading}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" className={classes.headCell}>
            Time Updated
          </TableCell>
          <TableCell variant="body">{trial.timestampUpdated}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" className={classes.headCell}>
            Billable Keyword Count
          </TableCell>
          <TableCell variant="body">{trial.billableKeywords.length}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" className={classes.headCell}>
            Billable Keywords
          </TableCell>
          <TableCell variant="body">
            <Button
              size="small"
              variant="contained"
              onClick={openReviewHandler}
              startIcon={<FindInPageIcon size="small" />}
              classes={{
                contained: classes.revewButton
              }}>
              Review
            </Button>
            <Dialog
              onClose={closeReviewHandler}
              aria-labelledby="customized-dialog-title"
              open={reviewModalStatus}>
              <DialogTitle
                disableTypography
                id="customized-dialog-title"
                onClose={closeReviewHandler}
                className={classes.reviewListTitle}>
                Keyword List Review
              </DialogTitle>
              <DialogContent dividers>
                <DialogContentText id="alert-dialog-description">
                  Here you can review the list of keywords variations to buy
                  metrics for. You will be charged only gor the billable
                  keywords contained in this list, even if your trial variations
                  list included many more entries with top-level-domain
                  variations.
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  If your trial variations list did indeed include entries with
                  TLD variations&mdash;such as
                  <span className={classes.code}>.com</span>,
                  <span className={classes.code}>.net</span>,
                  <span className={classes.code}>.club</span>, etc.&mdash;such
                  entries have been parsed and de&ndash;duplicated to leave only
                  billable keywords.
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  For example, keyword variation entry
                  <span className={classes.code}>best new car .com</span>
                  &nbsp;and keyword variation entry
                  <span className={classes.code}>best new car .net</span>
                  &nbsp; have been reduced into a single billable keyword entry:
                  <span className={classes.code}>best new car</span>.
                </DialogContentText>
                <TableContainer className={classes.reviewListContainer}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          component="th"
                          className={classes.reviewListHeadCell}>
                          Entry Number
                        </TableCell>
                        <TableCell
                          component="th"
                          className={classes.reviewListHeadCell}>
                          Billable Keyword
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {trial.billableKeywords.map((entry, ind) => (
                        <TableRow
                          key={`${entry}-${ind}`}
                          hover
                          className={classes.reviewListRow}>
                          <TableCell align="center">{ind + 1}</TableCell>
                          <TableCell align="center">{entry}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={closeReviewHandler} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </TableCell>
        </TableRow>
      </TableHead>
    </Table>
  )
}

VolumeFormTrialReview.propTypes = {
  trialId: PropTypes.string.isRequired
}
