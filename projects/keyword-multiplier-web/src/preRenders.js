import __webpack_public_path__ from './publicPath'
import { AppWithTheme } from './AppWithTheme'
import { generatePreRenders } from '@cjo3/shared/react/helpers'
import { setStore } from './store'

const pages = [
  {
    name: 'home',
    path: `${process.env.APP_ROOT_PATH}/`
  },
  {
    name: 'error',
    path: `${process.env.APP_ROOT_PATH}/*`
  }
]

let renders

try {
  renders = generatePreRenders(pages, AppWithTheme, setStore())
} catch (error) {
  console.error('ERROR generatePreRenders'.red, error)
}
export const preRenders = renders
