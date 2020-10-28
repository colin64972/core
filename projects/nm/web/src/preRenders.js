import { AppElement } from './AppElement'
import { generatePreRenders } from '@cjo3/shared/react/helpers'

const pages = ['/', '/feedback', '/*']

const preRenders = generatePreRenders(pages, AppElement)

export default preRenders
