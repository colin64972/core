import 'regenerator-runtime/runtime'
import { createElement } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemedApp } from './ThemedApp'

render(
  createElement(BrowserRouter, {}, ThemedApp),
  document.getElementById('app')
)
