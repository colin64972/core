import { generatePreRenders } from '@cjo3/shared/react/helpers'
import { ThemedApp } from './ThemedApp'
import __webpack_public_path__ from './publicPath'
import { setReduxStore } from './store'

const pages = [
  {
    name: 'home',
    path: `${process.env.APP_ROOT_PATH}/`
  },
  {
    name: 'editor',
    path: `${process.env.APP_ROOT_PATH}/editor`
  },
  {
    name: 'error',
    path: `${process.env.APP_ROOT_PATH}/*`
  }
]

let renders

try {
  renders = generatePreRenders(pages, ThemedApp, setReduxStore())
} catch (error) {
  console.error('ERROR generatePreRenders'.red, error)
}

export const preRenders = renders
