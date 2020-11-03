import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Loadable from 'react-loadable'
import { useSelector } from 'react-redux'

import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import {
  Button,
  Table,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FindInPageIcon from '@material-ui/icons/FindInPage'

const VolumeFormReviewDialogLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-VolumeFormReviewDialog" */
      /* webpackPrefetch: true */
      './VolumeFormReviewDialog'
    ),
  loading: () => <BackDropScreen isOpen spinner />,
  render: (loaded, props) => {
    let Component = loaded.VolumeFormReviewDialog
    return <Component {...props} />
  }
})

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
            <VolumeFormReviewDialogLoadable
              billableKeywords={trial.billableKeywords}
              closeReviewHandler={closeReviewHandler}
              reviewModalStatus={reviewModalStatus}
            />
          </TableCell>
        </TableRow>
      </TableHead>
    </Table>
  )
}

VolumeFormTrialReview.propTypes = {
  trialId: PropTypes.string.isRequired
}
