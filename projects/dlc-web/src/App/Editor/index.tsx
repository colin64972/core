import { Grid, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, { useState } from 'react'
import { TopNav } from '../TopNav'
import { FileSelector } from './FileSelector'
import { FileViewer } from './FileViewer'
import { FileUpload } from '../../interfaces'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.custom.setSpace()
  },
  uploadForm: {
    background: `linear-gradient(163deg, ${theme.palette.primary[50]}, ${theme.palette.primary[100]})`
  }
}))

export const Editor = (): JSX.Element => {
  const classes = useStyles()

  const [loadedFile, setLoadedFile] = useState<FileUpload | null>(null)

  const unloadFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setLoadedFile(null)
  }

  return (
    <Grid container>
      <TopNav />
      <Grid component="section" container className={classes.section}>
        <Grid item xs={12}>
          <Typography variant="h1">Editor</Typography>
          <Typography variant="body1">
            Labore labore ut est sit sanctus stet et. Eos lorem ipsum consetetur
            magna est voluptua. Lorem justo dolor eirmod est est aliquyam. Dolor
            sit kasd nonumy lorem tempor dolor no duo et, invidunt gubergren
            rebum at rebum, et nonumy lorem lorem diam ipsum, sadipscing diam
            voluptua accusam sit sit, dolor.
          </Typography>
        </Grid>
      </Grid>
      {loadedFile ? (
        <Grid component="section" container className={classes.section}>
          <FileViewer unloadFileHandler={unloadFile} loadedFile={loadedFile} />
        </Grid>
      ) : (
        <Grid
          component="section"
          container
          className={clsx(classes.section, classes.uploadForm)}>
          <FileSelector setLoadedFile={setLoadedFile} />
        </Grid>
      )}
    </Grid>
  )
}
