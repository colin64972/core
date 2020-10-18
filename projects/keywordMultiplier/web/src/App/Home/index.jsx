import React from 'react'
import { useSelector } from 'react-redux'
import Loadable from 'react-loadable'
import { Header } from './Header'
import { Intro } from './Intro'
import { Notice } from './Notice'
import { Sets } from './Sets'
import { Footer } from '../common/Footer'
import { BackDropScreen } from '@colin30/shared/react/components/BackDropScreen'

const TrialResultsLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-TrialResults" */
      /* webpackPrefetch: true */
      './TrialResults'
    ),
  loading: () => <BackDropScreen isOpen spinner />,
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
