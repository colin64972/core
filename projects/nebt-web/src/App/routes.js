import { switchLinkRoutePath } from '@cjo3/shared/react/helpers'

export default [
  {
    showInMenus: [],
    exact: true,
    path: switchLinkRoutePath('/'),
    label: 'Home',
    component: 'Home',
    key: 'eiwg3129'
  },
  {
    showInMenus: ['nav', 'footer'],
    exact: true,
    path: switchLinkRoutePath('/exchange/'),
    label: 'Exchange',
    component: 'Exchange',
    key: 'funs3481'
  },
  {
    showInMenus: [],
    exact: false,
    path: '/*',
    label: 'Not Found',
    component: 'NotFound',
    key: 'ruro3353'
  }
]
