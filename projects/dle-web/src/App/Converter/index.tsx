import { Header } from '../Header'
import { HeaderConverterBg } from '../../assets'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { FileLoader } from './FileLoader'
import { SheetSelector } from './SheetSelector'
import { TransformResults } from './TransformResults'
import { TransformSettings } from './TransformSettings'

const useStyles = makeStyles(
  theme => ({
    Converter_headerContent: {
      ...theme.custom.setFlex('column'),
      padding: theme.custom.setSpace('sm'),
      color: theme.palette.grey[50],
      textShadow: theme.custom.textShadow
    },
    Converter_headerInstructionsButton: {
      marginTop: theme.custom.setSpace('sm')
    },
    Converter_contentContainer: {
      ...theme.custom.contentContainer
    }
  }),
  {
    name: 'Converter'
  }
)

export const Converter: React.FC = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Grid container justify="center">
      <Header
        title="Converter"
        subTitle="Load a File and Process your Sheet"
        bgColor="theme.palette.primary.main"
        bgUrl={HeaderConverterBg.paths[0]}
        buttonHref="/converter/guide"
        buttonLabel="Read the Guide"
      />
      <FileLoader />
      <SheetSelector />
      <TransformSettings />
      <TransformResults />
    </Grid>
  )
}
