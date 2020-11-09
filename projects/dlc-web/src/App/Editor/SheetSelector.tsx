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
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSheet } from '../../store/editor/actions'
import { currentSheetSelector, workbookSelector } from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.custom.setSpace('sm')
  },
  topMargin: {
    marginTop: theme.custom.setSpace()
  },
  Editor_SheetSelector_bg: {
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.grey[200],
      'white'
    )
  },
  Editor_SheetSelector_title: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  Editor_SheetSelector_selectFormControl: {
    minWidth: theme.custom.setSpace('xl'),
    margin: `0 0 0 ${theme.custom.setSpace()}px`,
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.custom.setSpace()}px 0 0 0`
    }
  }
}))

export const SheetSelector: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const workbook = useSelector(workbookSelector)
  const currentSheet = useSelector(currentSheetSelector)

  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(selectSheet(event.target.value))
  }

  if (!workbook)
    return (
      <Grid
        component="section"
        container
        justify="center"
        className={classes.section}>
        <Typography variant="h3">No file loaded</Typography>
      </Grid>
    )

  const { SheetNames } = workbook

  return (
    <Grid
      component="section"
      container
      justify="center"
      alignItems="center"
      className={clsx(classes.section, classes.Editor_SheetSelector_bg)}
      data-testid="SheetSelector">
      <Typography variant="h3" className={classes.Editor_SheetSelector_title}>
        Choose a Sheet to Edit
      </Typography>
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
          {SheetNames.map((name, ind) => (
            <MenuItem key={`sheet-selection-${ind}`} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}
