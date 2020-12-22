import React from 'react'
import { useDispatch } from 'react-redux'
import { capitalize } from 'lodash'
import { makeStyles } from '@material-ui/styles'
import TableCell from '@material-ui/core/TableCell'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import TableRow from '@material-ui/core/TableRow'
import types from '../../store/types'

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
  actionRow: {
    'cursor': 'pointer',
    'backgroundColor': 'rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    id,
    orderClass,
    nebValue,
    ethValue,
    price,
    user,
    fillAction
  } = props.order
  const clickHandler = event => {
    event.preventDefault()
    return dispatch({
      type: types.TRY_FILLING_ORDER,
      id
    })
  }
  const OrderRow = (
    <TableRow>
      <TableCell size="small" align="center" className={classes[orderClass]}>
        {orderClass}
      </TableCell>
      <TableCell size="small" align="center" className={classes.bold}>
        {nebValue}
      </TableCell>
      <TableCell size="small" align="center" className={classes[orderClass]}>
        {price}
      </TableCell>
      <TableCell size="small" className={classes.lightGrey} align="center">
        {ethValue}
      </TableCell>
    </TableRow>
  )
  if (user === props.userAccount) return OrderRow
  return (
    <Tooltip
      TransitionComponent={Zoom}
      title={`Click to ${capitalize(fillAction)} ${nebValue} NEB`}
      placement="top-end"
      className={classes.actionRow}
      onClick={clickHandler}>
      {OrderRow}
    </Tooltip>
  )
}
