import {
  processSheet,
  setColHeaders,
  setRowHeaders
} from '@cjo3/shared/logic/dlc'
import {
  transformResult as transformResultMock,
  sheetData as sheetDataMock
} from '@cjo3/shared/react/mocks/dlc'
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
import { convertSheet } from '@cjo3/shared/react/xlsx'

const useStyles = makeStyles(theme => ({}))

export const PreviewTable: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  let transformResult = useSelector(transformResultSelector)
  let sheetData = useSelector(sheetDataSelector)

  // if (process.env.NODE_ENV === 'development') {
  //   sheetData = sheetDataMock
  //   transformResult = transformResultMock
  //   transformResult = processSheet(sheetDataMock, {
  //     rangeStart: 'b17',
  //     rangeEnd: 'am47',
  //     ulTrigger: '<',
  //     ulTransform: 'halve',
  //     ulTriggerZero: 'Rock',
  //     olTrigger: '>',
  //     olTransform: 'leave'
  //   })
  // }

  console.log(
    '%c transformResult',
    'color: yellow; font-size: large',
    transformResult
  )

  // const { totalRange } = transformResult

  // const colHeaders = setColHeaders(totalRange.end.colNum)
  // const rowHeaders = setRowHeaders(totalRange.end.rowNum)

  // const tableRows = convertSheet(sheetData, 'i17:k24')

  // console.log('%c tableRows', 'color: yellow; font-size: large', totalRange)

  return <p>hello</p>

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow></TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row, rowIndex) => (
            <TableRow key={row.key}>
              <TableCell component="td">
                {totalRange.start.rowNum + rowIndex}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
