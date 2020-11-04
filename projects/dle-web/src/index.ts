import { AppWithTheme } from './AppWithTheme'
import { BrowserRouter } from 'react-router-dom'
import { createElement } from 'react'
import { render } from 'react-dom'

render(
  createElement(BrowserRouter, {}, AppWithTheme),
  document.getElementById('app')
)
