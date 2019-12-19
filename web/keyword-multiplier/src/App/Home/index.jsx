import React from 'react'
import Header from './Header'
import Intro from './Intro'
import MatchTypes from './MatchTypes'
import Notice from './Notice'
import Sets from './Sets'
import Trials from './Trials'
import Footer from '../common/Footer'

const Home = () => (
  <div id="home-container">
    <Notice />
    <Header />
    <Intro />
    <Sets />
    <MatchTypes />
    <Trials />
    <Footer />
  </div>
)

export default Home
