import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Loadable from 'react-loadable'
import { useSelector } from 'react-redux'

import {
  findMetricFromEntry,
  formatProductLine
} from '@cjo3/shared/logic/keyword-multiplier'
import { constants } from '@cjo3/shared/raw/constants/keyword-multiplier'
import { getLabelFromValue } from '@cjo3/shared/react/helpers'
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { volumeDataFields } from './fields'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

const VolumeLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-Volume" */
      /* webpackPrefetch: true */
      './Volume'
    ),
  loading: () => null,
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
    'fontSize': theme.typography.fontSize,
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
    ...theme.custom.buttons.iconButton,
    'color': theme.palette.primary[50],
    'backgroundColor': theme.palette.primary[200],
    'margin': '0 auto',
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.warn[500]
    }
  },
  searchButtonIcon: {
    fontSize: theme.typography.fontSize * 1.25
  }
}))

export const TrialCardTable = ({
  copyRef,
  trial: { metrics, id, list },
  volumeUnobtainable
}) => {
  const classes = useStyles()

  const matchType = useSelector(state => state.app.matchType)

  const whiteSpaceSelection = useSelector(
    state => state.app.whiteSpaceSelection
  )

  const [dialogStatus, setDialogStatus] = useState(false)

  const openDialogHandler = () => setDialogStatus(true)

  const closeDialogHandler = () => setDialogStatus(false)

  const kECountries = useSelector(state => state.kE?.countries)
  const kECurrencies = useSelector(state => state.kE?.currencies)
  const kEDataSources = useSelector(state => state.kE?.dataSources)

  const metricOptionLabels = {
    country: getLabelFromValue(metrics?.country, kECountries),
    currency: getLabelFromValue(metrics?.currency, kECurrencies),
    dataSource: getLabelFromValue(metrics?.dataSource, kEDataSources)
  }

  const tableMeta = JSON.stringify({
    trialId: id,
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
            trialId={id}
          />
        </Elements>
      )}
      {metrics && (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.metricDetailsContainer}>
          <Typography className={classes.metricProp}>
            Target Country&nbsp;
            <span className={classes.metricPropValue}>
              {metricOptionLabels.country}
            </span>
          </Typography>
          <Typography className={classes.metricProp}>
            CPC Currency&nbsp;
            <span className={classes.metricPropValue}>
              {metricOptionLabels.currency}
            </span>
          </Typography>
          <Typography className={classes.metricProp}>
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
            {metrics &&
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
        <TableBody id={id}>
          {list.map((keyword, keywordIndex) => (
            <TableRow key={`${id}-${keywordIndex}`} hover>
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
                  {metrics?.volume ? (
                    findMetricFromEntry(
                      keyword,
                      constants.VOLUME_DATA.VOLUME.VALUE,
                      metrics?.volume
                    )
                  ) : (
                    <button
                      type="button"
                      onClick={openDialogHandler}
                      data-id={id}
                      className={classes.requestVolumeButton}>
                      <SearchIcon className={classes.searchButtonIcon} />
                    </button>
                  )}
                </TableCell>
              )}
              {metrics &&
                volumeDataFields.map(field => (
                  <TableCell component="td" key={field.key} scope={field.value}>
                    {findMetricFromEntry(keyword, field.value, metrics?.volume)}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  )
}

TrialCardTable.propTypes = {
  copyRef: PropTypes.object.isRequired,
  trial: PropTypes.shape({
    id: PropTypes.string.isRequired,
    metrics: PropTypes.shape({
      volume: PropTypes.arrayOf(PropTypes.object),
      country: PropTypes.string,
      currency: PropTypes.string,
      dataSource: PropTypes.string
    }),
    list: PropTypes.arrayOf(PropTypes.string)
  }),
  volumeUnobtainable: PropTypes.bool.isRequired
}
