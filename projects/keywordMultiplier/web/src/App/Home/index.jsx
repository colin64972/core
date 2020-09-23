import React from 'react'
import { useSelector } from 'react-redux'
import loadable from '@loadable/component'
import { Header } from './Header'
import { Intro } from './Intro'
import { Notice } from './Notice'
import { Sets } from './Sets'
import { Footer } from '../common/Footer'
import { getTrials } from '../../store/selectors'

const TrialResultsLoadable = loadable(() =>
  import(
    /* webpackChunkName: "chunk-TrialResults" */
    /* webpackPreload: true */
    './TrialResults'
  )
)

const Home = () => {
  const trials = useSelector(state => getTrials(state))
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

export default Home
