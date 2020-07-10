import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'

const useStyles = makeStyles(theme => ({
  table: {
    borderRadius: theme.custom.borderRadius
  },
  headCell: {
    ...theme.typography.bold,
    backgroundColor: theme.palette.secondary[50]
  },
  revewButton: {
    'backgroundColor': theme.palette.secondary[50],
    '&:hover': {
      backgroundColor: theme.palette.secondary[100]
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

export const VolumeFormTrialReview = ({ trialId, formSectionClass }) => {
  const classes = useStyles()
  const trial = useSelector(state =>
    state.app.trials.items.find(trial => trial.id === trialId)
  )
  // console.log('%c trialId', 'color: yellow; font-size: large', trialId, trial)
  const [reviewModalStatus, setReviewModalStatus] = useState(false)
  const openReviewHandler = event => setReviewModalStatus(true)
  const closeReviewHandler = event => setReviewModalStatus(false)
  return (
    <Paper className={formSectionClass}>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell component="th" className={classes.headCell}>
              ID
            </TableCell>
            <TableCell variant="body">{trial.id}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell component="th" className={classes.headCell}>
              Set Fields
            </TableCell>
            <TableCell variant="body">{trial.heading}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell component="th" className={classes.headCell}>
              Entry Count
            </TableCell>
            <TableCell variant="body">{trial.list.length}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell component="th" className={classes.headCell}>
              Time Created
            </TableCell>
            <TableCell variant="body">{trial.timestamp}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell component="th" className={classes.headCell}>
              Keywords
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
                    You can review the list of keywords to purchase volume
                    metrics for here. If keyword entries include domain name
                    TLDs such as
                    <span className={classes.code}>.com</span>,
                    <span className={classes.code}>.net</span>,
                    <span className={classes.code}>.club</span>, etc., these
                    TLDs will be removed from the keyword query. For example,
                    the line&nbsp;
                    <span className={classes.code}>best new car .com</span>
                    &nbsp;will return volume metrics for only the keyword
                    portion of the entry &nbsp;
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
                            Keyword
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {trial.list.map((entry, ind) => (
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
                  <Button
                    autoFocus
                    onClick={closeReviewHandler}
                    color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </Paper>
  )
}
