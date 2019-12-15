import React from 'react'
import Header from './Header'
import Intro from './Intro'
import Sets from './Sets'
import MatchTypes from './MatchTypes'
import Footer from '../common/Footer'

const Home = () => (
  <div id="home-container">
    <Header />
    <Intro />
    <Sets />
    <MatchTypes />
    <Footer />
  </div>
)

export default Home
