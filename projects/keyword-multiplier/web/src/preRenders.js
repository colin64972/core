import { AppWithTheme } from './AppWithTheme'
import { generatePreRenders } from '@cjo3/shared/react/helpers'
import { setStore } from './store'

const pages = ['/', '/*']

let renders

try {
  renders = generatePreRenders(pages, AppWithTheme, setStore())
} catch (error) {
  console.error('ERROR generatePreRenders'.red, error)
}
export const preRenders = renders
