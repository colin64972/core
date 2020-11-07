import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, { useState } from 'react'
import { FileUpload } from '../../interfaces'
import { TopNav } from '../TopNav'
import { FileLoader } from './FileLoader'
import { EditorSettings } from './EditorSettings'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.custom.setSpace('sm')
  },
  fileLoaderBg: {
    background: `linear-gradient(top, ${theme.palette.primary[100]}, white)`
  },
  editorSettingsBg: {
    background: `linear-gradient(bottom, ${theme.palette.grey[900]}, ${theme.palette.grey[800]})`,
    boxShadow: '0.5rem 0.5rem 2rem rgba(0, 0, 0, 0.1)'
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
      {!loadedFile && (
        <Grid
          component="section"
          container
          className={clsx(classes.section, classes.fileLoaderBg)}>
          <FileLoader setLoadedFile={setLoadedFile} />
        </Grid>
      )}
      {loadedFile && (
        <Grid
          component="section"
          container
          className={clsx(classes.section, classes.editorSettingsBg)}>
          <EditorSettings />
        </Grid>
      )}
    </Grid>
  )
}
