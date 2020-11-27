import { convertSheetOptions } from '@cjo3/shared/react/xlsx'
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
import React from 'react'
import { useSelector } from 'react-redux'
import { utils } from 'xlsx'
import {
  sheetDataSelector,
  transformResultSelector
} from '../../../store/selectors'
import { PreviewCell } from './PreviewCell'

const useStyles = makeStyles(
  theme => ({
    PreviewTable_tableContainer: {
      height: `calc(100% - ${theme.custom.setSpace('sm') * 2.4}px)`,
      overflow: 'scroll',
      marginTop: theme.custom.setSpace('sm')
    },
    PreviewTable_tableRow: {
      ...theme.custom.tableBorder,
      backgroundColor: theme.palette.primary.main
    },
    PreviewTable_originCell: {
      width: 40
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
  }),
  {
    name: 'PreviewTable'
  }
)

export const PreviewTable: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const transformResult = useSelector(transformResultSelector)
  const sheetData = useSelector(sheetDataSelector)

  const options = convertSheetOptions
  options.raw = false

  const tableRows = utils.sheet_to_json(sheetData, options)

  const findDataUrls = (address: string): string[] | null => {
    if (!transformResult.all[address]) return null
    const {
      meta: {
        caseType,
        original: { w }
      }
    } = transformResult.all[address]
    const urlObject = transformResult[caseType].dataUrls[w]
    return {
      original: urlObject.original.dark,
      transform: urlObject.transform.dark
    }
  }

  return (
    <TableContainer className={classes.PreviewTable_tableContainer}>
      <Table size="small">
        <TableHead>
          <TableRow className={classes.PreviewTable_tableRow}>
            <TableCell
              className={clsx(
                classes.PreviewTable_headCell,
                classes.PreviewTable_originCell
              )}
            />
            {tableRows[0].map(
              (col: any, colIndex: number): JSX.Element => {
                const colId = utils.encode_col(colIndex)
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
              const rowId = utils.encode_row(rowIndex)
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
                      const cellAddress = utils.encode_cell({
                        c: cellIndex,
                        r: rowIndex
                      })
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
