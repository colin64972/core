import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { LoadFail } from '@cjo3/shared/react/components/LoadFail'
import { Grid } from '@material-ui/core'
import React from 'react'
import Loadable from 'react-loadable'
import { GuideBg } from '../../../assets'
import { Header } from '../../Header'

const GuideContentLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-GuideContent" */
      './GuideContent'
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
    const Component = loaded.GuideContent
    return <Component {...props} />
  }
})

export const Guide: React.FC = (): JSX.Element => (
  <Grid container justify="center">
    <Header
      title="Converter Guide"
      subTitle="How to Use this App"
      bgColor="theme.palette.primary.main"
      bgUrls={GuideBg.paths}
      buttonHref="/converter/"
      buttonLabel="Try It Out"
    />
    <GuideContentLoadable />
  </Grid>
)
