import {
  sheetData as sheetDataMock,
  transformResult as transformResultMock
} from '@cjo3/shared/react/mocks/dlc'
import {
  convertColNumToId,
  convertSheet,
  getScopeOffsets
} from '@cjo3/shared/react/xlsx'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import {
  sheetDataSelector,
  transformResultSelector
} from '../../../../store/selectors'
import { PreviewCell } from './PreviewCell'

const useStyles = makeStyles(theme => ({
  PreviewTable_tableContainer: {
    ...theme.debug.border,
    overflow: 'scroll',
    marginTop: theme.custom.setSpace('sm')
  }
}))

export const PreviewTable: React.FC = (): JSX.Element => {
  const classes = useStyles()

  let transformResult = useSelector(transformResultSelector)
  let sheetData = useSelector(sheetDataSelector)

  if (process.env.NODE_ENV === 'development') {
    sheetData = sheetDataMock
    transformResult = transformResultMock
  }

  console.log(
    '%c transformResult',
    'color: yellow; font-size: large',
    transformResult.all
  )

  const { scope } = transformResult

  const { colOffset, rowOffset } = getScopeOffsets(scope)

  const tableRows = convertSheet(sheetData, scope)

  return (
    <TableContainer className={classes.PreviewTable_tableContainer}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            {tableRows[0].map(
              (col: any, colIndex: number): JSX.Element => {
                const colId = convertColNumToId(colOffset + colIndex)
                return (
                  <TableCell key={`th-${colId}`} component="th" align="center">
                    {colId}
                  </TableCell>
                )
              }
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map(
            (row: any[], rowIndex: number): JSX.Element => {
              const rowId = rowOffset + rowIndex
              return (
                <TableRow key={`tr-${rowId}`}>
                  <TableCell>{rowId}</TableCell>
                  {tableRows[rowIndex].map(
                    (cell: any, cellIndex: number): JSX.Element => {
                      const colId = convertColNumToId(colOffset + cellIndex)
                      const cellAddress = `${colId}${rowId}`
                      return (
                        <PreviewCell
                          key={`td-${cellAddress}`}
                          unprocessedData={cell}
                          transform={transformResult?.all[cellAddress]}
                          cellAddress={cellAddress}
                        />
                      )
                    }
                  )}
                </TableRow>
              )
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
