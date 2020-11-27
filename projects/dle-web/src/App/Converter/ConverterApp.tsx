import { Grid } from '@material-ui/core'
import React, { Fragment } from 'react'
import { FileLoader } from './FileLoader'
import { SheetSelector } from './SheetSelector'
import { TransformResults } from './TransformResults'
import { TransformSettings } from './TransformSettings'

export const ConverterApp: React.FC = (): JSX.Element => (
  <Fragment>
    <FileLoader />
    <SheetSelector />
    <TransformSettings />
    <TransformResults />
  </Fragment>
)
