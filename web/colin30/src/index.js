import { render } from 'react-dom'
import { createElement } from 'react'
import App from './App'

console.log(
  '%c env',
  'color: lightyellow; font-size: large',
  process.env.NODE_ENV,
  process.env.DEBUG,
  process.env.IS_BROWSER
)

render(createElement(App), document.getElementById('app'))
