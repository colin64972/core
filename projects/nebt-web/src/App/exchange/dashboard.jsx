import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import { selectUserAccount } from '../../store/selectors'
import Sheet from './sheet'
import NoUserBlock from './noUserBlock'
import Balances from './balances'
import NewOrders from './newOrders'
import OrderBook from './orderBook'
import PriceChart from './priceChart'
import Transactions from './transactions'
import RecentTrades from './recentTrades'
import types from '../../store/types'

const useStyles = makeStyles(theme => ({
  layout: {
    padding: theme.custom.setSpace(),
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gridColumnGap: theme.custom.setSpace(),
    gridRowGap: theme.custom.setSpace(),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.custom.setSpace()
    }
  },
  balancesSheet: {
    gridColumn: '1 / 2',
    gridRow: '1',
    [theme.breakpoints.down('md')]: {
      gridColumn: '1 / 6'
    }
  },
  newOrdersSheet: {
    gridColumn: '1 / 2',
    gridRow: '2',
    [theme.breakpoints.down('md')]: {
      gridColumn: '1 / 6'
    }
  },
  orderBookSheet: {
    gridColumn: '2 / 3',
    gridRow: '1 / 3',
    [theme.breakpoints.down('md')]: {
      gridColumn: '1 / 6',
      gridRow: '3'
    }
  },
  priceChartSheet: {
    gridColumn: '3 / 5',
    gridRow: '1 / 2',
    [theme.breakpoints.down('md')]: {
      gridColumn: '1 / 6',
      gridRow: '4'
    }
  },
  transactionsSheet: {
    gridColumn: '3 / 5',
    gridRow: '2 / 3',
    [theme.breakpoints.down('md')]: {
      gridColumn: '1 / 6',
      gridRow: '5'
    }
  },
  tradesSheet: {
    gridColumn: '5 / 6',
    gridRow: '1 / 3',
    [theme.breakpoints.down('md')]: {
      gridColumn: '1 / 6',
      gridRow: '6'
    }
  }
}))

export default () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userAccount = useSelector(state => selectUserAccount(state))
  useEffect(() => {
    dispatch({ type: types.TRY_LOADING_WEB3_DATA })
  }, [])
  return (
    <Grid container>
      {userAccount ? (
        <Grid item xs={12} className={classes.layout}>
          <Sheet
            title="Balances"
            style={classes.balancesSheet}
            child={Balances}
          />
          <Sheet
            title="New Orders"
            style={classes.newOrdersSheet}
            child={NewOrders}
          />
          <Sheet
            title="Order Book"
            style={classes.orderBookSheet}
            child={OrderBook}
          />
          <Sheet
            title="Price Chart"
            style={classes.priceChartSheet}
            child={PriceChart}
          />
          <Sheet
            title="Transactions"
            style={classes.transactionsSheet}
            child={Transactions}
          />
          <Sheet
            title="Recent Trades"
            style={classes.tradesSheet}
            child={RecentTrades}
          />
        </Grid>
      ) : (
        <NoUserBlock />
      )}
    </Grid>
  )
}
