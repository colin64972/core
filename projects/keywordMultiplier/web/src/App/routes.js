import { createHashId } from '@colin30/shared/react/helpers'
import { Home } from './Home'
import { NotFound } from './NotFound'
import { constants } from './constants'

export const routes = [
  {
    key: createHashId(),
    path: constants.URLS.HOME,
    exact: true,
    component: Home,
    label: 'Home'
  },
  {
    key: createHashId(),
    path: constants.URLS.NOT_FOUND,
    exact: false,
    component: NotFound,
    label: 'Not Found'
  }
]
