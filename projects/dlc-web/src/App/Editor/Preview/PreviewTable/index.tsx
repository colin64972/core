import { setColHeaders, setRowHeaders } from '@cjo3/shared/logic/dlc'
import { transformResult as transformResultMock } from '@cjo3/shared/react/mocks/dlc'
import XLSX from 'xlsx'
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
import { useDispatch, useSelector } from 'react-redux'
import {
  sheetDataSelector,
  transformResultSelector
} from '../../../../store/selectors'

const useStyles = makeStyles(theme => ({}))

export const PreviewTable: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  let transformResult = useSelector(transformResultSelector)
  const sheetData = useSelector(sheetDataSelector)

  if (process.env.NODE_ENV === 'development') {
    transformResult = transformResultMock
  }

  const { totalRange } = transformResult

  const colHeaders = setColHeaders(totalRange.end.colNum)
  const rowHeaders = setRowHeaders(totalRange.end.rowNum)

  const jsonSheet = XLSX.utils.sheet_to_json(sheetData, {
    headers: 'A',
    blandrows: true
  })

  console.log('%c jsonSheet', 'color: yellow; font-size: large', jsonSheet)

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            {colHeaders.map(cell => (
              <TableCell key={cell.key} component="th">
                {cell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowHeaders.map(row => (
            <TableRow key={row.key}>
              <TableCell component="td">{row.label}</TableCell>
              {jsonSheet[row.value].map(data => (
                <TableCell component="td">{data}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
