import { generateKey } from '@colin30/web-shared/react'
// import Home from './Home'
import NotFound from './NotFound'
import constants from './constants'

const routes = [
  // {
  //   key: generateKey(),
  //   path: constants.URLS.APP,
  //   exact: true,
  //   component: Home,
  //   label: 'Home'
  // },
  {
    key: generateKey(),
    path: constants.URLS.NOT_FOUND,
    exact: false,
    component: NotFound,
    label: 'NotFound'
  }
]

export default routes
