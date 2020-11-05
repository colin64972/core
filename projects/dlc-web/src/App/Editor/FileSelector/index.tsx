import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'

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

interface FileObject {
  name: string
}

export const FileSelector: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const initialFile: FileObject = {
    name: ''
  }

  const [selectedFile, setSelectedFile] = useState<FileObject | null>(null)

  const [savedFile, setSavedFile] = useState<FileObject | null>(null)

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSavedFile(selectedFile)
    event.currentTarget.reset()
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedFile(event.currentTarget.files[0])
  }

  const resetHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.currentTarget.reset()
    setSelectedFile(initialFile)
  }

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
          {selectedFile ? selectedFile.name : 'No File Selected'}
        </Typography>
      </Grid>
      <input
        className={classes.hidden}
        id="file-upload-input"
        name="file-upload-input"
        type="file"
        accept=".csv, .xls, .xlsx"
        onChange={changeHandler}
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

// UploadForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   size: PropTypes.number.isRequired
// }
