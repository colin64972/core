import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'

const useStyles = makeStyles(theme => ({
  uploadForm: {
    ...theme.debug.border
  },
  hidden: {
    visibility: 'hidden'
  }
}))

interface FileObject {
  name: string
  size?: number
  type?: string
  webkitRelativePath?: string
  lastModified?: number
  lastModifiedDate?: string
}

export const UploadForm: React.FC = (): JSX.Element => {
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
      className={classes.uploadForm}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Button type="button" variant="contained" color="primary">
            <label htmlFor="file-upload-input">Select File</label>
          </Button>
        </Grid>
        <Grid item xs={6}>
          {selectedFile && (
            <Typography variant="body1">{selectedFile.name}</Typography>
          )}
        </Grid>
        <input
          className={classes.hidden}
          id="file-upload-input"
          name="file-upload-input"
          type="file"
          accept=".csv, .xls, .xlsx"
          onChange={changeHandler}
        />
      </Grid>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <Button type="submit" variant="outlined" color="primary">
            Upload
          </Button>
        </Grid>
        <Grid item>
          <Button type="reset" variant="outlined" color="primary">
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

// UploadForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   size: PropTypes.number.isRequired
// }
