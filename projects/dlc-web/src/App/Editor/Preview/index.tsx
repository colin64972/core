import { transformResult as transformResultMock } from '@cjo3/shared/react/mocks/dlc'
import XLSX from 'xlsx'
import {
  Grid,
  Backdrop,
  CircularProgress,
  Button,
  LinearProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Drawer,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  transformResultSelector,
  previewOpenSelector,
  sheetDataSelector
} from '../../../store/selectors'
import { setColHeaders, setRowHeaders } from '@cjo3/shared/logic/dlc'
import { closePreview } from '../../../store/editor/actions'
import clsx from 'clsx'
import { PreviewTable } from './PreviewTable'

const useStyles = makeStyles(theme => ({
  Preview_backdrop: {
    width: '100vw',
    height: '100vh',
    zIndex: 10,
    position: 'fixed',
    top: 0,
    left: 0
  },
  Preview_container: {
    ...theme.custom.borderRadius,
    width: `calc(100% - ${theme.custom.setSpace('md')}px * 2)`,
    height: `calc(100% - ${theme.custom.setSpace('md')}px * 2)`,
    padding: theme.custom.setSpace('sm'),
    backgroundColor: theme.palette.grey[50],
    boxShadow: '0.5rem 0.5rem 2rem rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  }
}))

export const Preview: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  let transformResult = useSelector(transformResultSelector)
  const previewOpen = useSelector(previewOpenSelector)
  const sheetData = useSelector(sheetDataSelector)

  if (process.env.NODE_ENV === 'development') {
    transformResult = transformResultMock
  }

  const { totalRange } = transformResult

  const colHeaders = setColHeaders(totalRange.end.colNum)
  const rowHeaders = setRowHeaders(totalRange.end.rowNum)

  const closeHandler = (event: React.MouseEvent<HTMLDivElement>): void => {
    dispatch(closePreview())
  }

  const jsonSheet = XLSX.utils.sheet_to_json(sheetData, {
    header: 1,
    blankrows: true
  })

  if (!previewOpen) return null

  return (
    <Backdrop open className={classes.Preview_backdrop}>
      <div className={classes.Preview_container}>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h3">Sheet Preview</Typography>
          <Button
            type="button"
            color="primary"
            variant="outlined"
            onClick={closeHandler}>
            Close
          </Button>
        </Grid>
        <PreviewTable />
      </div>
    </Backdrop>
  )
}
