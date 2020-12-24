import PropTypes from 'prop-types'
import React from 'react'

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

const useStyles = makeStyles(theme => ({
  listContainer: {
    margin: `${theme.custom.setSpace('sm')}px 0 0 0`,
    borderRadius: theme.custom.borderRadius,
    backgroundColor: theme.palette.grey[50]
  },
  listTitle: {
    ...theme.typography.mainHeading,
    color: theme.palette.primary.main,
    fontSize: theme.typography.fontSize * 1.5,
    margin: 0,
    borderRadius: theme.custom.borderRadius
  },
  listRow: {
    border: 'none'
  },
  headCell: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize
  },
  code: {
    fontSize: theme.typography.fontSize,
    backgroundColor: theme.palette.grey[200],
    padding: `0 ${theme.custom.setSpace() / 2}px`,
    fontFamily: 'courier, mono',
    margin: `0 0 0 ${theme.custom.setSpace() / 2}px`
  }
}))

export const VolumeFormReviewDialog = ({
  billableKeywords,
  closeReviewHandler,
  reviewModalStatus
}) => {
  const classes = useStyles()
  return (
    <Dialog
      onClose={closeReviewHandler}
      aria-labelledby="customized-dialog-title"
      open={reviewModalStatus}>
      <DialogTitle
        disableTypography
        id="customized-dialog-title"
        onClose={closeReviewHandler}
        className={classes.listTitle}>
        Keyword List Review
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          Please review the list of keywords to purchase metrics for here. You
          will only be charged for the billable keywords contained in this list,
          even if your trial result list includes similar entries with
          top-level-domain variations.
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          If your trial variations list did indeed include entries with TLD
          variations&mdash;such as
          <span className={classes.code}>.com</span>,
          <span className={classes.code}>.net</span>,
          <span className={classes.code}>.club</span>, etc.&mdash;such entries
          have been parsed and de&ndash;duplicated to leave only these billable
          keywords.
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          For example, keyword variation entry
          <span className={classes.code}>best new car .com</span>
          &nbsp;and&nbsp;
          <span className={classes.code}>best new car .net</span>
          &nbsp;have been reduced down to a single billable keyword entry:
          <span className={classes.code}>best new car</span>, and you will only
          be charged for this single keyword.
        </DialogContentText>
        <TableContainer className={classes.listContainer}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell component="th" className={classes.headCell}>
                  Entry Number
                </TableCell>
                <TableCell component="th" className={classes.headCell}>
                  Billable Keyword
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billableKeywords.map((entry, ind) => (
                <TableRow
                  key={`${entry}-${ind}`}
                  hover
                  className={classes.listRow}>
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
  )
}

VolumeFormReviewDialog.propTypes = {
  billableKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  closeReviewHandler: PropTypes.func.isRequired,
  reviewModalStatus: PropTypes.bool.isRequired
}
