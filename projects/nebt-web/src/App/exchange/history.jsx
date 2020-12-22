import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import NoData from '../components/noData'
import ArrowIcon from '../components/arrowIcon'

const useStyles = makeStyles(theme => ({
  subtitle: {
    fontWeight: 'normal',
    color: theme.palette.grey[600]
  },
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
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  if (props.trades.length < 1) return <NoData />
  return (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {props.trades.map(trade => (
            <TableRow hover key={`${trade.timestamp}-${trade.id}`}>
              <TableCell
                size="small"
                align="center"
                className={classes.lightGrey}>
                {trade.time}
              </TableCell>
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
                className={classes[trade.orderType]}>
                {trade.price}
              </TableCell>
              <TableCell
                size="small"
                align="center"
                className={classes.lightGrey}>
                {trade.ethValue}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  )
}
