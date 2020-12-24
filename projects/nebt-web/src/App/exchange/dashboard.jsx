import Balances from './balances'
import Grid from '@material-ui/core/Grid'
import NewOrders from './newOrders'
import OrderBook from './orderBook'
import PriceChart from './priceChart'
import React from 'react'
import RecentTrades from './recentTrades'
import Sheet from './sheet'
import Transactions from './transactions'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  dashboard: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: 1500,
    padding: theme.custom.setSpace(),
    marginBottom: theme.custom.setSpace('sm'),
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
          { component: PriceChart, title: 'Price Chart', key: 'qJpMomCMPA' },
          {
            component: RecentTrades,
            title: 'Recent Trades',
            key: 'NCxkpIPJHl'
          },
          {
            component: Transactions,
            title: 'Transactions',
            key: 'wDsMYhwDpK'
          },
          { component: Balances, title: 'Balances', key: 'LJacUaSkDx' },
          { component: OrderBook, title: 'Order Book', key: 'NJfsdTymea' },
          { component: NewOrders, title: 'New Orders', key: 'epBpPJCEQz' }
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
