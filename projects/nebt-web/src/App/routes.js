module.exports = [
  {
    showInMenus: [],
    exact: true,
    path:
      process.env.NODE_ENV === 'development'
        ? '/'
        : `${process.env.APP_ROOT_PATH}`,
    label: 'Home',
    component: 'Home',
    key: 'eiwg3129'
  },
  {
    showInMenus: ['nav', 'footer'],
    exact: true,
    path:
      process.env.NODE_ENV === 'development'
        ? '/exchange'
        : `${process.env.APP_ROOT_PATH}exchange/`,
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
