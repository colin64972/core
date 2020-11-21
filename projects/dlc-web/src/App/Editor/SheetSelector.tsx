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
import {
  currentSheetNameSelector,
  workbookSelector
} from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  SheetSelector_contentContainer: {
    ...theme.custom.contentContainer,
    padding: theme.custom.setSpace('sm')
  },
  SheetSelector_bg: {
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.grey[300],
      'white'
    )
  },
  SheetSelector_title: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  SheetSelector_selectFormControl: {
    minWidth: theme.custom.setSpace('xl'),
    margin: `0 0 0 ${theme.custom.setSpace()}px`,
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.custom.setSpace()}px 0 0 0`
    }
  },
  SheetSelector_selectFormControlInputLabel: {
    top: -5
  }
}))

export const SheetSelector: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const workbook = useSelector(workbookSelector)
  const currentSheetName = useSelector(currentSheetNameSelector)

  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(selectSheet(event.target.value))
  }

  if (!workbook)
    return (
      <Grid component="section" container justify="center">
        <Grid
          container
          justify="center"
          className={classes.SheetSelector_contentContainer}>
          <Typography variant="h3">No file loaded</Typography>
        </Grid>
      </Grid>
    )

  const { SheetNames } = workbook

  return (
    <Grid
      component="section"
      container
      justify="center"
      alignItems="center"
      className={classes.SheetSelector_bg}>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.SheetSelector_contentContainer}>
        <Typography variant="h3" className={classes.SheetSelector_title}>
          Choose a Sheet to Edit
        </Typography>
        <FormControl
          variant="outlined"
          className={classes.SheetSelector_selectFormControl}>
          <InputLabel
            htmlFor="sheet-selection"
            id="sheetSelection-label"
            classes={{
              formControl: classes.SheetSelector_selectFormControlInputLabel
            }}>
            Sheet Selection
          </InputLabel>
          <Select
            labelId="sheetSelection-label"
            id="sheet-selection"
            name="sheet-selection"
            label="Sheet Selection"
            value={currentSheetName}
            onChange={changeHandler}>
            {SheetNames.map((name, ind) => (
              <MenuItem key={`sheet-selection-${ind}`} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}
