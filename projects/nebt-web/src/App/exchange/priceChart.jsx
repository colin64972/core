import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Chart from 'react-apexcharts'
import { config } from './chartConfig'
import ArrowIcon from '../components/arrowIcon'
import { selectChartTrades, selectCurrentPrice } from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  heading: {
    textTransform: 'uppercase',
    ...theme.typography.bold
  },
  lightGrey: {
    color: theme.palette.grey[400]
  },
  bold: {
    ...theme.typography.bold
  },
  up: {
    color: theme.palette.pass[500],
    textTransform: 'uppercase'
  },
  down: {
    color: theme.palette.error.main,
    textTransform: 'uppercase'
  },
  subtitle: {
    fontWeight: 'normal',
    color: theme.palette.grey[600]
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  let trades = useSelector(state => selectChartTrades(state))
  let currentPrice = useSelector(state => selectCurrentPrice(state))
  if (!trades) return 'No Data'
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes[currentPrice.direction]}>
          <ArrowIcon direction={currentPrice.direction} />
          {currentPrice.value}
        </Typography>
        <Typography variant="body1" className={classes.subtitle}>
          ETH / NEB
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Chart
          options={config}
          series={trades}
          type="candlestick"
          width="100%"
        />
      </Grid>
    </Grid>
  )
}
