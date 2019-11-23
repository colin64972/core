import { render } from 'react-dom'
import { createElement } from 'react'
import App from './App'

console.log('%c env', 'color: lightyellow; font-size: large', process.env)

render(createElement(App), document.getElementById('app'))
