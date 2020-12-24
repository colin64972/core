import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Chart from 'react-apexcharts'
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

const chartOptions = {
  chart: {
    width: '100%',
    animations: { enabled: false },
    toolbar: { show: false }
  },
  tooltip: {
    enabled: true,
    theme: false,
    style: {
      color: 'white',
      fontSize: '12px',
      fontFamily: undefined
    },
    x: {
      show: false,
      format: 'dd MMM',
      formatter: undefined
    },
    y: {
      show: true,
      title: 'price'
    },
    marker: {
      show: false
    },
    items: {
      display: 'flex'
    },
    fixed: {
      enabled: false,
      position: 'topRight',
      offsetX: 0,
      offsetY: 0
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      show: true,
      style: {
        colors: '#fff',
        fontSize: '8px',
        cssClass: 'apexcharts-xaxis-label'
      }
    }
  },
  yaxis: {
    labels: {
      show: true,
      minWidth: 0,
      maxWidth: 160,
      style: {
        color: '#fff',
        fontSize: '8px',
        cssClass: 'apexcharts-yaxis-label'
      },
      offsetX: 0,
      offsetY: 0,
      rotate: 0
    }
  }
}

export default ({ ...props }) => {
  const classes = useStyles()
  let trades = useSelector(state => selectChartTrades(state))
  let currentPrice = useSelector(state => selectCurrentPrice(state))
  if (!trades) return 'No Data'
  return (
    <Grid>
      <Typography variant="h4" className={classes[currentPrice.direction]}>
        <ArrowIcon direction={currentPrice.direction} />
        {currentPrice.value}
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        ETH / NEB
      </Typography>
      <Chart
        options={chartOptions}
        series={trades}
        type="candlestick"
        height="277px"
      />
    </Grid>
  )
}
