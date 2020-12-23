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
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  dashboard: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: 1600,
    padding: theme.custom.setSpace(),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.custom.setSpace()
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  smallScreenNotice: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      padding: theme.custom.setSpace('md'),
      background: theme.palette.gradients.error,
      boxShadow: theme.custom.shadows.inset,
      minHeight: 200
    }
  },

  white: {
    color: 'white'
  }
}))

export default () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userAccount = useSelector(state => selectUserAccount(state))
  useEffect(() => {
    dispatch({ type: types.TRY_LOADING_WEB3_DATA })
  }, [])

  if (!userAccount) return <NoUserBlock />

  return (
    <Grid container justify="center">
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        className={classes.smallScreenNotice}>
        <Typography variant="h4" align="center">
          Screen Too Small
        </Typography>
        <Typography variant="body1" align="center" className={classes.white}>
          Not enough room for exchange panels to display. Please visit on a
          larger device.
        </Typography>
      </Grid>
      <Grid container spacing={3} className={classes.dashboard}>
        {[
          { component: Balances, title: 'Balances', key: 'LJacUaSkDx' },
          { component: NewOrders, title: 'New Orders', key: 'epBpPJCEQz' },
          { component: OrderBook, title: 'Order Book', key: 'NJfsdTymea' },
          { component: PriceChart, title: 'Price Chart', key: 'qJpMomCMPA' },
          {
            component: Transactions,
            title: 'Transactions',
            key: 'wDsMYhwDpK'
          },
          {
            component: RecentTrades,
            title: 'Recent Trades',
            key: 'NCxkpIPJHl'
          }
        ].map(item => (
          <Grid item key={item.key}>
            <Sheet title={item.title}>
              <item.component />
            </Sheet>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
