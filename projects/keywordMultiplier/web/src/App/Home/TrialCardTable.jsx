import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import loadable from '@loadable/component'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import {
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
import { formatProductLine, setVolumeFieldCell } from '../logic'
import { getMatchType, getWhiteSpaceSelection } from '../../store/selectors'

const stripePromise = loadStripe('pk_test_vo3pSAjgXWz5JIjWvfwTmBpu')

const useStyles = makeStyles(theme => ({
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

  const matchType = useSelector(state => getMatchType(state))

  const whiteSpaceSelection = useSelector(state =>
    getWhiteSpaceSelection(state)
  )

  const [dialogStatus, setDialogStatus] = useState(false)

  const openDialogHandler = event => setDialogStatus(true)

  const closeDialogHandler = event => setDialogStatus(false)

  const VolumeLoadable = loadable(() =>
    import(
      /* webpackChunkName: "chunk-Volume" */
      /* webpackPrefetch: true */
      './Volume'
    )
  )

  return (
    <Table size="small">
      {dialogStatus && (
        <Elements stripe={stripePromise}>
          <VolumeLoadable
            dialogStatus={dialogStatus}
            closeDialogHandler={closeDialogHandler}
            trialId={trial.id}
          />
        </Elements>
      )}
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableHeadCell}>Entry</TableCell>
          <TableCell className={classes.tableHeadCell}>Product</TableCell>
          {!volumeUnobtainable && (
            <TableCell className={classes.tableHeadCell}>
              {constants.VOLUME_DATA.VOLUME.LABEL}
            </TableCell>
          )}
          {trial.volumeData &&
            volumeDataFields.map(field => (
              <TableCell className={classes.tableHeadCell} key={field.key}>
                {field.label}
              </TableCell>
            ))}
        </TableRow>
      </TableHead>
      <TableBody ref={copyRef} id={trial.id}>
        {trial.list.map((keyword, keywordIndex) => (
          <TableRow key={`${trial.id}-${keywordIndex}`} hover>
            <TableCell component="td" className={classes.trialId}>
              {keywordIndex + 1}
            </TableCell>
            <TableCell
              component="td"
              scope="data"
              className={classes.tableCellData}>
              {formatProductLine(keyword, matchType, whiteSpaceSelection)}
            </TableCell>
            {!volumeUnobtainable && (
              <TableCell component="td">
                {trial.volumeData ? (
                  trial.volumeData[keywordIndex][
                    constants.VOLUME_DATA.VOLUME.VALUE
                  ]
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
            {trial.volumeData &&
              volumeDataFields.map(field => (
                <TableCell component="td" key={field.key}>
                  {setVolumeFieldCell(trial.volumeData[keywordIndex], field)}
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
