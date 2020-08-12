import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { calculateTrialPrice } from '@colin30/shared/logic/keywordMultiplier'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'
import { types } from '../../store/types'

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
    marginTop: theme.custom.setSpace(),
    border: 'none'
  },
  noBorder: {
    border: 'none'
  },

  headCell: {
    color: theme.palette.secondary[100],
    border: 'none'
  },
  dataCell: {
    ...theme.typography.bold,
    color: 'white',
    border: 'none'
  },
  total: {
    ...theme.typography.bold,
    textTransform: 'uppercase'
  },
  note: {
    ...theme.typography.italic,
    border: 'none',
    width: '100%',
    fontSize: theme.custom.setSpace() * 1.25,
    lineHeight: 1.25,
    color: 'white',
    textAlign: 'left',
    marginTop: theme.custom.setSpace()
  }
}))

export const VolumeFormPricing = ({ trialId }) => {
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
  const classes = useStyles()
  const trial = useSelector(state =>
    state.app.trials.items.find(trial => trial.id === trialId)
  )

  const dispatch = useDispatch()

  const price = calculateTrialPrice(trial.billableKeywords.length)

  const hasBumpUpFee = price.bumpUpFee > 0

  useEffect(() => {
    dispatch({
      type: types.SET_ORDER_REQUEST,
      trialId: trialId,
      price
    })
  }, [price])

  return (
    <Table className={classes.table}>
      <TableBody>
        <TableRow className={classes.noBorder} hover>
          <TableCell component="th" align="left" className={classes.headCell}>
            Billable Keywords
          </TableCell>
          <TableCell className={classes.dataCell} align="right">
            {trial.billableKeywords.length}
          </TableCell>
        </TableRow>
        <TableRow className={classes.noBorder} hover>
          <TableCell component="th" align="left" className={classes.headCell}>
            Price per Metric
          </TableCell>
          <TableCell className={classes.dataCell} align="right">
            &#36;&nbsp;{price.unitPrice}
          </TableCell>
        </TableRow>
        <TableRow hover>
          <TableCell component="th" align="left" className={classes.headCell}>
            Metrics Cost
          </TableCell>
          <TableCell className={classes.dataCell} align="right">
            &#36;&nbsp;{price.metricsCost}
          </TableCell>
        </TableRow>
        {hasBumpUpFee && (
          <TableRow className={classes.noBorder} hover>
            <TableCell component="th" align="left" className={classes.headCell}>
              Bump Up Fee
            </TableCell>
            <TableCell className={classes.dataCell} align="right">
              &#43;&nbsp;&#36;&nbsp;
              {price.bumpUpFee}
            </TableCell>
          </TableRow>
        )}
        <TableRow className={classes.noBorder} hover>
          <TableCell component="th" align="left" className={classes.headCell}>
            Processing Fee
          </TableCell>
          <TableCell className={classes.dataCell} align="right">
            &#43;&nbsp;&#36;&nbsp;
            {price.processingFee}
          </TableCell>
        </TableRow>
        <TableRow hover>
          <TableCell
            component="th"
            align="left"
            className={classNames(classes.headCell)}>
            Total
          </TableCell>
          <TableCell className={classes.dataCell} align="right">
            &#36;&nbsp;{price.total}
          </TableCell>
        </TableRow>
        <TableRow className={classes.noBorder}>
          <TableCell className={classes.note} colSpan={2}></TableCell>
        </TableRow>
        <TableRow className={classes.noBorder}>
          <TableCell className={classes.note} colSpan={2}>
            &#42; All prices listed in &#36; Canadian Dollars CAD
          </TableCell>
        </TableRow>
        {hasBumpUpFee && (
          <TableRow className={classes.noBorder}>
            <TableCell className={classes.note} colSpan={2}>
              &#42; Bump up fee charged when billable keywords are less than
              &nbsp;{constants.VOLUME_DATA.MIN_ITEM_COUNT}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
