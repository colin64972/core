module.exports = [
  {
    showInMenus: [],
    exact: true,
    path: '/',
    label: 'Home',
    component: 'Home',
    key: 'eiwg3129'
  },
  {
    showInMenus: ['nav', 'footer'],
    exact: true,
    path: '/exchange',
    label: 'Exchange',
    component: 'Exchange',
    key: 'funs3481'
  },
  {
    showInMenus: ['footer'],
    exact: true,
    path: '/privacy-policy',
    label: 'Privacy Policy',
    component: 'NotFound',
    key: 'geei3988'
  },
  {
    showInMenus: ['footer'],
    exact: true,
    path: '/terms-conditions',
    label: 'Terms & Conditions',
    component: 'NotFound',
    key: 'eifj3391'
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
