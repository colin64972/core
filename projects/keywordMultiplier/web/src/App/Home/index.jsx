import React from 'react'
import { Header } from './Header'
import { Intro } from './Intro'
import { TrialSettings } from './TrialSettings'
import { Notice } from './Notice'
import { Sets } from './Sets'
import { Trials } from './Trials'
import { Footer } from '../common/Footer'

export const Home = () => (
  <div id="home-container">
    <Notice />
    <Header />
    <Intro />
    <Sets />
    <TrialSettings />
    <Trials />
    <Footer />
  </div>
)
