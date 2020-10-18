import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Loadable from 'react-loadable'
import { BackDropScreen } from '@colin30/shared/react/components/BackDropScreen'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/styles'
import { volumeDataFields } from './fields'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'
import {
  findMetricFromEntry,
  formatProductLine
} from '@colin30/shared/logic/keywordMultiplier'
import { getLabelFromValue } from '@colin30/shared/react/helpers'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

const VolumeLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-Volume" */
      /* webpackPrefetch: true */
      './Volume'
    ),
  loading: () => <BackDropScreen isOpen spinner />,
  render: (loaded, props) => {
    let Component = loaded.Volume
    return <Component {...props} />
  }
})

const useStyles = makeStyles(theme => ({
  metricDetailsContainer: {
    marginBottom: theme.custom.setSpace('sm'),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.custom.setSpace()
    }
  },
  metricProp: {
    'fontSize': theme.custom.setSpace() * 1.25,
    'marginTop': theme.custom.setSpace() / 2,
    'marginRight': theme.custom.setSpace(),
    'fontWeight': 'normal',
    'color': theme.palette.bodyColor,
    'textTransform': 'unset',
    '&:last-child': {
      marginRight: 0
    }
  },
  metricPropValue: {
    fontWeight: 'bold',
    color: theme.palette.primary.main
  },
  tableHeadCell: {
    margin: 0,
    color: theme.palette.secondary[200],
    ...theme.typography.bold
  },
  trialId: {
    color: theme.palette.secondary[200]
  },
  tableCellData: {
    wordBreak: 'break-all'
  },
  requestVolumeButton: {
    ...theme.custom.iconButton,
    'color': theme.palette.primary[50],
    'backgroundColor': theme.palette.primary[200],
    'margin': '0 auto',
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.warn[500]
    }
  },
  searchButtonIcon: {
    fontSize: theme.custom.setSpace() * 1.5
  }
}))

export const TrialCardTable = ({ trial, copyRef, volumeUnobtainable }) => {
  const classes = useStyles()

  const matchType = useSelector(state => state.app.matchType)

  const whiteSpaceSelection = useSelector(
    state => state.app.whiteSpaceSelection
  )

  const [dialogStatus, setDialogStatus] = useState(false)

  const openDialogHandler = event => setDialogStatus(true)

  const closeDialogHandler = event => setDialogStatus(false)

  const kECountries = useSelector(state => state.kE?.countries)
  const kECurrencies = useSelector(state => state.kE?.currencies)
  const kEDataSources = useSelector(state => state.kE?.dataSources)

  const metricOptionLabels = {
    country: getLabelFromValue(trial?.metrics?.country, kECountries),
    currency: getLabelFromValue(trial?.metrics?.currency, kECurrencies),
    dataSource: getLabelFromValue(trial?.metrics?.dataSource, kEDataSources)
  }

  const tableMeta = JSON.stringify({
    trialId: trial.id,
    metricOptions: {
      ...metricOptionLabels
    }
  })

  const tldsHidden = useSelector(state => state.app.tldsHidden)

  return (
    <Grid container>
      {dialogStatus && (
        <Elements stripe={stripePromise}>
          <VolumeLoadable
            dialogStatus={dialogStatus}
            closeDialogHandler={closeDialogHandler}
            trialId={trial.id}
          />
        </Elements>
      )}
      {trial?.metrics && (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.metricDetailsContainer}>
          <Typography variant="h6" className={classes.metricProp}>
            Target Country&nbsp;
            <span className={classes.metricPropValue}>
              {metricOptionLabels.country}
            </span>
          </Typography>
          <Typography variant="h6" className={classes.metricProp}>
            CPC Currency&nbsp;
            <span className={classes.metricPropValue}>
              {metricOptionLabels.currency}
            </span>
          </Typography>
          <Typography variant="h6" className={classes.metricProp}>
            Metric Data Source&nbsp;
            <span className={classes.metricPropValue}>
              {metricOptionLabels.dataSource}
            </span>
          </Typography>
        </Grid>
      )}
      <Table size="small" ref={copyRef} scope={tableMeta}>
        <TableHead>
          <TableRow>
            <TableCell
              className={classes.tableHeadCell}
              scope={constants.VOLUME_DATA.ENTRY.LABEL}>
              {constants.VOLUME_DATA.ENTRY.LABEL}
            </TableCell>
            <TableCell
              className={classes.tableHeadCell}
              scope={constants.VOLUME_DATA.PRODUCT.LABEL}>
              {constants.VOLUME_DATA.PRODUCT.LABEL}
            </TableCell>
            {!volumeUnobtainable && (
              <TableCell
                className={classes.tableHeadCell}
                scope={constants.VOLUME_DATA.VOLUME.LABEL}>
                {constants.VOLUME_DATA.VOLUME.LABEL}
              </TableCell>
            )}
            {trial?.metrics &&
              volumeDataFields.map(field => (
                <TableCell
                  className={classes.tableHeadCell}
                  key={field.key}
                  scope={field.label}>
                  {field.label}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody id={trial.id}>
          {trial.list.map((keyword, keywordIndex) => (
            <TableRow key={`${trial.id}-${keywordIndex}`} hover>
              <TableCell
                component="td"
                className={classes.trialId}
                scope={constants.VOLUME_DATA.ENTRY.VALUE}>
                {keywordIndex + 1}
              </TableCell>
              <TableCell
                component="td"
                className={classes.tableCellData}
                scope={constants.VOLUME_DATA.PRODUCT.VALUE}>
                {formatProductLine(
                  keyword,
                  matchType,
                  whiteSpaceSelection,
                  tldsHidden
                )}
              </TableCell>
              {!volumeUnobtainable && (
                <TableCell
                  component="td"
                  scope={constants.VOLUME_DATA.VOLUME.VALUE}>
                  {trial?.metrics?.volume ? (
                    findMetricFromEntry(
                      keyword,
                      constants.VOLUME_DATA.VOLUME.VALUE,
                      trial.metrics.volume
                    )
                  ) : (
                    <button
                      type="button"
                      onClick={openDialogHandler}
                      data-id={trial.id}
                      className={classes.requestVolumeButton}>
                      <SearchIcon className={classes.searchButtonIcon} />
                    </button>
                  )}
                </TableCell>
              )}
              {trial?.metrics &&
                volumeDataFields.map(field => (
                  <TableCell component="td" key={field.key} scope={field.value}>
                    {findMetricFromEntry(
                      keyword,
                      field.value,
                      trial.metrics.volume
                    )}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  )
}
