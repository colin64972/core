import { createWorkbook } from '@cjo3/shared/react/xlsx'
import { Button, Grid, Hidden, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { WorkBook } from 'xlsx'
import {
  loadWorkbook,
  saveFilename,
  unloadWorkbook
} from '../../store/converter/actions'
import { RawFile } from '../../store/converter/interfaces'
import { workbookSelector } from '../../store/selectors'
import { DropSelector } from './DropSelector'

const useStyles = makeStyles(theme => ({
  FileLoader_bg: {
    backgroundColor: theme.palette.grey[100],
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.grey[300],
      'white'
    )
  },
  FileLoader_contentContainer: {
    ...theme.custom.contentContainer,
    padding: theme.custom.setSpace('sm')
  },
  FileLoader_form: {
    ...theme.custom.setGrid(2, 3, theme.custom.setSpace('sm')),
    gridTemplateRows: 'repeat(3, auto)'
  },
  FileLoader_unloadFile: {
    backgroundColor: theme.palette.secondary.main
  },
  FileLoader_formTitle: {
    gridColumn: '1 / 2',
    gridRow: 1,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 3',
      justifyContent: 'center',
      textAlign: 'center'
    }
  },
  FileLoader_FileLoader: {
    ...theme.custom.setFlex('row', 'flex-start'),
    gridColumn: '1 / 2',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 3',
      justifyContent: 'center'
    }
  },
  FileLoader_formDropSelector: {
    gridColumn: '2 / 3',
    gridRow: '1 / 4',
    ...theme.custom.setFlex(),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  FileLoader_formActionButtons: {
    ...theme.custom.setFlex('row', 'flex-start'),
    gridColumn: '1 / 2',
    gridRow: 3,
    [theme.breakpoints.down('xs')]: {
      gridColumn: ' 1 / 3',
      justifyContent: 'center'
    }
  },
  FileLoader_formHiddenInput: {
    visibility: 'hidden',
    display: 'inline-block',
    width: 1
  },
  FileLoader_formFileName: {
    margin: `0 0 0 ${theme.custom.setSpace()}px`
  },
  FileLoader_formActionButton: {
    'color': 'white',
    'marginRight': theme.custom.setSpace(),
    '&:last-of-type': {
      marginRight: 0
    }
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

    dispatch(saveFilename(selectedFile.name))

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
        component="section"
        justify="center"
        className={classes.FileLoader_unloadFile}>
        <Grid
          container
          justify="center"
          className={classes.FileLoader_contentContainer}>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={unloadWorkbookHandler}>
            Unload File
          </Button>
        </Grid>
      </Grid>
    )

  return (
    <Grid
      component="section"
      container
      className={classes.FileLoader_bg}
      justify="center">
      <Grid container className={classes.FileLoader_contentContainer}>
        <form
          onSubmit={submitHandler}
          onReset={resetHandler}
          className={classes.FileLoader_form}>
          <div className={classes.FileLoader_formTitle}>
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
          <div className={classes.FileLoader_FileLoader}>
            <Button type="button" variant="outlined" color="primary">
              <label htmlFor="file-upload-input">Select File</label>
            </Button>
            <Typography
              variant="body1"
              className={classes.FileLoader_formFileName}>
              {selectedFile?.name ? selectedFile.name : 'No File Selected'}
            </Typography>
            <input
              className={classes.FileLoader_formHiddenInput}
              id="file-upload-input"
              name="file-upload-input"
              type="file"
              accept={process.env.ACCEPTED_FILETYPES}
              onChange={changeHandler}
              ref={fileInput}
            />
          </div>
          <div className={classes.FileLoader_formDropSelector}>
            <DropSelector setSelectedFileHandler={setSelectedFile} />
          </div>
          <div className={classes.FileLoader_formActionButtons}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!selectedFile?.size}
              className={classes.FileLoader_formActionButton}>
              Load
            </Button>
            <Button
              type="reset"
              variant="contained"
              color="secondary"
              disabled={!selectedFile?.size}
              className={classes.FileLoader_formActionButton}>
              Reset
            </Button>
          </div>
        </form>
      </Grid>
    </Grid>
  )
}
