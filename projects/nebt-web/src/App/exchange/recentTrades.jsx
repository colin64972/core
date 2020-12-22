import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ArrowIcon from '../components/arrowIcon'
import {
  selectContractsLoadedStatus,
  selectRecentTrades
} from '../../store/selectors'
import types from '../../store/types'

const useStyles = makeStyles(theme => ({
  lightGrey: {
    color: theme.palette.grey[400]
  },
  bold: {
    ...theme.typography.bold
  },
  up: {
    color: theme.palette.pass[500],
    ...theme.custom.flexColumnCentered
  },
  down: {
    color: theme.palette.fail[500],
    ...theme.custom.flexColumnCentered
  },
  subtitle: {
    fontWeight: 'normal',
    color: theme.palette.grey[600]
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const contractLoaded = useSelector(state =>
    selectContractsLoadedStatus(state)
  )
  let recentTrades = useSelector(state => selectRecentTrades(state))
  useEffect(() => {
    if (contractLoaded) {
      dispatch({ type: types.TRY_FETCHING_ORDERS })
    }
  }, [contractLoaded])
  if (recentTrades.length < 1) return null
  return (
    <Grid container>
      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small" align="center">
                Time
                <br />
                <span className={classes.subtitle}>PST</span>
              </TableCell>
              <TableCell size="small" align="center">
                Quantity
                <br />
                <span className={classes.subtitle}>NEB</span>
              </TableCell>
              <TableCell size="small" align="center">
                Price
                <br />
                <span className={classes.subtitle}>ETH / NEB</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentTrades.map(trade => (
              <TableRow hover key={`${trade.timestamp}-${trade.id}`}>
                <TableCell
                  size="small"
                  className={classes.lightGrey}
                  align="center">
                  {trade.time}
                </TableCell>
                <TableCell size="small" align="center" className={classes.bold}>
                  {trade.nebValue}
                </TableCell>
                <TableCell
                  size="small"
                  align="center"
                  className={classes[trade.direction]}>
                  <ArrowIcon recentStyle direction={trade.direction} />
                  {trade.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}
