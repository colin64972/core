import { exportFile } from '@cjo3/shared/logic/dlc'
import {
  currentSheetName as currentSheetNameMock,
  sheetData as sheetDataMock,
  transformResult as transformResultMock,
  workbookName as workbookNameMock
} from '@cjo3/shared/react/mocks/dlc'
import { Button, ButtonGroup, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { exportButtons } from '../../constants'
import {
  currentSheetNameSelector,
  sheetDataSelector,
  transformResultSelector,
  workbookNameSelector
} from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  ExportPanel_container: {
    ...theme.custom.borderRadius,
    padding: theme.custom.setSpace('sm'),
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.secondary.main,
      theme.palette.secondary[300]
    ),
    color: theme.palette.secondary[50],
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.custom.setSpace('sm')
    }
  },
  ExportPanel_topMargin: {
    marginTop: theme.custom.setSpace('sm')
  }
}))

export const ExportPanel: React.FC = (): JSX.Element => {
  const classes = useStyles()

  let workbookName = useSelector(workbookNameSelector)
  let currentSheetName = useSelector(currentSheetNameSelector)
  let sheetData = useSelector(sheetDataSelector)
  let transformResult = useSelector(transformResultSelector)

  // if (process.env.USE_MOCKS) {
  //   workbookName = workbookNameMock
  //   currentSheetName = currentSheetNameMock
  //   sheetData = sheetDataMock
  //   transformResult = transformResultMock
  // }

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
    try {
      exportFile(
        sheetData,
        transformResult.all,
        currentSheetName,
        workbookName,
        event.currentTarget.dataset.booktype,
        event.currentTarget.name
      )
    } catch (error) {
      console.error('%c ERROR', 'color: yellow; font-size: large', error)
    }
  }
  return (
    <Grid item xs={12} sm={6} className={classes.ExportPanel_container}>
      <Typography variant="h5">Export Options</Typography>
      <Typography variant="body1">
        Copy or download your transformed sheet for only $
        {process.env.EXPORT_PRICE}
      </Typography>
      <ButtonGroup className={classes.ExportPanel_topMargin}>
        {exportButtons.map(item => (
          <Button
            key={item.key}
            type="button"
            name={item.name}
            data-booktype={item.bookType}
            onClick={clickHandler}>
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
    </Grid>
  )
}
