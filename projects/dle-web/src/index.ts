import { createElement } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppWithTheme } from './AppWithTheme'

render(
  createElement(BrowserRouter, {}, AppWithTheme),
  document.getElementById('app')
)
