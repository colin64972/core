import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { Field } from 'formik'
import { useSelector } from 'react-redux'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import { formatToDollars } from '@colin30/shared/general/formatting'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'

const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.custom.setSpace()
  },
  tableRow: {
    border: 'none'
  },
  headCell: {
    color: theme.palette.secondary[100],
    paddingLeft: 0,
    paddingRight: 0
  },
  dataCell: {
    ...theme.typography.bold,
    color: 'white',
    paddingLeft: 0,
    paddingRight: 0
  }
}))

export const VolumeFormPricing = ({ trialId }) => {
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
  const classes = useStyles()
  const trial = useSelector(state =>
    state.app.trials.items.find(trial => trial.id === trialId)
  )

  console.log('%c VolumeFormPricing', 'color: yellow; font-size: large', trial)

  return (
    <Table size="small" className={classes.table}>
      <TableBody>
        <TableRow className={classes.tableRow} hover>
          <TableCell component="th" align="left" className={classes.headCell}>
            Billable Keywords
          </TableCell>
          <TableCell className={classes.dataCell}>
            {trial.billableKeywords.length}
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow} hover>
          <TableCell component="th" align="left" className={classes.headCell}>
            Cost per Metric
          </TableCell>
          <TableCell className={classes.dataCell}>
            $&nbsp;{formatToDollars(1)}
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow} hover>
          <TableCell component="th" align="left" className={classes.headCell}>
            Metrics Cost
          </TableCell>
          <TableCell className={classes.dataCell}>
            $&nbsp;{formatToDollars(trial.billableKeywords.length * 1)}
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow} hover>
          <TableCell component="th" align="left" className={classes.headCell}>
            Fee
          </TableCell>
          <TableCell className={classes.dataCell}>
            $&nbsp;
            {formatToDollars(trial.billableKeywords.length * 1 * 0.029)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
