import { Grid } from '@material-ui/core'
import React from 'react'
import { ConverterBg } from '../../assets'
import { Header } from '../Header'
import { FileLoader } from './FileLoader'
import { SheetSelector } from './SheetSelector'
import { TransformResults } from './TransformResults'
import { TransformSettings } from './TransformSettings'

export const Converter: React.FC = (): JSX.Element => {
  return (
    <Grid container justify="center">
      <Header
        title="Converter"
        subTitle="Load a File and Process your Sheet"
        bgColor="theme.palette.primary.main"
        bgUrls={ConverterBg.paths}
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
