import { Header } from '@cjo3/shared/react/components/Header'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { FileLoader } from './FileLoader'
import { SheetSelector } from './SheetSelector'
import { TransformResults } from './TransformResults'
import { TransformSettings } from './TransformSettings'

const useStyles = makeStyles(theme => ({
  Editor_headerBg: {
    backgroundImage:
      'url(https://eskipaper.com/images/high-tech-wallpapers-3.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  Editor_headerContent: {
    ...theme.custom.setFlex('column'),
    padding: theme.custom.setSpace('sm'),
    color: theme.palette.grey[50],
    textShadow: theme.custom.textShadow
  },
  Editor_headerInstructionsButton: {
    marginTop: theme.custom.setSpace('sm')
  },
  Editor_contentContainer: {
    ...theme.custom.contentContainer
  }
}))

export const Editor: React.FC = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Grid container justify="center">
      <Header
        title="Editor"
        subTitle="Load a File and Process your Sheet"
        bgColor="theme.palette.primary.main"
        bgUrl="https://eskipaper.com/images/high-tech-wallpapers-3.jpg"
        buttonHref="/editor/guide"
        buttonLabel="Read the Guide"
      />
      <FileLoader />
      <SheetSelector />
      <TransformSettings />
      <TransformResults />
    </Grid>
  )
}
