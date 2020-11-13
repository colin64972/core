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
import clsx from 'clsx'
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  sheetDataSelector,
  transformResultSelector
} from '../../../../store/selectors'
import { PreviewCell } from './PreviewCell'

const useStyles = makeStyles(theme => ({
  PreviewTable_tableContainer: {
    height: `calc(100% - ${theme.custom.setSpace('sm') * 2.4}px)`,
    overflow: 'scroll',
    marginTop: theme.custom.setSpace('sm')
  },
  PreviewTable_tableRow: {
    ...theme.custom.tableBorder,
    backgroundColor: theme.palette.primary.main
  },
  PreviewTable_headCell: {
    ...theme.custom.noSelect,
    ...theme.custom.tableBorder,
    ...theme.typography.bold,
    color: theme.palette.primary[50],
    padding: theme.custom.setSpace(),
    margin: 0,
    textAlign: 'center'
  },
  PreviewTable_rowHeadCell: {
    ...theme.custom.noSelect,
    ...theme.typography.bold,
    ...theme.custom.tableBorder,
    color: theme.palette.primary[50],
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    textAlign: 'center'
  }
}))

export const PreviewTable: React.FC = (): JSX.Element => {
  const classes = useStyles()

  let transformResult = useSelector(transformResultSelector)
  let sheetData = useSelector(sheetDataSelector)

  // if (process.env.USE_MOCKS) {
  //   sheetData = sheetDataMock
  //   transformResult = transformResultMock
  // }

  const { scope } = transformResult

  const { colOffset, rowOffset } = getScopeOffsets(scope)

  const tableRows = convertSheet(sheetData, scope)

  const findDataUrls = (address: string): string[] | null => {
    if (!transformResult.all[address]) return null
    const { transformKind, original } = transformResult.all[address]
    const urlObject = transformResult[transformKind].dataUrls[original]
    return [urlObject.original, urlObject.transform]
  }

  return (
    <TableContainer className={classes.PreviewTable_tableContainer}>
      <Table size="small">
        <TableHead>
          <TableRow className={classes.PreviewTable_tableRow}>
            <TableCell className={classes.PreviewTable_headCell} />
            {tableRows[0].map(
              (col: any, colIndex: number): JSX.Element => {
                const colId = convertColNumToId(colOffset + colIndex)
                return (
                  <TableCell
                    key={`th-${colId}`}
                    component="th"
                    align="center"
                    className={classes.PreviewTable_headCell}>
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
                  <TableCell
                    className={clsx(
                      classes.PreviewTable_headCell,
                      classes.PreviewTable_rowHeadCell
                    )}>
                    {rowId}
                  </TableCell>
                  {tableRows[rowIndex].map(
                    (cell: any, cellIndex: number): JSX.Element => {
                      const colId = convertColNumToId(colOffset + cellIndex)
                      const cellAddress = `${colId}${rowId}`
                      const dataUrls = findDataUrls(cellAddress)
                      return (
                        <PreviewCell
                          dataUrls={dataUrls}
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
