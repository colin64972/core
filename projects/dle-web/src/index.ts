import { App } from './App/'
import { BrowserRouter } from 'react-router-dom'
import { createElement } from 'react'
import { render } from 'react-dom'

render(
  createElement(BrowserRouter, {}, createElement(App)),
  document.getElementById('app')
)
