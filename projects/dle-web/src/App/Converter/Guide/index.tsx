import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { Grid } from '@material-ui/core'
import React from 'react'
import Loadable from 'react-loadable'
import { GuideBg } from '../../../assets'
import { Header } from '../../Header'

const GuideContentLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-GuideContent" */
      /* webpackPrefetch: false */
      './GuideContent'
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
