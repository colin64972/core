import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {
  selectOpenOrders,
  selectUserAccount,
  selectSpinnerStatus
} from '../../store/selectors'
import WorkingSpinner from '../components/workingSpinner'
import BookOrder from './bookOrder'

const useStyles = makeStyles(theme => ({
  lightGrey: {
    color: theme.palette.grey[400]
  },
  bold: {
    ...theme.typography.bold
  },
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
  tradeRow: {
    cursor: 'pointer'
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  const openOrders = useSelector(state => selectOpenOrders(state))
  const userAccount = useSelector(state => selectUserAccount(state))
  const { buyOrders, sellOrders } = openOrders
  const { isLoadingOrderBook } = useSelector(state =>
    selectSpinnerStatus(state)
  )
  if (isLoadingOrderBook) return <WorkingSpinner />
  if (!buyOrders || !sellOrders) return null
  return (
    <Grid container>
      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small" align="center">
                Type
                <br />
                <span className={classes.subtitle}>Buy or Sell</span>
              </TableCell>
              <TableCell
                size="small"
                align="center"
                className={classes.heading}>
                Quantity
                <br />
                <span className={classes.subtitle}>NEB</span>
              </TableCell>
              <TableCell
                size="small"
                align="center"
                className={classes.heading}>
                Price
                <br />
                <span className={classes.subtitle}>ETH / NEB</span>
              </TableCell>
              <TableCell
                size="small"
                align="center"
                className={classes.heading}>
                Value
                <br />
                <span className={classes.subtitle}>ETH</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buyOrders.map(order => (
              <BookOrder
                order={order}
                userAccount={userAccount}
                key={`${order.timestamp}-${order.id}`}
              />
            ))}
            {sellOrders.map(order => (
              <BookOrder
                order={order}
                userAccount={userAccount}
                key={`${order.timestamp}-${order.id}`}
              />
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}
