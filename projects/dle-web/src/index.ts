import { App } from './App'
import { createElement } from 'react'
import { render } from 'react-dom'

render(createElement(App), document.getElementById('app'))

for (let i = 0; i < 10; i += 1) {
  console.log('asdf')
}
