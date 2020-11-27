import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import Loadable from 'react-loadable'
import { Grid } from '@material-ui/core'
import React from 'react'
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
    if (timedOut) return <h1>Timed Out</h1>
    if (error) return <h1>Failed to Load</h1>
    if (pastDelay) return <BackDropScreen isOpen spinner />
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
        buttonHref="/converter/guide"
        buttonLabel="Read the Guide"
      />
      <ConverterAppLoadable />
    </Grid>
  )
}
