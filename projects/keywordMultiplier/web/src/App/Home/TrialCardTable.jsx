import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import loadable from '@loadable/component'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/styles'
import { volumeDataFields } from './fields'
import { constants } from '../constants'
import { formatProductLine, setVolumeFieldCell } from '../logic'
import { getMatchType, getWhiteSpaceSelection } from '../../store/selectors'

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

export const TrialCardTable = ({ trial, copyRef, insufficientCredits }) => {
  const classes = useStyles()

  const matchType = useSelector(state => getMatchType(state))

  const whiteSpaceSelection = useSelector(state =>
    getWhiteSpaceSelection(state)
  )

  const [modalStatus, setModalStatus] = useState(false)

  const openRequestVolumeHandler = event => setModalStatus(true)

  const closeRequestVolumeHandler = event => setModalStatus(false)

  const RequestVolumeLoadable = loadable(() =>
    import(
      /* webpackChunkName: "chunk-RequestVolume" */
      /* webpackPrefetch: true */
      './RequestVolume'
    )
  )

  return (
    <Table size="small">
      {modalStatus && (
        <RequestVolumeLoadable
          status={modalStatus}
          closeHandler={closeRequestVolumeHandler}
          trial={trial}
        />
      )}
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableHeadCell}>Entry</TableCell>
          <TableCell className={classes.tableHeadCell}>Product</TableCell>
          {!insufficientCredits && (
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
          <TableRow key={`${trial.id}-${keywordIndex}`}>
            <TableCell component="td" className={classes.trialId}>
              {keywordIndex + 1}
            </TableCell>
            <TableCell
              component="td"
              scope="data"
              className={classes.tableCellData}>
              {formatProductLine(keyword, matchType, whiteSpaceSelection)}
            </TableCell>
            {!insufficientCredits && (
              <TableCell component="td">
                {trial.volumeData ? (
                  trial.volumeData[keywordIndex][
                    constants.VOLUME_DATA.VOLUME.VALUE
                  ]
                ) : (
                  <button
                    type="button"
                    onClick={openRequestVolumeHandler}
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
