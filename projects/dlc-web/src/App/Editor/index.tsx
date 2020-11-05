import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React from 'react'
import { TopNav } from '../TopNav'
import { FileSelector } from './FileSelector'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.custom.setSpace()
  },
  uploadForm: {
    backgroundColor: theme.palette.primary[100]
  }
}))

export const Editor = (): JSX.Element => {
  const classes = useStyles()
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
      <Grid
        component="section"
        container
        className={clsx(classes.section, classes.uploadForm)}>
        <Grid item xs={12}>
          <Typography variant="h3">File Loader</Typography>
          <Typography variant="body1">Start by loading a file here.</Typography>
        </Grid>
        <Grid item xs={12}>
          <FileSelector />
        </Grid>
      </Grid>
    </Grid>
  )
}
