import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {
  selectContractsLoadedStatus,
  selectBalances,
  selectSpinnerStatus,
  selectUserAccount
} from '../../store/selectors'
import WorkingSpinner from '../components/workingSpinner'
import NoData from '../components/noData'
import types from '../../store/types'

const useStyles = makeStyles(theme => ({
  item: {
    padding: theme.custom.setSpace(),
    marginBottom: theme.custom.setSpace(),
    backgroundColor: 'rgb(50,50,50)',
    boxShadow: theme.custom.shadows.inset,
    borderRadius: theme.shape.borderRadius
  },
  lightGrey: {
    color: theme.palette.grey[400]
  },
  subtitle: {
    fontWeight: 'normal',
    color: theme.palette.grey[600]
  },
  address: {
    color: theme.palette.grey[600],
    fontWeight: 'normal',
    textTransform: 'initial'
  },
  bold: {
    ...theme.typography.bold
  },
  green: {
    color: theme.palette.pass[500]
  },
  red: {
    color: theme.palette.error.main
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const contractsLoaded = useSelector(state =>
    selectContractsLoadedStatus(state)
  )
  const userAccount = useSelector(state => selectUserAccount(state))
  const values = useSelector(state => selectBalances(state))
  const { isLoadingBalances } = useSelector(state => selectSpinnerStatus(state))
  useEffect(() => {
    if (contractsLoaded) {
      dispatch({
        type: types.TRY_FECTHING_BALANCES
      })
    }
  }, [contractsLoaded, userAccount])
  if (!values) return <NoData />
  if (isLoadingBalances) return <WorkingSpinner />
  return (
    <Grid item xs={12} className={classes.item}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell size="small" align="center">
              In Wallet
              <br />
              <span className={classes.address}>
                {userAccount.substr(0, 6)}&hellip;{userAccount.substr(-4)}
              </span>
            </TableCell>
            <TableCell size="small" align="center">
              In Exchange
              <br />
              <span className={classes.address}>
                {userAccount.substr(0, 6)}&hellip;{userAccount.substr(-4)}
              </span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover>
            <TableCell size="small" align="center" className={classes.bold}>
              NEB
            </TableCell>
            <TableCell size="small" align="center" className={classes.green}>
              {values.neb.account}
            </TableCell>
            <TableCell size="small" align="center" className={classes.red}>
              {values.neb.exchange}
            </TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell size="small" align="center" className={classes.bold}>
              ETH
            </TableCell>
            <TableCell size="small" align="center" className={classes.green}>
              {values.eth.account}
            </TableCell>
            <TableCell size="small" align="center" className={classes.red}>
              {values.eth.exchange}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  )
}
