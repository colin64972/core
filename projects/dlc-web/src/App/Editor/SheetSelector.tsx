import { createWorkbook } from '@cjo3/shared/react/xlsx'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { WorkBook } from 'xlsx'
import { loadWorkbook, selectSheet } from '../../store/editor/actions'
import {
  currentSheetSelector,
  rawFileSelector,
  workbookSelector
} from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  topMargin: {
    marginTop: theme.custom.setSpace()
  },
  Editor_SheetSelector_selectFormControl: {
    minWidth: theme.custom.setSpace('xl'),
    marginLeft: theme.custom.setSpace('sm')
  }
}))

interface Props {
  sectionClass: string
}

export const SheetSelector: React.FC<Props> = ({
  sectionClass
}): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const loadedRawFile = useSelector(rawFileSelector)
  const loadedWorkbook = useSelector(workbookSelector)
  const currentSheet = useSelector(currentSheetSelector)

  const loadWorkbookHandler = (wb: WorkBook): void => {
    dispatch(loadWorkbook(wb))
  }

  useEffect(() => {
    if (loadedRawFile) createWorkbook(loadedRawFile, loadWorkbookHandler)
  }, [loadedRawFile])

  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(selectSheet(event.target.value))
  }

  return (
    <Grid
      component="section"
      container
      justify="center"
      alignItems="center"
      className={clsx(sectionClass)}
      data-testid="SheetSelector">
      {loadedWorkbook ? (
        <Fragment>
          <Typography variant="h3">Choose a Sheet to Edit</Typography>
          <FormControl
            variant="outlined"
            className={classes.Editor_SheetSelector_selectFormControl}>
            <InputLabel id="sheet-selection">Sheet Selection</InputLabel>
            <Select
              labelId="sheet-selection"
              id="sheet-selection"
              name="sheet-selection"
              label="Sheet Selection"
              value={currentSheet}
              onChange={changeHandler}>
              {loadedWorkbook.SheetNames.map((name, ind) => (
                <MenuItem key={`sheet-selection-${ind}`} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Fragment>
      ) : (
        <Typography variant="h3">No file loaded</Typography>
      )}
    </Grid>
  )
}
