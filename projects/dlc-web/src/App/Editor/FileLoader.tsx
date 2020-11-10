import { createWorkbook } from '@cjo3/shared/react/xlsx'
import { Button, Grid, Hidden, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { WorkBook } from 'xlsx'
import { loadWorkbook, unloadWorkbook } from '../../store/editor/actions'
import { RawFile } from '../../store/editor/interfaces'
import { workbookSelector } from '../../store/selectors'
import { DropSelector } from './DropSelector'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.custom.setSpace('sm')
  },
  FileLoader_unloadFile: {
    padding: theme.custom.setSpace('sm'),
    backgroundColor: theme.palette.grey[200]
  },
  noWorkbookBg: {
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.primary[100],
      'white'
    )
  },
  form: {
    ...theme.custom.setGrid(2, 3, theme.custom.setSpace()),
    gridTemplateRows: 'repeat(3, auto)',
    width: '100%'
  },
  title: {
    gridColumn: '1 / 2',
    gridRow: 1,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 3',
      justifyContent: 'center',
      textAlign: 'center'
    }
  },
  fileSelect: {
    ...theme.custom.setFlex('row', 'flex-start'),
    gridColumn: '1 / 2',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 3',
      justifyContent: 'center'
    }
  },
  dropLoader: {
    gridColumn: '2 / 3',
    gridRow: '1 / 4',
    ...theme.custom.setFlex(),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  actionButtons: {
    ...theme.custom.setFlex('row', 'flex-start'),
    gridColumn: '1 / 2',
    gridRow: 3,
    [theme.breakpoints.down('xs')]: {
      gridColumn: ' 1 / 3',
      justifyContent: 'center'
    }
  },
  hiddenInput: {
    visibility: 'hidden',
    display: 'inline-block',
    width: 1
  },
  fileName: {
    margin: `0 0 0 ${theme.custom.setSpace()}px`
  },
  formButton: {
    'marginRight': theme.custom.setSpace(),
    '&:last-of-type': {
      marginRight: 0
    }
  },
  submitButton: {
    color: 'white'
  },
  resetButton: {
    color: theme.palette.grey[600]
  }
}))

export const FileLoader: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [selectedFile, setSelectedFile] = useState<RawFile | null>(null)

  const fileInput = useRef<HTMLInputElement>(null)

  const changeHandler = (): void => setSelectedFile(fileInput.current.files[0])

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const loadWorkbookHandler = (wb: WorkBook): void => {
      dispatch(loadWorkbook(wb))
    }

    createWorkbook(selectedFile, loadWorkbookHandler)
    event.currentTarget.reset()
  }

  const resetHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSelectedFile(null)
  }

  const workbook = useSelector(workbookSelector)

  const unloadWorkbookHandler = (): void => {
    dispatch(unloadWorkbook())
  }

  if (workbook)
    return (
      <Grid
        container
        justify="center"
        className={classes.FileLoader_unloadFile}>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={unloadWorkbookHandler}>
          Unload File
        </Button>
      </Grid>
    )

  return (
    <Grid
      component="section"
      container
      justify="center"
      alignItems="center"
      className={clsx(classes.section, {
        [classes.noWorkbookBg]: !workbook
      })}
      data-testid="FileLoader">
      <Hidden xsDown>
        <Grid item sm={1} md={2} lg={3} xl={4} />
      </Hidden>
      <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
        <form
          onSubmit={submitHandler}
          onReset={resetHandler}
          className={classes.form}>
          <div className={classes.title}>
            <Typography variant="h3">File Loader</Typography>
            <Typography variant="body1">
              Select a file using the button below
              <Hidden xsDown>
                &nbsp;
                <span>
                  or drag and drop a file on the attchment box to the right
                </span>
              </Hidden>
              . The selected file name will be displayed once selected.
            </Typography>
          </div>
          <div className={classes.fileSelect}>
            <Button type="button" variant="outlined" color="primary">
              <label htmlFor="file-upload-input">Select File</label>
            </Button>
            <Typography variant="body1" className={classes.fileName}>
              {selectedFile?.name ? selectedFile.name : 'No File Selected'}
            </Typography>
            <input
              className={classes.hiddenInput}
              id="file-upload-input"
              name="file-upload-input"
              type="file"
              accept={process.env.ACCEPTED_FILETYPES}
              onChange={changeHandler}
              ref={fileInput}
            />
          </div>
          <div className={classes.dropLoader}>
            <DropSelector setSelectedFileHandler={setSelectedFile} />
          </div>
          <div className={classes.actionButtons}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!selectedFile?.size}
              className={clsx(classes.formButton, classes.submitButton)}>
              Load
            </Button>
            <Button
              type="reset"
              variant="contained"
              disabled={!selectedFile?.size}
              className={clsx(classes.formButton, classes.resetButton)}>
              Reset
            </Button>
          </div>
        </form>
      </Grid>
      <Hidden xsDown>
        <Grid item sm={1} md={2} lg={3} xl={4} />
      </Hidden>
    </Grid>
  )
}
