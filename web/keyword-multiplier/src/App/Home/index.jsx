import React from 'react'
import Header from './Header'
import Intro from './Intro'
import Sets from './Sets'
import MatchTypes from './MatchTypes'
import Trials from './Trials'
import Footer from '../common/Footer'

const Home = () => (
  <div id="home-container">
    <Header />
    <Intro />
    <Sets />
    <MatchTypes />
    <Trials />
    <Footer />
  </div>
)

export default Home
