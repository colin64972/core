import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import NoData from '../components/noData'
import WorkingSpinner from '../components/workingSpinner'
import { selectSpinnerStatus } from '../../store/selectors'
import ClearIcon from '@material-ui/icons/clear'
import types from '../../store/types'

const useStyles = makeStyles(theme => ({
  buy: {
    color: theme.palette.pass[500],
    textTransform: 'uppercase'
  },
  sell: {
    color: theme.palette.fail[500],
    textTransform: 'uppercase'
  },
  subtitle: {
    fontWeight: 'normal',
    color: theme.palette.grey[600]
  },
  bold: {
    ...theme.typography.bold
  },
  lightGrey: {
    color: theme.palette.grey[400]
  },
  clear: {
    'position': 'relative',
    'top': 1,
    'color': theme.palette.grey[600],
    'transition': 'color 0.67s linear',
    '&:hover': {
      color: theme.palette.error.main
    },
    'cursor': 'pointer'
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const clickHandler = event => {
    event.preventDefault()
    const { orderId } = event.currentTarget.dataset
    return dispatch({
      type: types.TRY_CANCELLING_ORDER,
      orderId
    })
  }
  const { isLoadingOpenOrders } = useSelector(state =>
    selectSpinnerStatus(state)
  )
  if (isLoadingOpenOrders) return <WorkingSpinner />
  if (props.trades.length < 1) return <NoData />
  return (
    <Grid item xs={12}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell size="small" align="center">
              Type
              <br />
              <span className={classes.subtitle}>Buy or Sell</span>
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
            <TableCell size="small" align="center">
              Value
              <br />
              <span className={classes.subtitle}>ETH</span>
            </TableCell>
            <TableCell size="small" align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.trades.map(trade => (
            <TableRow hover key={`${trade.timestamp}-${trade.id}`}>
              <TableCell
                size="small"
                align="center"
                className={classes[trade.orderClass]}>
                {trade.orderClass}
              </TableCell>
              <TableCell size="small" align="center" className={classes.bold}>
                {trade.nebValue}
              </TableCell>
              <TableCell
                size="small"
                align="center"
                className={classes[trade.orderClass]}>
                {trade.price}
              </TableCell>
              <TableCell
                size="small"
                align="center"
                className={classes.lightGrey}>
                {trade.ethValue}
              </TableCell>
              <TableCell
                size="small"
                align="center"
                className={classes.lightGrey}>
                <ClearIcon
                  className={classes.clear}
                  onClick={clickHandler}
                  data-order-id={trade.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  )
}
