import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { FileUpload } from '../../interfaces'

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.custom.setSpace()
  },
  hidden: {
    visibility: 'hidden'
  },
  fileName: {
    margin: `0 0 0 ${theme.custom.setSpace()}px`
  },
  formButton: {
    'marginRight': theme.custom.setSpace(),
    '&:last-of-type': {
      marginRight: 0
    }
  }
}))

interface Props {
  setLoadedFile: (file: FileUpload) => void
}

export const FileSelector: React.FC<Props> = ({
  setLoadedFile
}): JSX.Element => {
  const classes = useStyles()

  const initialFile: FileUpload = {
    name: ''
  }

  const [selectedFile, setSelectedFile] = useState<FileUpload | null>(null)

  const changeHandler = (): void => setSelectedFile(fileInput.current.files[0])

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setLoadedFile(selectedFile)
    event.currentTarget.reset()
  }

  const resetHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSelectedFile(initialFile)
  }

  const fileInput = useRef<HTMLInputElement>(null)

  return (
    <form
      onSubmit={submitHandler}
      onReset={resetHandler}
      className={classes.form}>
      <Grid container justify="flex-start" alignItems="center">
        <Button type="button" variant="outlined">
          <label htmlFor="file-upload-input">Select File</label>
        </Button>
        <Typography variant="body1" className={classes.fileName}>
          {selectedFile?.size ? selectedFile.name : 'No File Selected'}
        </Typography>
      </Grid>
      <input
        className={classes.hidden}
        id="file-upload-input"
        name="file-upload-input"
        type="file"
        accept=".csv, .xls, .xlsx"
        onChange={changeHandler}
        ref={fileInput}
      />
      <Grid container justify="flex-start" alignItems="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.formButton}>
          Load
        </Button>
        <Button type="reset" variant="contained" className={classes.formButton}>
          Reset
        </Button>
      </Grid>
    </form>
  )
}

FileSelector.propTypes = {
  setLoadedFile: PropTypes.func.isRequired
}
