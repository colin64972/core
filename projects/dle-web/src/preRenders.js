import { generatePreRenders } from '@cjo3/shared/react/helpers'
import { setReduxStore } from './store'
import { ThemedApp } from './ThemedApp'

const pages = [
  {
    name: 'home',
    path: `${process.env.APP_ROOT_PATH}/`
  },
  {
    name: 'converter',
    path: `${process.env.APP_ROOT_PATH}/converter`
  },
  {
    name: 'converterGuide',
    path: `${process.env.APP_ROOT_PATH}/converter/guide`
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
