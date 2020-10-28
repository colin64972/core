import { AppElement } from './AppElement'
import { generatePreRenders } from '@cjo3/shared/react/helpers'

const pages = ['/', '/feedback', '/*']

export const preRenders = generatePreRenders(pages, AppElement)
