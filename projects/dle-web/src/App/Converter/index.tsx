import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { LoadFail } from '@cjo3/shared/react/components/LoadFail'
import { Grid } from '@material-ui/core'
import React from 'react'
import Loadable from 'react-loadable'
import { ConverterBg } from '../../assets'
import { Header } from '../Header'

const ConverterAppLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-ConverterApp" */
      /* webpackPrefetch: false */
      './ConverterApp'
    ),
  loading: ({ error, pastDelay, timedOut }) => {
    if (error) return <LoadFail message="Load Failed" />
    if (timedOut) return <LoadFail message="Timed Out" />
    if (pastDelay) return <BackDropScreen noBackDrop spinner />
    return null
  },
  delay: 250,
  timeout: 5000,
  render: (loaded, props) => {
    const Component = loaded.ConverterApp
    return <Component {...props} />
  }
})

export const Converter: React.FC = (): JSX.Element => {
  return (
    <Grid container justify="center">
      <Header
        title="Converter"
        subTitle="Load a File and Process your Sheet"
        bgColor="theme.palette.primary.main"
        bgUrls={ConverterBg.paths}
        buttonHref="/converter/guide/"
        buttonLabel="Read the Guide"
      />
      <ConverterAppLoadable />
    </Grid>
  )
}
