import React from 'react'
import Loadable from 'react-loadable'
import { useSelector } from 'react-redux'

import { Footer } from '../Footer'
import { Header } from './Header'
import { Intro } from './Intro'
import { Notice } from './Notice'
import { Sets } from './Sets'

const TrialResultsLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-TrialResults" */
      /* webpackPrefetch: true */
      './TrialResults'
    ),
  loading: () => null,
  render: (loaded, props) => {
    let Component = loaded.TrialResults
    return <Component {...props} />
  }
})

export const Home = () => {
  const trials = useSelector(state => state.app.trials)
  return (
    <div id="home-container">
      <Notice />
      <Header />
      <Intro />
      <Sets />
      {trials.items.length > 0 && <TrialResultsLoadable trials={trials} />}
      <Footer />
    </div>
  )
}
