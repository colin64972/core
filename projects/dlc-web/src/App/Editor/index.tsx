import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, { useState } from 'react'
import { FileUpload } from '../../interfaces'
import { TopNav } from '../TopNav'
import { FileLoader } from './FileLoader'
import { FileViewer } from './FileViewer'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.custom.setSpace('sm')
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
      <Grid component="section" container className={classes.section}>
        {!loadedFile ? (
          <FileLoader setLoadedFile={setLoadedFile} />
        ) : (
          <FileViewer unloadFileHandler={unloadFile} loadedFile={loadedFile} />
        )}
      </Grid>
    </Grid>
  )
}
